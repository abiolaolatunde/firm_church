import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Cloudflare sends mail with worker-mailer, which needs Cloudflare sockets; locally, Nodemailer does the same job.
async function devSendMail(smtp, email) {
  const nodemailer = (await import("nodemailer")).default;
  const transport = nodemailer.createTransport({
    host: smtp.host, port: smtp.port, secure: smtp.secure,
    auth: { user: smtp.credentials.username, pass: smtp.credentials.password },
  });
  const fmt = (u) => (u.name ? { name: u.name, address: u.email } : u.email);
  await transport.sendMail({
    from: fmt(email.from), to: email.to.map(fmt), subject: email.subject,
    html: email.html, text: email.text, replyTo: email.reply && fmt(email.reply),
  });
}

// In `npm run dev`, run functions/api/register.js the way Cloudflare does, with settings from .env.local.
function cloudflareFunctions(env) {
  return {
    name: "cloudflare-functions",
    configureServer(server) {
      server.middlewares.use("/api/register", async (req, res) => {
        try {
          const fn = await server.ssrLoadModule("/functions/api/register.js");
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const request = new Request(`http://localhost${req.originalUrl}`, {
            method: req.method,
            headers: req.headers,
            body: req.method === "POST" ? Buffer.concat(chunks) : undefined,
          });
          const response = req.method === "POST" ? await fn.onRequestPost({ request, env }) : fn.onRequest({ request, env });
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (err) {
          console.error(err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: `Dev server error: ${err.message}` }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), cloudflareFunctions({ ...loadEnv(mode, process.cwd(), ""), devSendMail })],
}));
