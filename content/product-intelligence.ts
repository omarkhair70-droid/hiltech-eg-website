import { productCategories, type ProductCategory } from './products';

export interface ProductIntelligenceCategory {
  slug: string;
  title: ProductCategory;
  shortTitle: string;
  eyebrow: string;
  intro: string;
  strategicSummary: string;
  typicalComponents: string[];
  commonUseCases: string[];
  requestChecklist: string[];
  compatibilityNotes: string[];
  handoverNotes: string[];
  relatedCapabilityTags: string[];
  disclaimer: string;
}

export const productIntelligenceCategories: ProductIntelligenceCategory[] = [
  {
    slug: 'fiber-optic-systems',
    title: 'Fiber Optic Systems',
    shortTitle: 'Fiber Systems',
    eyebrow: 'Backbone Infrastructure',
    intro:
      'Fiber optic systems support high-capacity campus and building backbones where distance, low latency, and future expansion readiness are critical.',
    strategicSummary:
      'This category typically sits between distribution/core network nodes and floor or building cross-connects. Planning should align cable type (OM3/OM4/OS2), enclosure density, and termination standards with both current and planned uplink architectures.',
    typicalComponents: ['OM3/OS2 fiber backbone cable', 'ODF and rack-mounted optical distribution', 'Splice trays and fiber protection accessories', 'LC/SC adapters, connectors, and pigtails', 'Fiber patch panels and patching jumpers'],
    commonUseCases: ['Enterprise HQ backbone migration', 'Data room interconnect between core and access layers', 'Campus block-to-block fiber links', 'Indoor/outdoor routed fiber for resilient pathways'],
    requestChecklist: ['Fiber type and core count by route', 'Approximate route lengths and environment (indoor/outdoor)', 'Required connector interfaces (LC/SC, simplex/duplex)', 'Rack/ODF termination point counts', 'Testing and labeling expectations'],
    compatibilityNotes: ['Confirm transceiver and interface compatibility before procurement.', 'Outdoor routes may require armored or higher-protection construction.', 'Patching conventions should remain consistent across racks for operations handover.'],
    handoverNotes: ['As-built route maps and labeling register', 'Test report package and acceptance criteria', 'Spare core strategy for future expansion'],
    relatedCapabilityTags: ['Structured Cabling', 'Data Room Readiness', 'Network Backbone Planning'],
    disclaimer:
      'Product availability, exact part numbers, and lead times are confirmed during RFQ review based on project scope and compatibility requirements.',
  },
  {
    slug: 'copper-cat6-cabling',
    title: 'Copper / CAT6 Cabling',
    shortTitle: 'Copper CAT6',
    eyebrow: 'Horizontal Network Layer',
    intro:
      'CAT6/CAT6A cabling provides the horizontal infrastructure linking floor distribution to user endpoints, APs, and device zones.',
    strategicSummary:
      'Copper structured cabling is usually the highest-volume material package in office and commercial deployments. Design decisions around cable class, pathway occupancy, and patching density directly influence performance consistency and future troubleshooting effort.',
    typicalComponents: ['CAT6/CAT6A horizontal cable reels', 'Patch panels and termination hardware', 'Outlet modules and endpoint finishing accessories', 'Copper patch cords for rack and endpoint links', 'Cable identification and management consumables'],
    commonUseCases: ['Office floor fit-out projects', 'Commercial tenant network refresh', 'Branch rollout with standardized endpoint topology', 'Upgrade programs for higher throughput readiness'],
    requestChecklist: ['Number of endpoints and floor-wise distribution', 'Cable category target (CAT6 or CAT6A)', 'Patch panel port density requirements', 'Outlet/faceplate quantities and installation type', 'Testing standard expectations and reporting format'],
    compatibilityNotes: ['Mixing CAT6 and CAT6A should be planned intentionally based on channel objectives.', 'Pathway fill and bend radius affect long-term performance.', 'Active equipment port types and PoE requirements should be validated early.'],
    handoverNotes: ['Labeling matrix for panels and outlets', 'Fluke or equivalent test documentation requirements', 'MAC (moves/adds/changes) reserve capacity guidance'],
    relatedCapabilityTags: ['Structured Cabling', 'Commercial Networks', 'Testing Readiness'],
    disclaimer:
      'Pricing, accepted equivalent brands, and installation accessories are finalized during RFQ alignment and technical confirmation.',
  },
  {
    slug: 'patch-cords-connectivity',
    title: 'Patch Cords & Connectivity',
    shortTitle: 'Patching',
    eyebrow: 'Cross-Connect Layer',
    intro:
      'Patch cords and connectivity accessories complete active links between panels, switches, servers, and endpoint equipment.',
    strategicSummary:
      'This category governs day-to-day operability in cabinets and endpoint zones. Consistent interface types, lengths, and media choices reduce downtime risk and simplify service operations across enterprise sites.',
    typicalComponents: ['Fiber patch cords (LC/LC, LC/SC, OM3/OM4/OS2)', 'Copper patch cords (CAT6/CAT6A)', 'Adapter couplers and interface conversion accessories', 'Cable rings and short-run patch management'],
    commonUseCases: ['Rack patching normalization in data rooms', 'Server/switch and patch panel interconnect', 'Endpoint patching for office handover', 'Hybrid fiber-copper connection layouts'],
    requestChecklist: ['Interface map (LC/SC/RJ45 by location)', 'Length mix for rack, cross-connect, and endpoint zones', 'Media type alignment (OM3/OM4/OS2/CAT6/CAT6A)', 'Color coding or labeling conventions', 'Spare patching ratio requirements'],
    compatibilityNotes: ['Connector polish and mode mismatch can impact optical performance.', 'Keep length planning disciplined to avoid excessive slack and airflow obstruction.', 'Copper patch cord class should not undercut channel objectives.'],
    handoverNotes: ['Patching matrix and naming convention', 'Spare inventory recommendation by size and type', 'Operational patching governance notes'],
    relatedCapabilityTags: ['Rack Operations', 'Endpoint Readiness', 'Connectivity Standardization'],
    disclaimer:
      'Final selections depend on port/interface audit and project standards provided in the RFQ package.',
  },
  {
    slug: 'faceplates-keystone-rj45',
    title: 'Faceplates / Keystone / RJ45',
    shortTitle: 'Faceplates & Keystone',
    eyebrow: 'Endpoint Finishing',
    intro:
      'Faceplates, keystone jacks, and RJ45 finishing components define the quality and maintainability of endpoint delivery.',
    strategicSummary:
      'Though compact in unit size, endpoint finishing components strongly influence handover quality. Standardized module selection and labeling workflows support faster support response and cleaner user-area outcomes.',
    typicalComponents: ['Keystone jacks (CAT6/CAT6A)', 'Faceplates and mounting frames', 'RJ45 outlet/termination accessories', 'Surface/back boxes for retrofit zones', 'Field-termination plugs for special runs'],
    commonUseCases: ['Office endpoint finishing and user move-ins', 'Commercial retrofit where flush mounting is limited', 'Structured cabling outlet standardization', 'Conference room and workstation delivery packages'],
    requestChecklist: ['Outlet quantity per floor/area', 'Faceplate format and aesthetic constraints', 'Termination standard (T568A/B) requirements', 'Flush vs surface-mount ratio', 'Labeling scope for end-user support'],
    compatibilityNotes: ['Ensure keystone footprint consistency across selected faceplate families.', 'Mixed termination practices can increase troubleshooting complexity.', 'Outlet counts should align with switch port and patch panel plans.'],
    handoverNotes: ['Outlet schedule and location register', 'Termination standard declaration', 'User-area labeling and acceptance notes'],
    relatedCapabilityTags: ['Endpoint Delivery', 'Commercial Fit-out', 'Documentation Discipline'],
    disclaimer:
      'Exact module models and finishing options are validated during project scoping and RFQ confirmation.',
  },
  {
    slug: 'cabinets-racks-pdu',
    title: 'Cabinets / Racks / PDU',
    shortTitle: 'Racks & PDU',
    eyebrow: 'Data Room Foundation',
    intro:
      'Cabinets, racks, PDUs, and rack accessories provide the physical and power foundation for network and system deployment.',
    strategicSummary:
      'This category shapes infrastructure reliability and serviceability. Cabinet dimensions, thermal allowances, vertical/horizontal cable paths, and in-rack power distribution must be coordinated with network and facility teams before procurement.',
    typicalComponents: ['19-inch network cabinets and racks', 'Rack PDUs and power distribution accessories', 'UPS battery cabinet formats', 'Rack shelves, blanking panels, and mounting kits', 'Cable rings, trays, and vertical managers'],
    commonUseCases: ['New comms room setup', 'Core rack expansion for enterprise growth', 'Branch mini-data-room standardization', 'Power organization and in-rack resiliency improvements'],
    requestChecklist: ['Cabinet dimensions and rack unit targets', 'Power feed design and outlet format requirements', 'UPS integration and battery cabinet scope', 'Cooling/airflow and door/perforation preferences', 'Accessory list for finishing and cable control'],
    compatibilityNotes: ['Power input/output connector compatibility should be checked with facility power plans.', 'Rack depth must match active equipment and cable bend requirements.', 'Expansion headroom is recommended for long-term maintainability.'],
    handoverNotes: ['Rack elevation and power map', 'Grounding and safety handover checklist', 'Installed accessory and spare hardware record'],
    relatedCapabilityTags: ['Data Room Readiness', 'Power Distribution', 'Infrastructure Standardization'],
    disclaimer:
      'Cabinet and power product selection is confirmed after validating site dimensions, electrical constraints, and project staging.',
  },
  {
    slug: 'cable-management-duct-systems',
    title: 'Cable Management / Duct Systems',
    shortTitle: 'Cable Management',
    eyebrow: 'Pathway & Maintainability',
    intro:
      'Cable management and duct systems keep network routes organized, protected, and maintainable across visible and concealed installations.',
    strategicSummary:
      'Pathway design is central to safety, aesthetics, and operational lifecycle quality. Correct trunking dimensions, segregation practices, and route continuity reduce rework and support cleaner commissioning.',
    typicalComponents: ['PVC duct and trunking profiles', 'Cable pathway covers and protective channels', 'Corners, tees, joints, separators, and accessories', 'Route support and fixing elements'],
    commonUseCases: ['Open office visible cable containment', 'Retrofit routes in commercial facilities', 'Data room cable entry and pathway organization', 'Mixed low-voltage route segregation programs'],
    requestChecklist: ['Route lengths and pathway type by zone', 'Visible vs concealed installation preference', 'Cable fill assumptions for each trunk size', 'Accessories required for route continuity', 'Finishing and maintenance access expectations'],
    compatibilityNotes: ['Pathway sizing should include growth margin, not only initial fill.', 'Low-voltage segregation and pathway constraints must follow site standards.', 'Route design should coordinate with civil/MEP interfaces.'],
    handoverNotes: ['As-built pathway drawing updates', 'Accessory usage register', 'Maintenance and expansion notes for future works'],
    relatedCapabilityTags: ['Route Engineering', 'Commercial Fit-out', 'Operational Maintainability'],
    disclaimer:
      'Route-specific quantities and accessory mixes are finalized after receiving project drawings and RFQ clarifications.',
  },
  {
    slug: 'cctv-security',
    title: 'CCTV & Security',
    shortTitle: 'CCTV & Security',
    eyebrow: 'Surveillance Infrastructure',
    intro:
      'CCTV and security infrastructure packages support reliable camera connectivity, monitoring continuity, and control-room readiness.',
    strategicSummary:
      'Security deployments require coordination between network, power, and operations teams. Camera locations, PoE budgeting, retention strategy, and monitoring-room readiness should be aligned before material finalization.',
    typicalComponents: ['Camera connectivity accessories and terminations', 'CCTV-oriented cabling pathways', 'Patch and endpoint links for security networks', 'Control-room rack and endpoint readiness items'],
    commonUseCases: ['Office and facility surveillance rollout', 'Campus perimeter and entry monitoring expansions', 'Control-room modernization initiatives', 'PoE-based camera network readiness upgrades'],
    requestChecklist: ['Camera count and location schedule', 'PoE and network switch readiness assumptions', 'Control-room infrastructure and display zone requirements', 'Cabling route constraints and environment notes', 'Retention, monitoring, and expansion considerations'],
    compatibilityNotes: ['PoE class and switch capacity should be validated with camera plans.', 'Security VLAN and network segmentation may affect topology choices.', 'Physical mounting and route constraints can impact accessory selection.'],
    handoverNotes: ['Camera connectivity map and labels', 'Control-room patching and endpoint schedule', 'Future expansion notes for additional cameras/zones'],
    relatedCapabilityTags: ['Security Network Planning', 'PoE Readiness', 'Control Room Preparation'],
    disclaimer:
      'Security product mixes are refined through RFQ review to match project scope, compatibility checks, and implementation constraints.',
  },
];

export const productIntelligenceBySlug = Object.fromEntries(
  productIntelligenceCategories.map((entry) => [entry.slug, entry]),
) as Record<string, ProductIntelligenceCategory>;

export const productIntelligenceSlugByCategory: Record<ProductCategory, string> = {
  'Fiber Optic Systems': 'fiber-optic-systems',
  'Copper / CAT6 Cabling': 'copper-cat6-cabling',
  'Patch Cords & Connectivity': 'patch-cords-connectivity',
  'Faceplates / Keystone / RJ45': 'faceplates-keystone-rj45',
  'Cabinets / Racks / PDU': 'cabinets-racks-pdu',
  'Cable Management / Duct Systems': 'cable-management-duct-systems',
  'CCTV & Security': 'cctv-security',
};

export const hasIntelligenceCoverage = (category: string): category is ProductCategory =>
  productCategories.includes(category as ProductCategory);
