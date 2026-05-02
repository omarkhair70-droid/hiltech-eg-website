const whatsappBase = 'https://wa.me/201555357807';

const whatsappMessages = {
  general: 'Hello HILTECH, I would like to discuss a network infrastructure request.',
  rfq: 'Hello HILTECH, I would like to request availability and quotation for project supply.',
};

export const site = {
  brand: 'HILTECH',
  officialName: 'Hiltech Network System - H.N.S',
  slogan: 'Strong & Connected',
  positioning: 'Reliable Network Infrastructure, Delivered with Precision.',
  defaultTitle: 'HILTECH | Network Infrastructure, Fiber Optics & Project Supply',
  defaultDescription:
    'HILTECH delivers structured cabling, fiber optic systems, data room infrastructure, CCTV connectivity, network testing, and project-based supply for enterprise environments across Egypt.',
  siteUrl: 'https://hiltech-eg.com',
  ogImage: '/og-image.png',
  contact: {
    email: 'info@hiltech-eg.com',
    phone: '01000087808',
    whatsappIntl: '+20 15 55357807',
    whatsappLocal: '01555357807',
    whatsappLink: whatsappBase,
    whatsappGeneralLink: `${whatsappBase}?text=${encodeURIComponent(whatsappMessages.general)}`,
    whatsappRFQLink: `${whatsappBase}?text=${encodeURIComponent(whatsappMessages.rfq)}`,
    addressEn: 'D1 Tiba Building, Zahraa El Maadi, Cairo, Egypt',
    addressAr: 'شارع زهراء المعادي الرئيسي - عمارات طيبة 1 - بجوار معمار المرشدي - المعادي - القاهرة',
    facebook: 'https://www.facebook.com/share/1DzM44rzsh/'
  }
};

export const services = [
  { title: 'Site Inspection & Technical Survey', description: 'Detailed project site inspection to assess routes, constraints, and infrastructure readiness before implementation.', label: 'Survey' },
  { title: 'Engineering Drawings & Infrastructure Planning', description: 'Structured planning and engineering drawings to align installation scope with project requirements.', label: 'Planning' },
  { title: 'Fiber Optic Installation & Splicing', description: 'Optical fiber extension, welding/splicing, termination, and practical testing support for backbone reliability.', label: 'Fiber' },
  { title: 'Copper Cabling Extension & Termination', description: 'Stranded copper cable extension and termination with structured layout and endpoint labeling discipline.', label: 'Copper' },
  { title: 'Rack & Data Room Readiness', description: 'Rack preparation, patching, cable management, and data room infrastructure organization for maintainability.', label: 'Implementation' },
  { title: 'Testing & Measurement Workflows', description: 'Testing support using Fluke, OTDR, power meter, digital copper tester, and related field tools where applicable.', label: 'Testing' },
  { title: 'Network Infrastructure Implementation', description: 'Execution support for information network infrastructure projects from plan to delivery handover.', label: 'Delivery' },
  { title: 'Maintenance & Operational Support', description: 'Practical support services to help maintain stable network performance after project delivery.', label: 'Support' }
];

export const sectors = [
  { title: 'Offices', description: 'Structured cabling, Wi-Fi readiness, CCTV, and organized network rooms.' },
  { title: 'Factories', description: 'Durable infrastructure for operations, surveillance, and industrial connectivity.' },
  { title: 'Schools', description: 'Reliable networks for administration, classrooms, labs, and security systems.' },
  { title: 'Warehouses', description: 'Connectivity and CCTV infrastructure for large spaces and operational visibility.' },
  { title: 'Retail Spaces', description: 'Clean, scalable networks for POS systems, cameras, and daily operations.' },
  { title: 'Commercial Buildings', description: 'Low-current and network infrastructure for multi-floor facilities.' },
  { title: 'Data Rooms', description: 'Rack organization, patching, labeling, cooling-aware layout, and testing.' },
  { title: 'Enterprise Facilities', description: 'Project-based infrastructure delivery for large-scale technical environments.' }
];

export const infrastructureStack = [
  { title: 'Site Survey & Scope', description: 'Map site constraints, routes, room requirements, and implementation priorities.' },
  { title: 'Product Selection & Supply', description: 'Align products, compatibility, and availability with project technical scope.' },
  { title: 'Structured Installation', description: 'Execute structured cabling, racks, endpoints, and connectivity with standards focus.' },
  { title: 'Cable Management', description: 'Organize pathways, patching, labeling, and cabinet discipline for maintainability.' },
  { title: 'Testing & Validation', description: 'Use Fluke/OTDR-oriented checks to verify link performance and readiness.' },
  { title: 'Handover & Support', description: 'Coordinate final status, handover documentation notes, and operational support.' }
];

export const scenarioCards = [
  { title: 'Office Network Rollout', description: 'Structured cabling, CAT6 endpoints, patch panels, cabinet organization, and testing.' },
  { title: 'Data Room Expansion', description: 'Rack preparation, ODFs, PDUs, fiber/copper patching, cable management, and validation.' },
  { title: 'Fiber Backbone Extension', description: 'OM3/OS2 fiber routes, LC/SC connectivity, splice trays, ODFs, and OTDR-oriented testing.' },
  { title: 'CCTV Infrastructure Readiness', description: 'Camera cabling, network links, control-room preparation, and surveillance connectivity.' }
];

export const quoteOptions = [
  'Structured Cabling',
  'Fiber Optic Installation',
  'Data Center / Rack Setup',
  'CCTV & Security',
  'Fluke / OTDR Testing',
  'CAT6 / Copper Supply',
  'Fiber Cable & Accessories',
  'Cabinets / Racks / PDU',
  'Patch Panels & Connectivity',
  'Maintenance & Support',
  'Not sure yet'
];
