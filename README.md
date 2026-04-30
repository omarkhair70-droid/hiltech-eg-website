# HILTECH Egypt Website

Corporate website rebuild for HILTECH (Hiltech Network System - H.N.S), built with Next.js App Router, TypeScript, and Tailwind CSS.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static content-first approach (no database/CMS)

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`.

## Built pages
- Home (`/`)
- Services (`/services`)
- About (`/about`)
- Products & Partners (`/products-partners`)
- Contact / Request a Quote (`/contact`)

## Content configuration
Draft client contact and brand content is centralized in:
- `content/site.ts`

Update this file to change:
- Brand labels
- Slogan
- Contact details
- WhatsApp link
- Services/sectors lists

## MVP form behavior
The contact form is UI-first and uses a `mailto:` submit action for MVP.
No backend/database is included yet.

## Confirmation items pending
- Final public WhatsApp number format (+20 vs local)
- Final bilingual address display rules
- Canonical Facebook page URL
- Any verified claims (certifications, project counts, official partnerships)
