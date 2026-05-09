export type ArProductsMessages = {
  pageTitle: string;
  pageIntro: string;
  searchLabel: string;
  searchPlaceholder: string;
  categoriesLabel: string;
  allCategories: string;
  addToRFQ: string;
  addedToRFQ: string;
  viewDetails: string;
  technicalNotes: string;
  priceReference: string;
  priceOnRequest: string;
  availabilityFallback: string;
  confirmAvailability: string;
  basketTitle: string;
  basketEmpty: string;
  basketCount: string;
  totalUnits: string;
  goToRFQ: string;
  continueBrowsing: string;
  remove: string;
  quantity: string;
  reference: string;
  finalQuoteNote: string;
  noResults: string;
  categoryLabels: Record<string, string>;
};

export const arProductsMessages: ArProductsMessages = {
  pageTitle: 'منتجات وحلول البنية التحتية',
  pageIntro: 'اختر المنتجات أو المكونات المناسبة لمشروعك وأضفها إلى طلب عرض السعر.',
  searchLabel: 'ابحث',
  searchPlaceholder: 'ابحث عن CAT6، فايبر، راك، ODF، باتش بانل...',
  categoriesLabel: 'التصنيفات',
  allCategories: 'كل التصنيفات',
  addToRFQ: 'أضف لطلب عرض السعر',
  addedToRFQ: 'تمت الإضافة',
  viewDetails: 'عرض التفاصيل',
  technicalNotes: 'ملاحظات فنية',
  priceReference: 'السعر المرجعي',
  priceOnRequest: 'السعر عند الطلب',
  availabilityFallback: 'يتم تأكيد التوفر أثناء مراجعة طلب عرض السعر',
  confirmAvailability: 'يتم تأكيد التوفر قبل عرض السعر النهائي',
  basketTitle: 'سلة طلب عرض السعر',
  basketEmpty: 'لم تقم بإضافة منتجات بعد.',
  basketCount: 'العناصر',
  totalUnits: 'إجمالي الكميات',
  goToRFQ: 'مراجعة طلب عرض السعر',
  continueBrowsing: 'متابعة التصفح',
  remove: 'حذف',
  quantity: 'الكمية',
  reference: 'مرجع',
  finalQuoteNote: 'يتم تأكيد السعر النهائي بعد مراجعة طلب عرض السعر.',
  noResults: 'لا توجد منتجات مطابقة للبحث الحالي.',
  categoryLabels: {
    'Fiber Optic Systems': 'أنظمة الفايبر',
    'Copper / CAT6 Cabling': 'كابلات النحاس / CAT6',
    'Patch Cords & Connectivity': 'باتش كورد والربط',
    'Faceplates / Keystone / RJ45': 'فيس بليت / كيستون / RJ45',
    'Cabinets / Racks / PDU': 'الكبائن / الراك / PDU',
    'Cable Management / Duct Systems': 'إدارة الكابلات / مجاري الكابلات',
    'CCTV & Security': 'CCTV والأمن',
  },
};
