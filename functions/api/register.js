/**
 * POST /api/register
 * Runs on Cloudflare (Pages Functions). Saves the registration to Turso, sends a confirmation email
 * to the person who registered, and a copy of their details to the organisers (through Gmail SMTP).
 *
 * Settings (Cloudflare > your Pages project > Settings > Variables and Secrets):
 *   TURSO_DATABASE_URL    libsql://... URL of the Turso database
 *   TURSO_DATABASE_TOKEN  Turso auth token (add it as a Secret)
 *   SMTP_USER             the Gmail address emails are sent from
 *   SMTP_PASS             a Google App Password for that account (add it as a Secret)
 *   FROM_EMAIL            optional  e.g.  FIRM CAMP <firmcamp2026@gmail.com>  (defaults to SMTP_USER)
 *   SMTP_HOST, SMTP_PORT  optional  default smtp.gmail.com and 465
 *   ADMIN_EMAIL           optional  where the organisers' copy goes; separate several addresses with commas
 *   REPLY_TO              optional  where replies from registrants go (defaults to the first ADMIN_EMAIL)
 * At least one of Turso or SMTP must be set up. With both, emails go out only after the save succeeds.
 */

import { createClient } from "@libsql/client/web";

const EVENT = {
  name: "FIRM CAMP 2026",
  dates: "Thursday 3 – Sunday 6 December 2026",
  venue: "Umari Audi Road, Opposite Colors, Fate Roundabout, Ilorin, Kwara State",
  directions: "https://www.google.com/maps/search/?api=1&query=Umari+Audi+Road+Fate+Roundabout+Ilorin+Kwara+State",
  schedule: [
    ["Thu, Dec 3", "Evening Session · 5:00 PM – 8:00 PM"],
    ["Fri, Dec 4", "Evening Session · 5:00 PM – 8:00 PM"],
    ["Sat, Dec 5", "Morning Session · 9:00 AM – 12:00 PM, Afternoon Session · 12:15 PM – 3:00 PM"],
    ["Sun, Dec 6", "Grand Finale · 9:00 AM – 12:00 PM"],
  ],
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (v, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "The form data couldn't be read." }, 400); }

  // Bots fill in the hidden "company" field. Pretend it worked and send nothing.
  if (clean(body.company)) return json({ ok: true });

  const r = {
    email: clean(body.email, 200).toLowerCase(),
    firstName: clean(body.firstName, 60),
    lastName: clean(body.lastName, 60),
    phone: clean(body.phone, 20),
    area: clean(body.area, 120),
    transport: ["Yes", "No"].includes(body.transport) ? body.transport : "",
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) return json({ error: "Enter a valid email address." }, 400);
  if (!r.firstName || !r.lastName) return json({ error: "Enter your first and last name." }, 400);
  if (r.phone && !/^[\d\s-]{7,15}$/.test(r.phone)) return json({ error: "Enter a phone number using digits only." }, 400);

  const hasDb = Boolean(env.TURSO_DATABASE_URL && env.TURSO_DATABASE_TOKEN);
  const hasEmail = Boolean(env.SMTP_USER && env.SMTP_PASS);
  if (!hasDb && !hasEmail) {
    return json({ error: "Registration isn't set up yet. Please try again later." }, 503);
  }

  if (hasDb) {
    try {
      const db = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_DATABASE_TOKEN });
      const result = await db.execute({
        sql: `INSERT INTO registrations (email, first_name, last_name, phone, area, transport)
              VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(email) DO NOTHING`,
        args: [r.email, r.firstName, r.lastName, r.phone || null, r.area || null, r.transport || null],
      });
      if (result.rowsAffected === 0) {
        return json({ error: "This email is already registered. Check your inbox (and spam folder) for your confirmation." }, 409);
      }
    } catch (err) {
      console.error("Saving registration failed:", err.message);
      return json({ error: "We couldn't save your registration. Try again in a few minutes." }, 502);
    }
  }

  if (!hasEmail) return json({ ok: true, emailed: false });

  const admins = (env.ADMIN_EMAIL || "").split(",").map((s) => s.trim()).filter(Boolean);
  const replyTo = env.REPLY_TO || admins[0];

  try {
    await send(env, {
      to: [r.email],
      subject: `You're registered for ${EVENT.name}`,
      html: confirmationHtml(r),
      text: confirmationText(r),
      ...(replyTo && { reply_to: replyTo }),
    });
  } catch (err) {
    console.error("Confirmation email failed:", err.message);
    // Once it's saved, a retry would only hit "already registered", so report success without the email.
    if (hasDb) return json({ ok: true, emailed: false });
    return json({ error: "We couldn't send your confirmation email." }, 502);
  }

  if (admins.length) {
    // The registrant already has their email, so a failure here shouldn't show them an error.
    try {
      await send(env, { to: admins, subject: `New registration: ${r.firstName} ${r.lastName}`, html: adminHtml(r), reply_to: r.email });
    } catch (err) { console.error("Organiser copy failed:", err.message); }
  }

  return json({ ok: true, emailed: true });
}

export const onRequest = () => json({ error: "Use POST." }, 405);

// "FIRM CAMP <register@example.com>" or a bare address -> { name, email }
function address(s) {
  const m = /^\s*(.*?)\s*<([^>]+)>\s*$/.exec(s);
  return m ? { ...(m[1] && { name: m[1] }), email: m[2] } : { email: s.trim() };
}

async function send(env, { to, subject, html, text, reply_to }) {
  const port = Number(env.SMTP_PORT) || 465;
  const smtp = {
    host: env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
  };
  const email = {
    from: address(env.FROM_EMAIL || env.SMTP_USER),
    to: to.map((e) => ({ email: e })),
    subject,
    html,
    ...(text && { text }),
    ...(reply_to && { reply: { email: reply_to } }),
  };
  // `npm run dev` runs in Node, which has no Cloudflare sockets; vite.config.js passes a Nodemailer sender instead.
  if (env.devSendMail) return env.devSendMail(smtp, email);
  const { WorkerMailer } = await import("worker-mailer");
  try {
    await WorkerMailer.send(smtp, email);
  } catch (err) {
    throw new Error(`SMTP: ${err.message}`);
  }
}

function confirmationText(r) {
  return [
    `Hi ${r.firstName},`, "",
    `Thank you for registering for ${EVENT.name}. We can't wait to see you.`, "",
    `When: ${EVENT.dates}`, `Where: ${EVENT.venue}`, `Directions: ${EVENT.directions}`, "",
    "Schedule (West Africa Time):", ...EVENT.schedule.map(([d, s]) => `  ${d}: ${s}`), "",
    r.transport === "Yes" ? "You asked for help with transportation. Our team will contact you before the camp.\n" : "",
    "If you have questions, reply to this email.", "", "FIRM Church Global",
  ].join("\n");
}

function confirmationHtml(r) {
  const rows = EVENT.schedule.map(([d, s]) =>
    `<tr><td style="padding:8px 16px 8px 0;border-bottom:1px solid #e5dfd2;font-weight:600;white-space:nowrap;vertical-align:top">${d}</td><td style="padding:8px 0;border-bottom:1px solid #e5dfd2">${s}</td></tr>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#f4f1ea;font-family:Helvetica,Arial,sans-serif;color:#0e1021">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#0e1021;padding:28px 32px;color:#f4f1ea">
<div style="font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:#d5be9a;font-weight:700">FIRM CAMP 2026 · A Joy Culture</div>
<div style="font-size:28px;font-weight:700;line-height:1.2;margin-top:8px">You're registered, ${esc(r.firstName)}.</div></td></tr>
<tr><td style="padding:28px 32px;font-size:16px;line-height:1.6;color:#30312f">
<p style="margin:0 0 16px">Thank you for registering for FIRM CAMP 2026. We can't wait to gather with you.</p>
<p style="margin:0 0 4px"><strong style="color:#0e1021">When</strong><br>${EVENT.dates}</p>
<p style="margin:12px 0 4px"><strong style="color:#0e1021">Where</strong><br>${EVENT.venue}</p>
<p style="margin:12px 0 24px"><a href="${EVENT.directions}" style="color:#860a04;font-weight:600">Get directions</a></p>
<div style="font-weight:700;color:#0e1021;margin-bottom:4px">Schedule <span style="font-weight:400;color:#6b6b6b">(West Africa Time)</span></div>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:15px">${rows}</table>
${r.transport === "Yes" ? `<p style="margin:24px 0 0;padding:12px 16px;background:#f4f1ea;border-radius:8px">You asked for help with transportation. Our team will contact you before the camp.</p>` : ""}
<p style="margin:24px 0 0">If you have any questions, just reply to this email.</p>
<p style="margin:16px 0 0">FIRM Church Global<br><span style="color:#6b6b6b">Laboring till Christ is formed in every heart!</span></p>
</td></tr></table></td></tr></table></body></html>`;
}

function adminHtml(r) {
  const row = (k, v) => `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b">${k}</td><td style="padding:6px 0">${esc(v || "—")}</td></tr>`;
  return `<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#0e1021">
<p style="margin:0 0 12px">New FIRM CAMP 2026 registration:</p><table cellpadding="0" cellspacing="0">
${row("Name", `${r.firstName} ${r.lastName}`)}${row("Email", r.email)}${row("Phone", r.phone && `+234 ${r.phone}`)}${row("Area in Ilorin", r.area)}${row("Needs transport", r.transport)}
${row("Registered", new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" }) + " WAT")}</table></div>`;
}
