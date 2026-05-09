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

  clearFilters: string;
  showingOfProducts: string;
  showingResultsFor: string;
  specsLabel: string;
  priceRefLabel: string;
  loadMoreProducts: string;
  needHelpScoping: string;
  startScopeFinder: string;
  technicalNotesOptional: string;
  technicalGuidesHelp: string;
  viewTechnicalNotes: string;
  close: string;
  basketIntro: string;
  browseProducts: string;
  qtyLabel: string;
  addItemNotes: string;
  removeItem: string;
  sendViaWhatsapp: string;
  clearBasket: string;
  reviewRfqBasket: string;
  noProductsFound: string;
  basketEmptyHint: string;
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

  clearFilters: 'مسح الفلاتر',
  showingOfProducts: 'عرض {shown} من {total} منتج',
  showingResultsFor: 'عرض {count} نتيجة عن "{query}"',
  specsLabel: 'المواصفات:',
  priceRefLabel: 'مرجع السعر',
  loadMoreProducts: 'عرض المزيد من المنتجات',
  needHelpScoping: 'تحتاج مساعدة في تحديد نطاق الطلب؟',
  startScopeFinder: 'ابدأ تحديد النطاق',
  technicalNotesOptional: 'ملاحظات فنية اختيارية',
  technicalGuidesHelp: 'استخدم هذه الملاحظات عند الحاجة إلى سياق فني أعمق بعد تجهيز طلب العرض.',
  viewTechnicalNotes: 'عرض الملاحظات الفنية',
  close: 'إغلاق',
  basketIntro: 'جهّز طلب توريد مشروعك، أضف الكميات والملاحظات، ثم أرسله إلى HILTECH. يتم تأكيد السعر النهائي بعد مراجعة الطلب.',
  browseProducts: 'تصفح المنتجات',
  qtyLabel: 'الكمية',
  addItemNotes: 'أضف ملاحظات للعنصر',
  removeItem: 'حذف العنصر',
  sendViaWhatsapp: 'إرسال عبر واتساب',
  clearBasket: 'تفريغ السلة',
  reviewRfqBasket: 'مراجعة سلة طلب العرض',
  noProductsFound: 'لا توجد منتجات مطابقة للبحث الحالي.',
  basketEmptyHint: 'أضف منتجات لتجهيز طلب عرض السعر بشكل أسرع.',
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
