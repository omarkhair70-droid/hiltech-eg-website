# SEO Launch Checklist (Phase 27A)

## Pre-submit checks
- Verify `https://hiltech-eg.com` loads the intended production site.
- Confirm robots and sitemap are live:
  - `https://hiltech-eg.com/robots.txt`
  - `https://hiltech-eg.com/sitemap.xml`

## Google Search Console setup
1. Add property for the production domain.
2. Verify ownership (DNS preferred for durable ownership).
3. Submit sitemap: `https://hiltech-eg.com/sitemap.xml`.
4. Run URL Inspection and request indexing for:
   - `/`
   - `/services`
   - `/solutions`
   - `/products-partners`
   - `/rfq`
   - `/contact`

## Monitoring window
- Monitor indexing and coverage for 3–14 days.
- Review Page Indexing and canonical reports for exclusions/errors.
- Re-inspect corrected URLs after any technical fixes.

## SEO safety reminders
- Do not promise first-page ranking.
- Do not publish fake reviews, partnerships, certifications, or case studies.
- Keep admin/API/customer-sensitive routes non-indexable.

## Google Analytics verification (Phase 29A)
- In Vercel Project Settings → Environment Variables, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (example: `G-XXXXXXXXXX`).
- Redeploy production after setting the variable.
- Verify GA is loading on public pages (not `/admin`) using browser DevTools Network for `gtag/js` and realtime GA4 view.
- After any production domain switch, reconnect/verify both Google Analytics and Google Search Console properties for the final domain.

## GA4 event verification (Phase 29C)
- Open GA4 Realtime or DebugView on production.
- Trigger key public actions and verify event arrival:
  - Add to RFQ (`product_add_to_rfq`)
  - Open basket (`rfq_basket_open`)
  - Review RFQ basket (`rfq_basket_review_click`)
  - Submit RFQ (`rfq_submit_attempt` then `rfq_submit_success` or `rfq_submit_error`)
- Confirm no personal data, notes, or raw RFQ message content appears in event params.
