# Performance & Image Audit (B3B)

## Largest Images Found (public assets)

Run reference: `find public -type f \( -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' -o -name '*.webp' \) -printf '%s %p\n' | sort -nr | head`

- Review and optimize the largest hero/work/reference images first after approved real assets are provided.
- Prioritize compression/re-export for hero and above-the-fold candidates.

## Images Used in Hero / Home / Work

- Home hero: `/rack-data-room.jpg` (Next/Image, above fold, priority used on desktop hero card).
- Home field cards: `/fiber-splicing-workbench.jpg`, `/rack-front-cabling.jpg`, `/copper-cable-tray.jpg`, `/testing-otdr-device.jpg`.
- Home references panel: `/ch-product-references.jpeg`.
- Work page intro/discipline visuals include the same core infrastructure/testing images plus testing support visuals.

## Replacement / Compression Candidates

- Replace illustrative visuals with approved real HILTECH assets before claiming project proof.
- Re-export large JPG/JPEG assets to modern compressed format (WebP/AVIF where practical) after client approval.
- Keep original filenames mapped in a migration sheet to avoid broken paths during staged replacement.

## Current Image Handling Notes

- Public homepage/work visuals use `next/image` with constrained containers and `object-cover` / `object-contain` patterns.
- Hero priority is used only for the desktop above-the-fold hero visual.
- No admin image behavior was changed in this B3B pass.

## Mobile Performance Risks

- Multiple visual cards on homepage/work can increase mobile bytes before real-asset optimization.
- Large legacy JPG assets may affect LCP on slower connections.
- If references panels are high resolution, they can hurt bandwidth without clear conversion benefit.

## Recommendations After Real Assets Arrive

1. Replace illustrative assets using `docs/REAL_ASSETS_NEEDED.md` map.
2. Export approved assets in responsive sizes (hero, card, thumbnail variants).
3. Re-run Lighthouse mobile checks for Home + Work and verify LCP/CLS.
4. Keep product/reference disclaimers until formal approvals are confirmed.
