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
  { title: 'Structured Cabling', description: 'Organized copper cabling systems for offices, data rooms, and enterprise networks.', label: 'Service' },
  { title: 'Fiber Optic Installation', description: 'Fiber backbone installation, termination, accessories, and testing for high-speed connectivity.', label: 'Service' },
  { title: 'Network Infrastructure', description: 'Passive and active infrastructure planning for reliable business network operations.', label: 'Service' },
  { title: 'CCTV & Security Systems', description: 'Surveillance infrastructure, camera connectivity, and control-room readiness.', label: 'Service' },
  { title: 'Data Center Setup', description: 'Rack, cabinet, cabling, and data room preparation for stable IT environments.', label: 'Data Center' },
  { title: 'Network Testing & Certification', description: 'Fluke and OTDR-oriented testing workflows to verify performance before handover.', label: 'Testing' },
  { title: 'Maintenance & Support', description: 'Preventive and corrective support to keep network infrastructure stable.', label: 'Service' },
  { title: 'UTP / Fiber Solutions', description: 'Copper and fiber combinations selected based on distance, speed, and project requirements.', label: 'Service' }
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
  'Service Installation: Structured Cabling',
  'Service Installation: Fiber Optic Installation',
  'Service Installation: Data Center / Rack Setup',
  'Service Installation: CCTV & Security Infrastructure',
  'Testing & Validation: Fluke / OTDR',
  'Product Supply: CAT6 / Copper Cabling',
  'Product Supply: Fiber Cable & Accessories',
  'Product Supply: Cabinets / Racks / PDU',
  'Product Supply: Patch Panels & Connectivity',
  'Maintenance & Support',
  'Not sure yet'
];
