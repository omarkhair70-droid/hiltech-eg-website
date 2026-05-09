/**
 * Project Bundles: Real, maintainable scope starters for B2B RFQ expansion
 * Uses only existing product IDs from content/products.ts
 */

export interface ProjectBundle {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  productIds: string[];
  category: 'network' | 'infrastructure' | 'fiber' | 'security';
}

export const projectBundles: ProjectBundle[] = [
  {
    id: 'office-network-setup',
    titleEn: 'Office Network Setup',
    titleAr: 'إعداد شبكة المكتب',
    descriptionEn: 'Recommended scope starter for office cabling infrastructure',
    descriptionAr: 'نطاق البداية الموصى به لبنية الكابلات المكتبية',
    productIds: [
      'copper-legrand-cat6', // CAT6 cable
      'fp-excel-keystone', // Keystone
      'fp-single-faceplate', // Faceplate
      'copper-cat6-patch', // Patch cord
      'rack-network-cabinets', // Rack
    ],
    category: 'network',
  },
  {
    id: 'rack-room-preparation',
    titleEn: 'Rack Room Preparation',
    titleAr: 'تحضير غرفة الرف',
    descriptionEn: 'Complete scope for data room and equipment cabinet setup',
    descriptionAr: 'نطاق كامل لإعداد غرفة البيانات وخزانة المعدات',
    productIds: [
      'rack-network-cabinets', // Racks
      'rack-19in-pdu', // PDU
      'rack-accessories', // Accessories
      'fiber-panel-24p', // Fiber panel
      'cable-routing-acc', // Cable management
    ],
    category: 'infrastructure',
  },
  {
    id: 'fiber-backbone-scope',
    titleEn: 'Fiber Backbone Scope',
    titleAr: 'نطاق العمود الفقري للألياف',
    descriptionEn: 'Recommended scope starter for campus fiber connectivity',
    descriptionAr: 'نطاق البداية الموصى به لاتصال ألياف الحرم الجامعي',
    productIds: [
      'fiber-om3-12-core', // Fiber cable
      'fiber-odf', // ODF
      'fiber-pigtail-lc-sc', // Pigtails
      'fiber-coupler-lc-sc', // Couplers
      'patch-fiber-lclc-om3', // Fiber patch cord
    ],
    category: 'fiber',
  },
  {
    id: 'cctv-infrastructure-scope',
    titleEn: 'CCTV Infrastructure Scope',
    titleAr: 'نطاق بنية كاميرات المراقبة',
    descriptionEn: 'Recommended scope starter for surveillance readiness',
    descriptionAr: 'نطاق البداية الموصى به لجاهزية المراقبة',
    productIds: [
      'cctv-hikvision-cams', // Cameras
      'cctv-connectivity', // Connectivity
      'cctv-cabling', // Camera cabling
      'rack-network-cabinets', // Rack support
      'copper-cat6-patch', // Patch cords
    ],
    category: 'security',
  },
];

/**
 * Companion product recommendations by product ID
 * Helps users build more complete project scopes
 */
export const companionRecommendations: Record<string, string[]> = {
  // CAT6 cable → recommend keystone, faceplate, patch, rack
  'copper-legrand-cat6': ['fp-excel-keystone', 'fp-single-faceplate', 'copper-cat6-patch', 'rack-network-cabinets'],
  'copper-leviton-cat6': ['fp-excel-keystone', 'fp-single-faceplate', 'copper-cat6-patch', 'rack-network-cabinets'],
  'copper-panduit-cat6a': ['fp-excel-keystone', 'fp-single-faceplate', 'copper-cat6a-patch', 'rack-network-cabinets'],

  // Fiber cable → recommend ODF, pigtails, couplers, patch cord
  'fiber-om3-12-core': ['fiber-odf', 'fiber-pigtail-lc-sc', 'fiber-coupler-lc-sc', 'patch-fiber-lclc-om3'],
  'fiber-leviton-om3': ['fiber-odf', 'fiber-pigtail-lc-sc', 'fiber-coupler-lc-sc', 'patch-fiber-lclc-om3'],
  'fiber-armored-outdoor': ['fiber-odf', 'fiber-pigtail-lc-sc', 'fiber-coupler-lc-sc', 'patch-fiber-lclc-om3'],

  // Rack → recommend PDU, accessories, cable management, patch panel
  'rack-network-cabinets': ['rack-19in-pdu', 'rack-accessories', 'cable-routing-acc', 'fiber-panel-24p'],

  // CCTV camera → recommend connectivity, cabling, rack, patch cord
  'cctv-hikvision-cams': ['cctv-connectivity', 'cctv-cabling', 'rack-network-cabinets', 'copper-cat6-patch'],

  // Keystone → recommend faceplate, patch cord, cable
  'fp-excel-keystone': ['fp-single-faceplate', 'copper-cat6-patch', 'copper-legrand-cat6'],

  // ODF → recommend pigtails, couplers, patch cord
  'fiber-odf': ['fiber-pigtail-lc-sc', 'fiber-coupler-lc-sc', 'patch-fiber-lclc-om3'],

  // Patch cord → recommend source products (cable, keystone, etc)
  'copper-cat6-patch': ['copper-legrand-cat6', 'fp-excel-keystone', 'rack-network-cabinets'],
  'patch-fiber-lclc-om3': ['fiber-om3-12-core', 'fiber-odf', 'fiber-coupler-lc-sc'],
};

/**
 * Smart basket recommendations based on what's missing
 * Analyzes the current basket and suggests missing companion categories
 */
export interface BasketRecommendationRule {
  name: string;
  condition: (productIds: string[]) => boolean;
  recommendedProductIds: string[];
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
}

export const basketRecommendationRules: BasketRecommendationRule[] = [
  {
    name: 'copper-missing-termination',
    condition: (productIds) => {
      const hasCopper = productIds.some((id) => id.includes('copper') || id.includes('cat6'));
      const hasTermination = productIds.some(
        (id) => id.includes('fp-') || id.includes('faceplate') || id.includes('keystone')
      );
      return hasCopper && !hasTermination;
    },
    recommendedProductIds: ['fp-excel-keystone', 'fp-single-faceplate', 'copper-cat6-patch'],
    titleEn: 'Complete Your Copper Scope',
    titleAr: 'أكمل نطاق النحاس',
    messageEn: 'Add termination essentials: keystone jacks, faceplates, and patch cords to complete your cabling scope.',
    messageAr: 'أضف ضروريات الإنهاء: جاكات الكيستون، واللوحات الأمامية، وسلاسل التصحيح لإكمال نطاق الكابلات.',
  },
  {
    name: 'fiber-missing-termination',
    condition: (productIds) => {
      const hasFiber = productIds.some((id) => id.includes('fiber') && !id.includes('panel'));
      const hasTermination = productIds.some(
        (id) => id.includes('odf') || id.includes('pigtail') || id.includes('coupler') || id.includes('patch-fiber')
      );
      return hasFiber && !hasTermination;
    },
    recommendedProductIds: ['fiber-odf', 'fiber-pigtail-lc-sc', 'fiber-coupler-lc-sc', 'patch-fiber-lclc-om3'],
    titleEn: 'Complete Your Fiber Scope',
    titleAr: 'أكمل نطاق الألياف',
    messageEn: 'Add fiber distribution essentials: ODF, pigtails, couplers, and patch cords for clean terminations.',
    messageAr: 'أضف ضروريات توزيع الألياف: ODF والذيول والمقارنات وسلاسل الألياف للإنهاء النظيف.',
  },
  {
    name: 'rack-missing-power-management',
    condition: (productIds) => {
      const hasRack = productIds.some((id) => id.includes('rack-network'));
      const hasPower = productIds.some((id) => id.includes('pdu') || id.includes('ups'));
      return hasRack && !hasPower;
    },
    recommendedProductIds: ['rack-19in-pdu', 'rack-accessories', 'cable-routing-acc'],
    titleEn: 'Complete Your Rack Infrastructure',
    titleAr: 'أكمل بنية الرف',
    messageEn: 'Add power distribution and accessories: PDU, rack accessories, and cable management for complete deployment.',
    messageAr: 'أضف توزيع الطاقة والملحقات: PDU وملحقات الرف وإدارة الكابلات للنشر الكامل.',
  },
  {
    name: 'cctv-missing-connectivity',
    condition: (productIds) => {
      const hasCCTV = productIds.some((id) => id.includes('cctv-hikvision'));
      const hasConnectivity = productIds.some((id) => id.includes('cctv-connectivity') || id.includes('copper-cat6'));
      return hasCCTV && !hasConnectivity;
    },
    recommendedProductIds: ['cctv-connectivity', 'cctv-cabling', 'copper-cat6-patch'],
    titleEn: 'Complete Your CCTV Scope',
    titleAr: 'أكمل نطاق كاميرات المراقبة',
    messageEn: 'Add connectivity essentials: camera cabling, patch cords, and network support for full surveillance deployment.',
    messageAr: 'أضف ضروريات الاتصال: كابلات الكاميرا وسلاسل التصحيح ودعم الشبكة للنشر الكامل للمراقبة.',
  },
];

/**
 * Get companion recommendations for a product
 * Used on product detail pages
 */
export function getCompanionRecommendations(productId: string): string[] {
  return companionRecommendations[productId] || [];
}

/**
 * Get applicable basket recommendations
 * Analyzes current basket and returns relevant recommendations
 */
export function getBasketRecommendations(productIds: string[]): BasketRecommendationRule[] {
  return basketRecommendationRules.filter((rule) => rule.condition(productIds));
}
