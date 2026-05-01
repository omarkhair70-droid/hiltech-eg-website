export interface ProductVisualMeta {
  productId: string;
  imagePath: string;
  alt: string;
  visualType: string;
  prompt: string;
  negativePrompt: string;
}

export const productVisualWarning =
  'Realistic AI-generated product visuals for technical catalogs. Not official brand photography, not official packaging, and no logos should appear.';

export const productVisuals: ProductVisualMeta[] = [
  {
    productId: 'fiber-leviton-om3',
    imagePath: '/products/fiber-leviton-om3.png',
    alt: 'Realistic product visual of Leviton OM3 Fiber Cable for campus and enterprise backbone connectivity.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: coiled turquoise multimode fiber backbone cable with clean exposed LC-style connector ends. Category: Fiber Optic Systems. Specs: OM3 multimode fiber backbone cable. Use case: Campus and enterprise backbone connectivity. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-om3-12-core',
    imagePath: '/products/fiber-om3-12-core.png',
    alt: 'Realistic product visual of OM3 Multimode 12 Core Fiber Cable for inter-floor and data room uplinks.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: cutaway view of a 12-core multimode fiber cable with color-coded strands. Category: Fiber Optic Systems. Specs: 12-core OM3 multimode configuration. Use case: Inter-floor and data room uplinks. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-armored-outdoor',
    imagePath: '/products/fiber-armored-outdoor.png',
    alt: 'Realistic product visual of Outdoor Armored Fiber Cable for external runs and high-risk cable routes.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: rugged black armored outdoor fiber cable with protective corrugated layer segment. Category: Fiber Optic Systems. Specs: Outdoor-rated armored protection for harsh paths. Use case: External runs and high-risk cable routes. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-odf',
    imagePath: '/products/fiber-odf.png',
    alt: 'Realistic product visual of ODF Optical Distribution Frame for centralized fiber distribution in comms rooms.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: rack-mounted optical distribution frame with organized adapter ports and cable guides. Category: Fiber Optic Systems. Specs: Fiber termination and management frame. Use case: Centralized fiber distribution in comms rooms. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-panel-24p',
    imagePath: '/products/fiber-panel-24p.png',
    alt: 'Realistic product visual of Fiber Patch Panel 24P for high-density patching and neat terminations.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: 24-port rack fiber patch panel front view with neat port alignment. Category: Fiber Optic Systems. Specs: 24-port fiber panel for rack mounting. Use case: High-density patching and neat terminations. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-splice-trays',
    imagePath: '/products/fiber-splice-trays.png',
    alt: 'Realistic product visual of Splice Trays for fiber splice workflows and maintenance.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: stacked fiber splice trays opened to show protected fusion splice routing. Category: Fiber Optic Systems. Specs: Organized splice protection and retention. Use case: Fiber splice workflows and maintenance. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-lc-sc-connectors',
    imagePath: '/products/fiber-lc-sc-connectors.png',
    alt: 'Realistic product visual of LC / SC Connectors for terminating patch panels and end points.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: set of LC and SC fiber connectors arranged in technical layout. Category: Fiber Optic Systems. Specs: LC and SC termination interface options. Use case: Terminating patch panels and end points. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-pigtail-lc-sc',
    imagePath: '/products/fiber-pigtail-lc-sc.png',
    alt: 'Realistic product visual of Pigtail LC / SC for fast and clean fiber terminations.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: bundle of factory-polished LC and SC fiber pigtails with protective sleeves. Category: Fiber Optic Systems. Specs: Factory-polished pigtails for splicing. Use case: Fast and clean fiber terminations. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fiber-coupler-lc-sc',
    imagePath: '/products/fiber-coupler-lc-sc.png',
    alt: 'Realistic product visual of Coupler LC / SC for patch panel and enclosure connection points.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: close technical arrangement of LC and SC duplex couplers and adapters. Category: Fiber Optic Systems. Specs: LC/SC couplers for duplex/simplex continuity. Use case: Patch panel and enclosure connection points. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'patch-fiber-lclc-om3',
    imagePath: '/products/patch-fiber-lclc-om3.png',
    alt: 'Realistic product visual of Fiber Patch Cord LC/LC OM3 for in-rack fiber patching.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: duplex OM3 LC-to-LC fiber patch cord neatly looped for rack use. Category: Patch Cords & Connectivity. Specs: LC-LC duplex OM3 patch lead. Use case: In-rack fiber patching. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'patch-fiber-lclc-os2',
    imagePath: '/products/patch-fiber-lclc-os2.png',
    alt: 'Realistic product visual of Fiber Patch Cord LC/LC Single Mode OS2 for long-distance or single-mode links.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: yellow OS2 single-mode LC-to-LC patch cord in clean service loop. Category: Patch Cords & Connectivity. Specs: OS2 single-mode LC-LC patch cord. Use case: Long-distance or single-mode links. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'patch-hpe-flex-om4',
    imagePath: '/products/patch-hpe-flex-om4.png',
    alt: 'Realistic product visual of HPE Premier Flex LC/LC Multi-mode OM4 for core switch and server interconnects.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: aqua OM4 enterprise patch cord pair with precise duplex LC ends. Category: Patch Cords & Connectivity. Specs: OM4 multimode LC-LC enterprise patching. Use case: Core switch and server interconnects. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'patch-commscope-lclc',
    imagePath: '/products/patch-commscope-lclc.png',
    alt: 'Realistic product visual of CommScope LC to LC Duplex Zipcord for structured fiber patching in cabinets.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: duplex zipcord fiber lead with two parallel jackets and LC connectors. Category: Patch Cords & Connectivity. Specs: Duplex zipcord LC-LC assembly. Use case: Structured fiber patching in cabinets. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'patch-lclc-3m',
    imagePath: '/products/patch-lclc-3m.png',
    alt: 'Realistic product visual of Patch Cord LC/LC 3 Meter for cross-connect and equipment linking.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: 3-meter LC-to-LC patch cable arranged in centered coil. Category: Patch Cords & Connectivity. Specs: 3m LC-LC patch length option. Use case: Cross-connect and equipment linking. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'patch-lcsc',
    imagePath: '/products/patch-lcsc.png',
    alt: 'Realistic product visual of Patch Cord LC/SC for hybrid patching requirements.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: hybrid LC-to-SC fiber patch cable with distinct connector pair. Category: Patch Cords & Connectivity. Specs: Mixed interface LC-SC patch option. Use case: Hybrid patching requirements. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'copper-legrand-cat6',
    imagePath: '/products/copper-legrand-cat6.png',
    alt: 'Realistic product visual of Legrand CAT6 U/UTP LSZH Cable 305M for horizontal office cabling.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: neatly coiled grey CAT6 ethernet cable spool with LSZH jacket texture. Category: Copper / CAT6 Cabling. Specs: 305m box, CAT6 U/UTP, LSZH sheath. Use case: Horizontal office cabling. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'copper-leviton-cat6',
    imagePath: '/products/copper-leviton-cat6.png',
    alt: 'Realistic product visual of Leviton CAT6 LSZH Network Cable 305M for enterprise floor cabling projects.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: boxed-length CAT6 cable represented as organized cable coil and pull-out lead. Category: Copper / CAT6 Cabling. Specs: CAT6 LSZH network cable in 305m length. Use case: Enterprise floor cabling projects. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'copper-panduit-cat6a',
    imagePath: '/products/copper-panduit-cat6a.png',
    alt: 'Realistic product visual of Panduit Category 6A U/UTP Copper Cable 305M for 10g-ready structured cabling layouts.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: high-performance CAT6A copper cable coil with thicker jacket profile. Category: Copper / CAT6 Cabling. Specs: CAT6A U/UTP for higher throughput needs. Use case: 10G-ready structured cabling layouts. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'copper-cat6-patch',
    imagePath: '/products/copper-cat6-patch.png',
    alt: 'Realistic product visual of CAT6 UTP Patch Cord for workstation and patch panel connections.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: short CAT6 UTP patch cords with RJ45 ends arranged by length. Category: Copper / CAT6 Cabling. Specs: UTP CAT6 patch lead variations. Use case: Workstation and patch panel connections. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'copper-cat6a-patch',
    imagePath: '/products/copper-cat6a-patch.png',
    alt: 'Realistic product visual of CAT6A Patch Cord for high-performance switch-to-device links.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: CAT6A patch leads with robust molded boots and RJ45 connectors. Category: Copper / CAT6 Cabling. Specs: CAT6A patching for high bandwidth links. Use case: High-performance switch-to-device links. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fp-legrand-rj45',
    imagePath: '/products/fp-legrand-rj45.png',
    alt: 'Realistic product visual of Legrand RJ45 Socket Category 6 UTP for user outlet and wall point terminations.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: single CAT6 RJ45 outlet module in isolated technical product view. Category: Faceplates / Keystone / RJ45. Specs: CAT6 UTP RJ45 outlet component. Use case: User outlet and wall point terminations. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fp-excel-keystone',
    imagePath: '/products/fp-excel-keystone.png',
    alt: 'Realistic product visual of Excel CAT6 UTP Keystone Jack for patch panel and faceplate integration.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: keystone jack module angled to show punch-down and front port geometry. Category: Faceplates / Keystone / RJ45. Specs: Tool-compatible CAT6 keystone module. Use case: Patch panel and faceplate integration. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fp-surface-back-box',
    imagePath: '/products/fp-surface-back-box.png',
    alt: 'Realistic product visual of Surface Mount Back Box for retrofit locations without flush box.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: surface-mount back box enclosure shown with clean mounting profile. Category: Faceplates / Keystone / RJ45. Specs: Surface-mount enclosure for outlets. Use case: Retrofit locations without flush box. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fp-single-faceplate',
    imagePath: '/products/fp-single-faceplate.png',
    alt: 'Realistic product visual of Single Gang Faceplate for neat and standardized outlet finish.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: single gang faceplate with empty keystone slots in minimal composition. Category: Faceplates / Keystone / RJ45. Specs: Single-gang front plate for keystone inserts. Use case: Neat and standardized outlet finish. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fp-rj45-box',
    imagePath: '/products/fp-rj45-box.png',
    alt: 'Realistic product visual of RJ45 Connector Box for endpoint termination and labeling.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: RJ45 connector wall box housing with cover removed to show interior cavity. Category: Faceplates / Keystone / RJ45. Specs: Housing for RJ45 outlet assemblies. Use case: Endpoint termination and labeling. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'fp-field-plug',
    imagePath: '/products/fp-field-plug.png',
    alt: 'Realistic product visual of Field Termination Plug for custom cable lengths and fast fixes.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: field-termination RJ45 plug with separated cap and conductor guide. Category: Faceplates / Keystone / RJ45. Specs: On-site terminated RJ45 plug component. Use case: Custom cable lengths and fast fixes. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'rack-network-cabinets',
    imagePath: '/products/rack-network-cabinets.png',
    alt: 'Realistic product visual of Network Cabinets for core comms room and edge cabinet deployment.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: 19-inch network rack cabinet with mesh front door and internal rails. Category: Cabinets / Racks / PDU. Specs: 19-inch network cabinet formats. Use case: Core comms room and edge cabinet deployment. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'rack-ups-cabinets',
    imagePath: '/products/rack-ups-cabinets.png',
    alt: 'Realistic product visual of UPS Battery Cabinets for power continuity and backup planning.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: industrial UPS battery cabinet with vented doors and stable pedestal base. Category: Cabinets / Racks / PDU. Specs: Battery cabinet housing for UPS ecosystems. Use case: Power continuity and backup planning. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'rack-apc-schneider-ups',
    imagePath: '/products/rack-apc-schneider-ups.png',
    alt: 'Realistic product visual of APC / Schneider-style UPS Battery Cabinets for data room power infrastructure expansion.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: enterprise-style UPS battery cabinet form factor with modular front panels. Category: Cabinets / Racks / PDU. Specs: Form factors aligned with enterprise UPS environments. Use case: Data room power infrastructure expansion. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'rack-19in-pdu',
    imagePath: '/products/rack-19in-pdu.png',
    alt: 'Realistic product visual of 19 Inch Rack PDU for organized in-rack power delivery.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: horizontal 19-inch rack PDU strip with socket array and power inlet. Category: Cabinets / Racks / PDU. Specs: 19-inch rack power distribution unit. Use case: Organized in-rack power delivery. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'rack-accessories',
    imagePath: '/products/rack-accessories.png',
    alt: 'Realistic product visual of Rack Accessories for clean and scalable rack finishing.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: rack accessory kit with shelf, blanking panel, cable rings, and mounting hardware. Category: Cabinets / Racks / PDU. Specs: Shelves, blanks, cable rings, and mounting kits. Use case: Clean and scalable rack finishing. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'cable-legrand-duct',
    imagePath: '/products/cable-legrand-duct.png',
    alt: 'Realistic product visual of Legrand PVC Decorative Duct for visible office routes with neat finish.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: white PVC decorative cable trunking section with removable top cover. Category: Cable Management / Duct Systems. Specs: Decorative PVC trunking profile. Use case: Visible office routes with neat finish. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'cable-trunking',
    imagePath: '/products/cable-trunking.png',
    alt: 'Realistic product visual of Cable Trunking for protected pathway for network and power runs.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: modular cable trunking channel segments with straight and elbow pieces. Category: Cable Management / Duct Systems. Specs: Cable routing channels and covers. Use case: Protected pathway for network and power runs. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'cable-routing-acc',
    imagePath: '/products/cable-routing-acc.png',
    alt: 'Realistic product visual of Cable Routing Accessories for complete duct system continuity.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: assorted cable routing accessories including corners joints and separators. Category: Cable Management / Duct Systems. Specs: Corners, joints, separators, and route supports. Use case: Complete duct system continuity. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'cctv-hikvision-cams',
    imagePath: '/products/cctv-hikvision-cams.png',
    alt: 'Realistic product visual of Hikvision Network Cameras for office, campus, and facility monitoring.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: generic bullet-style network surveillance camera on neutral mounting bracket. Category: CCTV & Security. Specs: IP camera product lines for surveillance. Use case: Office, campus, and facility monitoring. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'cctv-connectivity',
    imagePath: '/products/cctv-connectivity.png',
    alt: 'Realistic product visual of CCTV Connectivity for reliable camera network communication.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: CCTV connectivity kit with patch leads connectors and inline couplers. Category: CCTV & Security. Specs: Patch, connectors, and endpoint links for CCTV. Use case: Reliable camera network communication. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'cctv-cabling',
    imagePath: '/products/cctv-cabling.png',
    alt: 'Realistic product visual of Camera Cabling for end-to-end surveillance installation readiness.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: camera cabling bundle combining power/data leads in organized loops. Category: CCTV & Security. Specs: Structured paths for camera power/data. Use case: End-to-end surveillance installation readiness. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
  {
    productId: 'cctv-control-room',
    imagePath: '/products/cctv-control-room.png',
    alt: 'Realistic product visual of Control-room Readiness for security operation center preparation.',
    visualType: 'professional catalog photo style',
    prompt:
      'realistic premium studio product photography, professional catalog photo style for B2B network infrastructure, clean dark navy and soft white technical background, subtle orange accent lighting, sharp realistic materials, soft shadows, centered product, square 1:1 composition, realistic product visual, suitable for website product card, no people, no hands, no logos, no readable text, no packaging, no watermark. Product focus: control-room infrastructure concept with monitor wall mounts rack and cable pathways. Category: CCTV & Security. Specs: Infrastructure essentials for monitoring spaces. Use case: Security operation center preparation. Avoid any real brand identity elements.',
    negativePrompt:
      'brand logos, official packaging, text, watermark, price tag, certification badge, people, hands, messy cables, blurry, low resolution, fake label, trademarked logo',
  },
];
