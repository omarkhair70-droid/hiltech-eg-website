export type TrackMessages = {
  trackTitle: string;
  trackIntro: string;
  rfqReference: string;
  phoneOrEmail: string;
  trackButton: string;
  tracking: string;
  status: string;
  created: string;
  lastUpdate: string;
  requestedItems: string;
  nextStep: string;
  reference: string;
  contactHiltech: string;
  backToRFQ: string;
  notFound: string;
  verificationHint: string;
  genericError: string;
  statusMessages: Record<string, string>;
  fallbackStatus: string;
};

export const arTrackMessages: TrackMessages = {
  trackTitle: 'تتبع طلب عرض السعر',
  trackIntro: 'أدخل رقم طلب عرض السعر ونفس رقم الهاتف أو البريد الإلكتروني المستخدم عند الإرسال.',
  rfqReference: 'رقم طلب العرض',
  phoneOrEmail: 'رقم الهاتف أو البريد الإلكتروني',
  trackButton: 'تتبع الطلب',
  tracking: 'جارٍ التتبع...',
  status: 'الحالة',
  created: 'تاريخ الإنشاء',
  lastUpdate: 'آخر تحديث',
  requestedItems: 'العناصر المطلوبة',
  nextStep: 'الخطوة التالية',
  reference: 'رقم الطلب',
  contactHiltech: 'تواصل مع HILTECH',
  backToRFQ: 'العودة إلى طلب عرض السعر',
  notFound: 'لم نتمكن من العثور على طلب مطابق بهذه البيانات.',
  verificationHint: 'تأكد من إدخال رقم الطلب ونفس رقم الهاتف أو البريد الإلكتروني المستخدم عند إرسال الطلب.',
  genericError: 'تعذر تحميل حالة الطلب حاليًا. يرجى المحاولة مرة أخرى.',
  statusMessages: {
    new: 'تم استلام طلبك، وسيقوم فريق HILTECH بمراجعة العناصر ونطاق العمل.',
    in_review: 'طلبك قيد المراجعة، وقد يتم التواصل معك لتوضيح بعض التفاصيل.',
    quoted: 'تم تجهيز عرض السعر أو جارٍ مشاركته معك.',
    waiting_client: 'بانتظار ردك أو تأكيد بعض التفاصيل.',
    won: 'تم قبول الطلب والانتقال للخطوة التالية.',
    lost: 'تم إغلاق هذا الطلب.',
    closed: 'تم إغلاق هذا الطلب.',
  },
  fallbackStatus: 'جارٍ متابعة حالة الطلب.',
};
