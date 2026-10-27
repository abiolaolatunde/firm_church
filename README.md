# FIRM CAMP 2026 website

React site (Vite) for FIRM CAMP 2026, December 3–6 in Ilorin, with a registration form that emails
each person a confirmation and sends the organisers a copy.

## What's where
- `src/pages/` – the Home, Watch and Support pages
- `src/components/Register.jsx` – the registration form (opens from every Register button)
- `src/data.js` – schedule, leaders, FAQs and other page content
- `src/config.js` – YouTube channel and social links
- `functions/api/register.js` – runs on Cloudflare and saves registrations to Turso and sends the emails through Gmail (SMTP)
- `public/assets/` – images (fill it with `get-images-mac.command` or `get-images-windows.bat`)

## Cloudflare Pages settings
- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`

Variables (Settings > Variables and Secrets):

| Name | Example | Notes |
|---|---|---|
| `TURSO_DATABASE_URL` | `libsql://firm-camp-yourname.turso.io` | Where registrations are saved. From the Turso dashboard. |
| `TURSO_DATABASE_TOKEN` | `eyJ...` | Add as a Secret. A read/write token from the Turso dashboard. |
| `SMTP_USER` | `firmcamp2026@gmail.com` | The Gmail account emails are sent from. |
| `SMTP_PASS` | `abcdefghijklmnop` | Add as a Secret. A Google App Password (myaccount.google.com/apppasswords). Without `SMTP_USER` and `SMTP_PASS`, registrations are still saved but no emails go out. |
| `FROM_EMAIL` | `FIRM CAMP <firmcamp2026@gmail.com>` | Optional. Sender name and address shown to registrants. Defaults to `SMTP_USER`. |
| `ADMIN_EMAIL` | `team@yourdomain.com` | Optional. Gets a copy of every registration. Separate several with commas. |
| `REPLY_TO` | `info@yourdomain.com` | Optional. Where replies from registrants go. Defaults to `ADMIN_EMAIL`. |

After adding or changing variables, redeploy (Deployments > ... > Retry deployment).

## Working on it locally (optional)
`npm install`, then `npm run dev`. The dev server runs `/api/register` too, using the settings in
`.env.local` (same names as the Cloudflare variables above), so registrations save to Turso locally.
