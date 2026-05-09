import Link from 'next/link';

export default function ArabicScopeFinderPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-6" dir="rtl">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">تحتاج مساعدة في تحديد نطاق الطلب؟</h1>
        <p className="mt-4 text-base leading-8 text-slate-700">
          يمكنك تجهيز طلب عرض سعر منظم بإضافة المنتجات والكميات أو كتابة نطاق المشروع، وسيقوم فريق HILTECH بمراجعة التفاصيل واقتراح المكونات المناسبة.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/ar/rfq" className="btn-primary">ابدأ طلب عرض السعر</Link>
          <Link href="/ar/products-partners" className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50">تصفح المنتجات</Link>
          <Link href="/ar/contact" className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50">تواصل معنا</Link>
        </div>
      </section>
    </main>
  );
}
