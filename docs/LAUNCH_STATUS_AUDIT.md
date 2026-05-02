# Launch Status Audit (Phase 28C)

## A. Completed
- Public website pages
- Products catalog
- RFQ basket
- RFQ backend save to Supabase
- Admin RFQ dashboard
- Product admin
- Public RFQ tracking
- Internal RFQ email notifications
- SEO technical basics
- Company profile content upgrade
- Company profile visuals and logo support

## B. Still pending / operational setup
- Official domain `hiltech-eg.com` still needs to point to the new Vercel site before final Google Search Console submission.
- Google Search Console setup and sitemap submission.
- Resend official sender domain verification for `notify.hiltech-eg.com`.
- Change `RFQ_NOTIFY_FROM` back to `HILTECH RFQ <rfq@notify.hiltech-eg.com>` after Resend DNS verification.
- Confirm final production `RFQ_NOTIFY_TO` recipients.
- Final contact-number decision if profile and existing approved numbers differ.
- Final mobile QA.
- Final logo/reference approval is already stated by HILTECH, while published logos remain based on supplied profile material.

## C. Known technical notes
- Some profile assets currently live in `/public` root rather than `/public/company-profile`.
- Current code supports root-level assets.
- Future cleanup can move assets into organized folders, but this was not changed in Phase 28C.

## D. Recommended next phase
- **Phase 29: Final Launch QA, Domain Switch, Search Console, and Production Handoff**
