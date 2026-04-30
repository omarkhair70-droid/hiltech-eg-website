# HILTECH Enterprise Design System Foundation (Phase 12)

## Colors
- **Navy foundation:** `bg-navy-900`, `bg-navy-800` for hero/footer/visual panels.
- **Enterprise neutrals:** `slate-50` to `slate-900` for body sections and copy hierarchy.
- **Brand accent:** orange (`orange-300` to `orange-600`) for CTA focus, accents, and badges.

## Typography guidance
- **Hero/page titles:** `text-3xl sm:text-4xl lg:text-5xl`, `font-bold`, tight leading.
- **Section titles:** `text-2xl sm:text-3xl`, `font-bold`.
- **Card titles:** `text-base`, `font-semibold`.
- **Body text:** `text-sm sm:text-base` depending on context.
- **Labels/badges:** `text-[11px]` with uppercase tracking.

## Spacing guidance
- Standard sections use `py-12 md:py-16 lg:py-20`.
- Compact sections use `py-10 md:py-14`.
- Shared container width: `max-w-6xl` with responsive horizontal padding.
- Mobile rhythm: stacked CTAs and reduced vertical spacing to avoid tall empty blocks.

## CTA variants
Implemented in `CTAButton`:
- `primary`: orange filled action button.
- `secondary`: white/light bordered button.
- `ghost`: dark-outline/navy-context action.
- `link`: subtle underlined text CTA.

## Card patterns
Implemented via `PremiumCard`:
- Rounded corners (`rounded-xl`).
- Neutral border (`border-slate-200`).
- Soft shadow with hover elevation.
- Optional orange accent line for feature emphasis.

## Badge / pill patterns
- `BadgePill`: category/service/status labels in orange/slate/navy tones.
- `CapabilityPill`: dark-hero capability chips.
- Use concise labels (1-3 words) for scannability.

## Visual panel usage
Implemented via `VisualPanel`:
- Navy gradient base.
- Subtle grid overlay.
- Orange accent line.
- Optional label stack.
- Use in hero and strategic highlight blocks, avoid repetitive overuse of the same imagery.

## Logo usage
- Header uses light logo (`/logo.png`) on white navbar.
- Footer/contact desk use dark logo (`/logo-dark.png`) on navy backgrounds.
- Keep safe spacing around logos (padded rounded containers in dark sections).

## Notes for future phases
- Expand primitives before adding one-off styles.
- Keep RFQ/product cards aligned to `PremiumCard` base.
- When adding solution pages, reuse `SectionShell + SectionHeader + VisualPanel` first.
- Introduce tokenized typography classes globally only when multiple pages require exact same text styles.

## Technical diagram visual system (Phase 17)
- Use `components/diagrams/TechnicalDiagramPanel` as the default wrapper for all enterprise visual diagrams.
- Diagram palette: dark navy base (`from-navy-950 via-navy-900`), orange highlights for active links/nodes, slate text for secondary labels.
- Diagram content rules:
  - Use conceptual SVG/CSS/HTML topology visuals only.
  - Keep labels explicit (e.g., endpoints, ODF, rack, uplink, PoE switch, NVR).
  - Do not rely only on color; include text labels and path grouping.
- Placement rules:
  - Primary solution diagrams on `/solutions/[slug]` near the top.
  - Compact preview diagrams on `/solutions` and selected product intelligence pages.
  - RFQ workflow diagram on `/rfq` as a compact process explainer.
- Mobile constraints:
  - All diagrams must use responsive `viewBox` and `w-full h-auto` behavior.
  - No horizontal overflow or clipped labels.
  - Keep panel height controlled and avoid blocking primary CTAs.
- Content integrity:
  - Never use fake project photos or unverified field imagery as technical proof.
  - Keep diagrams conceptual unless client-verified assets are supplied.
