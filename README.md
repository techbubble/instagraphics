# Instagraphics

Public-facing app for building branded graphics (SmartArt-style) from SVG templates. Users pick a layout, apply brand colors/fonts, fill in text fields with a live preview, save to their account, and download as SVG or PNG. Downloads cost 1 credit; credits are $0.99 each via Stripe Checkout.

## Stack

- Next.js (App Router, TypeScript) on Vercel
- Bootstrap 5 CSS (white + Bootstrap blue)
- Neon Postgres (`@neondatabase/serverless`)
- Stripe Checkout + webhook fulfillment
- Vercel Analytics
- Passwordless auth: email OTP over SMTP (nodemailer), JWT cookie session

## SVG template engine

Templates live in `src/lib/templates.ts` as annotated SVG strings. Annotations:

| Attribute | Effect |
|---|---|
| `data-ig-fill="primary\|secondary\|tertiary"` | `fill` set to that color slot |
| `data-ig-stroke="..."` | `stroke` set to that color slot |
| `data-ig-font="..."` | `font-family` set to that font slot |
| `data-ig-text="<fieldKey>"` | text content bound to a form field |

`src/lib/svg-engine.ts` does string-based substitution (isomorphic — used for server-rendered previews and the live client preview). PNG export is client-side canvas at 2x.

To add a template: append an entry to `TEMPLATES` in `src/lib/templates.ts` with id, title, category, fields, and the annotated SVG.

## Environment variables

| Name | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `AUTH_SECRET` | JWT session signing secret |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (endpoint: `/api/stripe/webhook`, event: `checkout.session.completed`) |
| `SMTP_HOST` | SMTP server for OTP emails (unset = codes logged to server console) |
| `SMTP_PORT` | SMTP port (default 587; 465 uses TLS) |
| `SMTP_USER` / `SMTP_PASS` | SMTP credentials |
| `SMTP_FROM` | From address (defaults to `SMTP_USER`) |

The success page also fulfills purchases directly (idempotent), so local dev works without the webhook.

## Setup

```bash
npm install
vercel env pull .env.local
npm run db:init   # creates tables (idempotent)
npm run dev
```

## Data model

- `users` — email, credits (created on first successful OTP sign-in)
- `login_codes` — one pending OTP per email (hashed, 10-min TTL, 5 attempts)
- `graphics` — user_id, template_id, title, final svg
- `purchases` — stripe_session_id (unique, idempotency), credits, amount
- `downloads` — one row per charged download
