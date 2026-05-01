export type ScopeEnvironment =
  | 'office-commercial'
  | 'school-training'
  | 'warehouse-factory'
  | 'data-room'
  | 'retail-branch'
  | 'cctv-security'
  | 'not-sure';

export type ScopeNeed =
  | 'new-network'
  | 'upgrade-network'
  | 'fiber-backbone'
  | 'cctv-readiness'
  | 'data-room-organization'
  | 'product-supply-only'
  | 'testing-validation'
  | 'not-sure';

export type ScopeScale = 'small' | 'medium' | 'large' | 'multi-floor' | 'not-sure';
export type SupplyMode = 'supply-install' | 'supply-only' | 'install-only' | 'not-sure';
export type CCTVNeed = 'yes' | 'no' | 'maybe-later';
export type TestingNeed = 'full-testing' | 'basic-handover' | 'not-sure';
export type Urgency = 'standard' | 'urgent' | 'planning';

export interface ScopeAnswers {
  environment: ScopeEnvironment;
  mainNeed: ScopeNeed;
  scale: ScopeScale;
  supplyMode: SupplyMode;
  cctv: CCTVNeed;
  testing: TestingNeed;
  urgency: Urgency;
}

export interface ScopeStarterItem {
  name: string;
  category: string;
  brand: string;
  unit: 'pcs' | 'set';
  notes?: string;
}

export interface ScopeResult {
  title: string;
  explanation: string;
  solutionSlugs: string[];
  productSlugs: string[];
  starterItems: ScopeStarterItem[];
}

export const requestChecklist = [
  'Project location',
  'Approximate endpoint/camera count',
  'Floor count or zone count',
  'Cable/fiber preference',
  'Preferred brands (if any)',
  'Target timeline and urgency',
  'Photos, layout, or floor plan (if available)',
];

const defaults: ScopeResult = {
  title: 'Infrastructure Discovery + Preliminary RFQ Direction',
  explanation:
    'Your selections suggest a mixed or early-stage requirement. Start with a discovery-ready RFQ to confirm scope, compatibility, and implementation priorities with HILTECH.',
  solutionSlugs: ['structured-cabling', 'project-supply-rfq'],
  productSlugs: ['copper-cat6-cabling', 'patch-cords-connectivity', 'cabinets-racks-pdu'],
  starterItems: [
    { name: 'CAT6 cabling starter set', category: 'Copper/CAT6 Cabling', brand: 'Generic / Multi-brand', unit: 'set' },
    { name: 'Patch panel', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
    { name: 'Network cabinet', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
    { name: 'Basic testing and validation scope', category: 'Testing & Validation', brand: 'Generic / Multi-brand', unit: 'set' },
  ],
};

export function resolveScopeResult(answers: ScopeAnswers): ScopeResult {
  if (answers.mainNeed === 'fiber-backbone') {
    return {
      title: 'Fiber Backbone + Testing',
      explanation: 'You appear to need inter-floor/inter-zone backbone capacity with validation-ready delivery.',
      solutionSlugs: ['fiber-backbone', 'network-testing'],
      productSlugs: ['fiber-optic-systems', 'patch-cords-connectivity'],
      starterItems: [
        { name: 'Fiber cable', category: 'Fiber Optic Systems', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'ODF', category: 'Fiber Optic Systems', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Fiber patch panel', category: 'Fiber Optic Systems', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'LC/SC accessories', category: 'Patch Cords & Connectivity', brand: 'Generic / Multi-brand', unit: 'set' },
        { name: 'OTDR testing scope', category: 'Testing & Validation', brand: 'Generic / Multi-brand', unit: 'set' },
      ],
    };
  }

  if (answers.environment === 'data-room' || answers.mainNeed === 'data-room-organization') {
    return {
      title: 'Data Room Organization + Project Supply',
      explanation: 'Your request centers on rack layout, cable management, and readiness of the technical room environment.',
      solutionSlugs: ['data-rooms', 'project-supply-rfq'],
      productSlugs: ['cabinets-racks-pdu', 'cable-management-duct-systems', 'fiber-optic-systems'],
      starterItems: [
        { name: 'Network cabinet', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Rack PDU', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Patch panels', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'ODF', category: 'Fiber Optic Systems', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Cable management accessories', category: 'Cable Management & Duct Systems', brand: 'Generic / Multi-brand', unit: 'set' },
      ],
    };
  }

  if (answers.environment === 'cctv-security' || answers.mainNeed === 'cctv-readiness' || answers.cctv === 'yes') {
    return {
      title: 'CCTV Infrastructure Readiness',
      explanation: 'Your selections indicate CCTV/security readiness with network and control-point preparation.',
      solutionSlugs: ['cctv-infrastructure', 'structured-cabling'],
      productSlugs: ['cctv-security', 'copper-cat6-cabling', 'cabinets-racks-pdu'],
      starterItems: [
        { name: 'CCTV cabling set', category: 'CCTV/Security', brand: 'Generic / Multi-brand', unit: 'set' },
        { name: 'PoE/network readiness components', category: 'Copper/CAT6 Cabling', brand: 'Generic / Multi-brand', unit: 'set' },
        { name: 'Patch panel', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Network cabinet', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Control-room readiness items', category: 'CCTV/Security', brand: 'Generic / Multi-brand', unit: 'set' },
      ],
    };
  }

  if (answers.mainNeed === 'product-supply-only' || answers.supplyMode === 'supply-only') {
    return {
      title: 'Project Supply Direction + RFQ Preparation',
      explanation: 'Your request is supply-focused. Use category-guided products and RFQ details to speed availability and quotation confirmation.',
      solutionSlugs: ['project-supply-rfq'],
      productSlugs: ['copper-cat6-cabling', 'fiber-optic-systems', 'cabinets-racks-pdu'],
      starterItems: [
        { name: 'Category-aligned supply shortlist', category: 'General', brand: 'Generic / Multi-brand', unit: 'set' },
        { name: 'Connectivity accessories', category: 'Patch Cords & Connectivity', brand: 'Generic / Multi-brand', unit: 'set' },
        { name: 'Rack/cabinet essentials', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'set' },
      ],
    };
  }

  if (answers.mainNeed === 'new-network' || answers.mainNeed === 'upgrade-network') {
    return {
      title: 'Structured Cabling + Rack Readiness',
      explanation: 'This direction fits network installation or upgrade work with endpoint distribution and rack organization.',
      solutionSlugs: ['structured-cabling', 'data-rooms'],
      productSlugs: ['copper-cat6-cabling', 'cabinets-racks-pdu', 'patch-cords-connectivity'],
      starterItems: [
        { name: 'CAT6 cable', category: 'Copper/CAT6 Cabling', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Patch panel', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Faceplates / keystone', category: 'Patch Cords & Connectivity', brand: 'Generic / Multi-brand', unit: 'set' },
        { name: 'Network cabinet', category: 'Cabinets, Racks & PDU', brand: 'Generic / Multi-brand', unit: 'pcs' },
        { name: 'Testing and validation scope', category: 'Testing & Validation', brand: 'Generic / Multi-brand', unit: 'set' },
      ],
    };
  }

  return defaults;
}
