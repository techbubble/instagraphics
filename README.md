# Instagraphics

Public-facing app for building branded infographics (SmartArt-style) from SVG templates. Users pick a layout, apply brand colors/fonts/logo, fill in text fields with a live preview, save to their account, and download as SVG or PNG. Downloads cost 1 credit; credits are $0.99 each via Stripe Checkout.

## Stack

- Next.js (App Router, TypeScript) on Vercel
- Bootstrap 5 CSS (white + Bootstrap blue)
- Neon Postgres (`@neondatabase/serverless`)
- Stripe Checkout + webhook fulfillment
- Vercel Analytics
- Cookie session auth (email/password, bcrypt + JWT)

## SVG template engine

Templates live in `src/lib/templates.ts` as annotated SVG strings. Annotations:

| Attribute | Effect |
|---|---|
| `data-ig-fill="primary\|secondary\|tertiary"` | `fill` set to that color slot |
| `data-ig-stroke="..."` | `stroke` set to that color slot |
| `data-ig-font="..."` | `font-family` set to that font slot |
| `data-ig-text="<fieldKey>"` | text content bound to a form field |
| `data-ig-logo` | `<image>` href replaced with uploaded logo; hidden when absent |

`src/lib/svg-engine.ts` does string-based substitution (isomorphic — used for server-rendered previews and the live client preview). PNG export is client-side canvas at 2x.

To add a template: append an entry to `TEMPLATES` in `src/lib/templates.ts` with id, title, category, fields, and the annotated SVG.

## Environment variables

| Name | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `AUTH_SECRET` | JWT session signing secret |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (endpoint: `/api/stripe/webhook`, event: `checkout.session.completed`) |

The success page also fulfills purchases directly (idempotent), so local dev works without the webhook.

## Setup

```bash
npm install
vercel env pull .env.local
npm run db:init   # creates tables (idempotent)
npm run dev
```

## Data model

- `users` — email, password_hash, credits
- `graphics` — user_id, template_id, title, final svg
- `purchases` — stripe_session_id (unique, idempotency), credits, amount
- `downloads` — one row per charged download
