export type ProductCategory =
  | 'Fiber Optic Systems'
  | 'Copper / CAT6 Cabling'
  | 'Patch Cords & Connectivity'
  | 'Faceplates / Keystone / RJ45'
  | 'Cabinets / Racks / PDU'
  | 'Cable Management / Duct Systems'
  | 'CCTV & Security';

export interface ProductItem {
  id: string;
  category: ProductCategory;
  name: string;
  brand: string;
  shortSpecs: string;
  useCase: string;
  image?: string;
}

export const productCategories: ProductCategory[] = [
  'Fiber Optic Systems',
  'Copper / CAT6 Cabling',
  'Patch Cords & Connectivity',
  'Faceplates / Keystone / RJ45',
  'Cabinets / Racks / PDU',
  'Cable Management / Duct Systems',
  'CCTV & Security',
];

export const featuredProjectSupply = [
  'Enterprise office structured cabling rollout with CAT6/Fiber backbone',
  'Data room expansion with racks, PDUs, cable management, and ODF organization',
  'Surveillance readiness package including CCTV connectivity and camera cabling',
];

export const products: ProductItem[] = [
  { id: 'fiber-leviton-om3', category: 'Fiber Optic Systems', name: 'Leviton OM3 Fiber Cable', brand: 'Leviton', shortSpecs: 'OM3 multimode fiber backbone cable.', useCase: 'Campus and enterprise backbone connectivity.', image: '' },
  { id: 'fiber-om3-12-core', category: 'Fiber Optic Systems', name: 'OM3 Multimode 12 Core Fiber Cable', brand: 'Generic / Multi-brand', shortSpecs: '12-core OM3 multimode configuration.', useCase: 'Inter-floor and data room uplinks.', image: '' },
  { id: 'fiber-armored-outdoor', category: 'Fiber Optic Systems', name: 'Outdoor Armored Fiber Cable', brand: 'Generic / Multi-brand', shortSpecs: 'Outdoor-rated armored protection for harsh paths.', useCase: 'External runs and high-risk cable routes.', image: '' },
  { id: 'fiber-odf', category: 'Fiber Optic Systems', name: 'ODF Optical Distribution Frame', brand: 'Generic / Multi-brand', shortSpecs: 'Fiber termination and management frame.', useCase: 'Centralized fiber distribution in comms rooms.', image: '' },
  { id: 'fiber-panel-24p', category: 'Fiber Optic Systems', name: 'Fiber Patch Panel 24P', brand: 'Generic / Multi-brand', shortSpecs: '24-port fiber panel for rack mounting.', useCase: 'High-density patching and neat terminations.', image: '' },
  { id: 'fiber-splice-trays', category: 'Fiber Optic Systems', name: 'Splice Trays', brand: 'Generic / Multi-brand', shortSpecs: 'Organized splice protection and retention.', useCase: 'Fiber splice workflows and maintenance.', image: '' },
  { id: 'fiber-lc-sc-connectors', category: 'Fiber Optic Systems', name: 'LC / SC Connectors', brand: 'Generic / Multi-brand', shortSpecs: 'LC and SC termination interface options.', useCase: 'Terminating patch panels and end points.', image: '' },
  { id: 'fiber-pigtail-lc-sc', category: 'Fiber Optic Systems', name: 'Pigtail LC / SC', brand: 'Generic / Multi-brand', shortSpecs: 'Factory-polished pigtails for splicing.', useCase: 'Fast and clean fiber terminations.', image: '' },
  { id: 'fiber-coupler-lc-sc', category: 'Fiber Optic Systems', name: 'Coupler LC / SC', brand: 'Generic / Multi-brand', shortSpecs: 'LC/SC couplers for duplex/simplex continuity.', useCase: 'Patch panel and enclosure connection points.', image: '' },
  { id: 'patch-fiber-lclc-om3', category: 'Patch Cords & Connectivity', name: 'Fiber Patch Cord LC/LC OM3', brand: 'Generic / Multi-brand', shortSpecs: 'LC-LC duplex OM3 patch lead.', useCase: 'In-rack fiber patching.', image: '' },
  { id: 'patch-fiber-lclc-os2', category: 'Patch Cords & Connectivity', name: 'Fiber Patch Cord LC/LC Single Mode OS2', brand: 'Generic / Multi-brand', shortSpecs: 'OS2 single-mode LC-LC patch cord.', useCase: 'Long-distance or single-mode links.', image: '' },
  { id: 'patch-hpe-flex-om4', category: 'Patch Cords & Connectivity', name: 'HPE Premier Flex LC/LC Multi-mode OM4', brand: 'HPE', shortSpecs: 'OM4 multimode LC-LC enterprise patching.', useCase: 'Core switch and server interconnects.', image: '' },
  { id: 'patch-commscope-lclc', category: 'Patch Cords & Connectivity', name: 'CommScope LC to LC Duplex Zipcord', brand: 'CommScope', shortSpecs: 'Duplex zipcord LC-LC assembly.', useCase: 'Structured fiber patching in cabinets.', image: '' },
  { id: 'patch-lclc-3m', category: 'Patch Cords & Connectivity', name: 'Patch Cord LC/LC 3 Meter', brand: 'Generic / Multi-brand', shortSpecs: '3m LC-LC patch length option.', useCase: 'Cross-connect and equipment linking.', image: '' },
  { id: 'patch-lcsc', category: 'Patch Cords & Connectivity', name: 'Patch Cord LC/SC', brand: 'Generic / Multi-brand', shortSpecs: 'Mixed interface LC-SC patch option.', useCase: 'Hybrid patching requirements.', image: '' },
  { id: 'copper-legrand-cat6', category: 'Copper / CAT6 Cabling', name: 'Legrand CAT6 U/UTP LSZH Cable 305M', brand: 'Legrand', shortSpecs: '305m box, CAT6 U/UTP, LSZH sheath.', useCase: 'Horizontal office cabling.', image: '' },
  { id: 'copper-leviton-cat6', category: 'Copper / CAT6 Cabling', name: 'Leviton CAT6 LSZH Network Cable 305M', brand: 'Leviton', shortSpecs: 'CAT6 LSZH network cable in 305m length.', useCase: 'Enterprise floor cabling projects.', image: '' },
  { id: 'copper-panduit-cat6a', category: 'Copper / CAT6 Cabling', name: 'Panduit Category 6A U/UTP Copper Cable 305M', brand: 'Panduit', shortSpecs: 'CAT6A U/UTP for higher throughput needs.', useCase: '10G-ready structured cabling layouts.', image: '' },
  { id: 'copper-cat6-patch', category: 'Copper / CAT6 Cabling', name: 'CAT6 UTP Patch Cord', brand: 'Generic / Multi-brand', shortSpecs: 'UTP CAT6 patch lead variations.', useCase: 'Workstation and patch panel connections.', image: '' },
  { id: 'copper-cat6a-patch', category: 'Copper / CAT6 Cabling', name: 'CAT6A Patch Cord', brand: 'Generic / Multi-brand', shortSpecs: 'CAT6A patching for high bandwidth links.', useCase: 'High-performance switch-to-device links.', image: '' },
  { id: 'fp-legrand-rj45', category: 'Faceplates / Keystone / RJ45', name: 'Legrand RJ45 Socket Category 6 UTP', brand: 'Legrand', shortSpecs: 'CAT6 UTP RJ45 outlet component.', useCase: 'User outlet and wall point terminations.', image: '' },
  { id: 'fp-excel-keystone', category: 'Faceplates / Keystone / RJ45', name: 'Excel CAT6 UTP Keystone Jack', brand: 'Excel', shortSpecs: 'Tool-compatible CAT6 keystone module.', useCase: 'Patch panel and faceplate integration.', image: '' },
  { id: 'fp-surface-back-box', category: 'Faceplates / Keystone / RJ45', name: 'Surface Mount Back Box', brand: 'Generic / Multi-brand', shortSpecs: 'Surface-mount enclosure for outlets.', useCase: 'Retrofit locations without flush box.', image: '' },
  { id: 'fp-single-faceplate', category: 'Faceplates / Keystone / RJ45', name: 'Single Gang Faceplate', brand: 'Generic / Multi-brand', shortSpecs: 'Single-gang front plate for keystone inserts.', useCase: 'Neat and standardized outlet finish.', image: '' },
  { id: 'fp-rj45-box', category: 'Faceplates / Keystone / RJ45', name: 'RJ45 Connector Box', brand: 'Generic / Multi-brand', shortSpecs: 'Housing for RJ45 outlet assemblies.', useCase: 'Endpoint termination and labeling.', image: '' },
  { id: 'fp-field-plug', category: 'Faceplates / Keystone / RJ45', name: 'Field Termination Plug', brand: 'Generic / Multi-brand', shortSpecs: 'On-site terminated RJ45 plug component.', useCase: 'Custom cable lengths and fast fixes.', image: '' },
  { id: 'rack-network-cabinets', category: 'Cabinets / Racks / PDU', name: 'Network Cabinets', brand: 'Generic / Multi-brand', shortSpecs: '19-inch network cabinet formats.', useCase: 'Core comms room and edge cabinet deployment.', image: '' },
  { id: 'rack-ups-cabinets', category: 'Cabinets / Racks / PDU', name: 'UPS Battery Cabinets', brand: 'Generic / Multi-brand', shortSpecs: 'Battery cabinet housing for UPS ecosystems.', useCase: 'Power continuity and backup planning.', image: '' },
  { id: 'rack-apc-schneider-ups', category: 'Cabinets / Racks / PDU', name: 'APC / Schneider-style UPS Battery Cabinets', brand: 'APC / Schneider Electric style', shortSpecs: 'Form factors aligned with enterprise UPS environments.', useCase: 'Data room power infrastructure expansion.', image: '' },
  { id: 'rack-19in-pdu', category: 'Cabinets / Racks / PDU', name: '19 Inch Rack PDU', brand: 'Generic / Multi-brand', shortSpecs: '19-inch rack power distribution unit.', useCase: 'Organized in-rack power delivery.', image: '' },
  { id: 'rack-accessories', category: 'Cabinets / Racks / PDU', name: 'Rack Accessories', brand: 'Generic / Multi-brand', shortSpecs: 'Shelves, blanks, cable rings, and mounting kits.', useCase: 'Clean and scalable rack finishing.', image: '' },
  { id: 'cable-legrand-duct', category: 'Cable Management / Duct Systems', name: 'Legrand PVC Decorative Duct', brand: 'Legrand', shortSpecs: 'Decorative PVC trunking profile.', useCase: 'Visible office routes with neat finish.', image: '' },
  { id: 'cable-trunking', category: 'Cable Management / Duct Systems', name: 'Cable Trunking', brand: 'Generic / Multi-brand', shortSpecs: 'Cable routing channels and covers.', useCase: 'Protected pathway for network and power runs.', image: '' },
  { id: 'cable-routing-acc', category: 'Cable Management / Duct Systems', name: 'Cable Routing Accessories', brand: 'Generic / Multi-brand', shortSpecs: 'Corners, joints, separators, and route supports.', useCase: 'Complete duct system continuity.', image: '' },
  { id: 'cctv-hikvision-cams', category: 'CCTV & Security', name: 'Hikvision Network Cameras', brand: 'Hikvision', shortSpecs: 'IP camera product lines for surveillance.', useCase: 'Office, campus, and facility monitoring.', image: '' },
  { id: 'cctv-connectivity', category: 'CCTV & Security', name: 'CCTV Connectivity', brand: 'Generic / Multi-brand', shortSpecs: 'Patch, connectors, and endpoint links for CCTV.', useCase: 'Reliable camera network communication.', image: '' },
  { id: 'cctv-cabling', category: 'CCTV & Security', name: 'Camera Cabling', brand: 'Generic / Multi-brand', shortSpecs: 'Structured paths for camera power/data.', useCase: 'End-to-end surveillance installation readiness.', image: '' },
  { id: 'cctv-control-room', category: 'CCTV & Security', name: 'Control-room Readiness', brand: 'Generic / Multi-brand', shortSpecs: 'Infrastructure essentials for monitoring spaces.', useCase: 'Security operation center preparation.', image: '' },
];

export const productDisclaimer =
  'Product availability, specifications, and pricing are subject to confirmation. Brand references do not imply formal partnership unless explicitly stated.';
