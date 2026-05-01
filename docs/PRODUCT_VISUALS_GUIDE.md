# Product Visuals Guide (Phase 22A)

## Purpose
This guide defines how to prepare product visuals for the HILTECH catalog using safe, realistic AI-generated product visuals.

These visuals are **AI-generated catalog illustrations in realistic photo style** and are **not official brand product photos**.

## Safety & Brand Integrity Rules
- Do not represent visuals as official manufacturer photography.
- Do not include real brand logos or trademark marks in generated images.
- Do not generate fake official packaging.
- Do not include fake certifications, badges, or compliance labels.
- Do not include price tags, watermarks, or random text overlays.

## Visual Spec
- Style: realistic premium studio product photography, professional catalog photo style
- Lighting: clean studio lighting with subtle orange accent lighting
- Background: clean dark navy + soft white technical background
- Materials: sharp realistic materials with soft shadows
- Layout: centered product object, square 1:1 composition
- Target usage: B2B network infrastructure website product cards
- Preferred output: **1200x1200 PNG**

## Generation Workflow (External)
1. Open `content/product-visuals.ts`.
2. Select the product entry by `productId`.
3. Use `prompt` and `negativePrompt` in your external image generation workflow.
4. Generate one square PNG for each product.
5. Validate output against the QA checklist below.
6. Save images using the exact filename in `imagePath`.
7. Review every generated image before upload.
8. Upload approved images to `/public/products/`.

## Naming Convention
- Required file path pattern: `/products/{product-id}.png`
- Example: `/products/fiber-leviton-om3.png`

## Replacement with Client-Approved Photos
When client-approved official photos are available:
1. Replace AI-generated PNGs in `/public/products/` while keeping the same filenames where possible.
2. Update alt text if needed to match the real photo composition.
3. Keep a changelog note that assets switched from AI-generated visuals to approved official photography.

## QA Checklist
Before accepting any generated asset, confirm:
- No logos appear.
- No fake labels or certification marks appear.
- No unreadable/random text appears.
- No packaging appears.
- No people or hands appear.
- Lighting and background are consistent with the catalog style.
- No stock watermark appears.
- Image is clear (not blurry), high resolution, and square.

## Upload Location (Current)
- Approved uploaded product images must be stored in: `/public/products/`.
- Current integrated uploaded image count: **18**.
- If a product does not yet have a matching image file, the catalog renders a fallback illustrative placeholder card visual.
