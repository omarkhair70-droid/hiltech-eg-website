import { products, type ProductCategory, type ProductItem } from './products';

export type ProductId = ProductItem['id'];

export interface BundleRequirement {
  id: string;
  label: string;
  acceptedCategories: ProductCategory[];
  recommendedProductIds: ProductId[];
  required: boolean;
}

export interface ProjectBundle {
  id: string;
  title: string;
  shortDescription: string;
  useCase: string;
  starterProductIds: ProductId[];
  requirements: BundleRequirement[];
}

const productIds = new Set(products.map((product) => product.id));

const defineBundle = (bundle: ProjectBundle): ProjectBundle => {
  for (const productId of bundle.starterProductIds) {
    if (!productIds.has(productId)) {
      throw new Error(`Unknown starter product id in bundle ${bundle.id}: ${productId}`);
    }
  }

  for (const requirement of bundle.requirements) {
    for (const productId of requirement.recommendedProductIds) {
      if (!productIds.has(productId)) {
        throw new Error(`Unknown recommended product id in bundle ${bundle.id}/${requirement.id}: ${productId}`);
      }
    }
  }

  return bundle;
};

export const projectBundles: ProjectBundle[] = [
  defineBundle({
    id: 'office-network-setup',
    title: 'Office Network Setup Starter',
    shortDescription: 'Starter RFQ scope for a floor-level office network rollout.',
    useCase: 'New office floors, fit-outs, and expansion projects that need structured endpoint-ready connectivity.',
    starterProductIds: ['copper-legrand-cat6', 'fp-legrand-rj45', 'copper-cat6-patch', 'rack-network-cabinets'],
    requirements: [
      { id: 'office-copper-backbone', label: 'Copper/CAT6 horizontal cabling', acceptedCategories: ['Copper / CAT6 Cabling'], recommendedProductIds: ['copper-legrand-cat6', 'copper-leviton-cat6'], required: true },
      { id: 'office-endpoint-termination', label: 'Endpoint faceplate/keystone termination', acceptedCategories: ['Faceplates / Keystone / RJ45'], recommendedProductIds: ['fp-legrand-rj45', 'fp-excel-keystone'], required: true },
      { id: 'office-patching', label: 'Patch connectivity for work areas and cabinet links', acceptedCategories: ['Patch Cords & Connectivity', 'Copper / CAT6 Cabling'], recommendedProductIds: ['copper-cat6-patch'], required: true },
      { id: 'office-rack-support', label: 'Basic cabinet/rack readiness', acceptedCategories: ['Cabinets / Racks / PDU'], recommendedProductIds: ['rack-network-cabinets', 'rack-accessories'], required: false },
    ],
  }),
  defineBundle({
    id: 'rack-room-preparation',
    title: 'Rack Room Preparation Starter',
    shortDescription: 'Starter RFQ scope for rack and data-room infrastructure readiness.',
    useCase: 'Server room preparation and expansion where power, organization, and patching need alignment.',
    starterProductIds: ['rack-network-cabinets', 'rack-19in-pdu', 'fiber-panel-24p', 'cable-trunking'],
    requirements: [
      { id: 'rack-cabinet', label: 'Rack/cabinet foundation', acceptedCategories: ['Cabinets / Racks / PDU'], recommendedProductIds: ['rack-network-cabinets'], required: true },
      { id: 'rack-power-distribution', label: 'PDU and rack power distribution', acceptedCategories: ['Cabinets / Racks / PDU'], recommendedProductIds: ['rack-19in-pdu'], required: true },
      { id: 'rack-patching', label: 'Patch panel / structured patching layer', acceptedCategories: ['Fiber Optic Systems', 'Patch Cords & Connectivity'], recommendedProductIds: ['fiber-panel-24p', 'patch-fiber-lclc-om3'], required: true },
      { id: 'rack-cable-management', label: 'Cable pathway and duct management', acceptedCategories: ['Cable Management / Duct Systems'], recommendedProductIds: ['cable-trunking', 'cable-routing-acc'], required: true },
    ],
  }),
  defineBundle({
    id: 'fiber-backbone-scope',
    title: 'Fiber Backbone Scope Starter',
    shortDescription: 'Starter RFQ scope for fiber backbone deployment and termination.',
    useCase: 'Inter-floor, campus, and data-room links that require fiber transport and neat terminations.',
    starterProductIds: ['fiber-om3-12-core', 'fiber-odf', 'patch-fiber-lclc-om3', 'fiber-lc-sc-connectors'],
    requirements: [
      { id: 'fiber-cable', label: 'Fiber backbone cable', acceptedCategories: ['Fiber Optic Systems'], recommendedProductIds: ['fiber-om3-12-core', 'fiber-leviton-om3'], required: true },
      { id: 'fiber-termination-odf', label: 'ODF / fiber termination frame', acceptedCategories: ['Fiber Optic Systems'], recommendedProductIds: ['fiber-odf', 'fiber-panel-24p'], required: true },
      { id: 'fiber-patching', label: 'Fiber patch connectivity', acceptedCategories: ['Patch Cords & Connectivity'], recommendedProductIds: ['patch-fiber-lclc-om3', 'patch-commscope-lclc'], required: true },
      { id: 'fiber-accessories', label: 'Fiber accessories (connectors/couplers/pigtails)', acceptedCategories: ['Fiber Optic Systems'], recommendedProductIds: ['fiber-lc-sc-connectors', 'fiber-coupler-lc-sc', 'fiber-pigtail-lc-sc'], required: true },
    ],
  }),
  defineBundle({
    id: 'cctv-infrastructure-scope',
    title: 'CCTV Infrastructure Scope Starter',
    shortDescription: 'Starter RFQ scope for CCTV network infrastructure and support readiness.',
    useCase: 'Surveillance projects needing camera network foundation, routing, and comms-room support.',
    starterProductIds: ['cctv-hikvision-cams', 'cctv-cabling', 'cable-trunking', 'rack-network-cabinets'],
    requirements: [
      { id: 'cctv-core-item', label: 'Core CCTV/security device layer', acceptedCategories: ['CCTV & Security'], recommendedProductIds: ['cctv-hikvision-cams', 'cctv-control-room'], required: true },
      { id: 'cctv-connectivity-layer', label: 'Cabling and connectivity for cameras', acceptedCategories: ['CCTV & Security', 'Copper / CAT6 Cabling', 'Patch Cords & Connectivity'], recommendedProductIds: ['cctv-cabling', 'cctv-connectivity', 'copper-cat6-patch'], required: true },
      { id: 'cctv-pathway-management', label: 'Pathway / cable management', acceptedCategories: ['Cable Management / Duct Systems'], recommendedProductIds: ['cable-trunking', 'cable-routing-acc'], required: true },
      { id: 'cctv-rack-readiness', label: 'Rack/control-room support infrastructure', acceptedCategories: ['Cabinets / Racks / PDU'], recommendedProductIds: ['rack-network-cabinets', 'rack-19in-pdu'], required: false },
    ],
  }),
];
