import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionShell } from '@/components/ui/primitives';
import { productIntelligenceBySlug } from '@/content/product-intelligence';
interface Params { slug: string }
export default function Page({ params }: { params: Params }) {
  const category = productIntelligenceBySlug[params.slug]; if (!category) notFound();
  return <main dir="rtl" className="bg-slate-950 text-slate-100"><SectionShell><section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f3a] via-[#0d2444] to-[#101a2d] p-6 md:p-8"><p className="text-xs font-semibold tracking-[0.18em] text-orange-300">مرجع فني للمشروع</p><h1 className="mt-3 text-3xl font-bold text-white">{category.title}</h1><p className="mt-3 text-sm text-slate-200">استخدم هذه الصفحة لفهم السياق الفني ومتطلبات التوافق قبل تجهيز طلب عرض السعر.</p><p className="mt-2 text-sm text-slate-300">قد تتضمن بعض المصطلحات الإنجليزية لأنها أسماء تقنية قياسية للمكونات والمواصفات.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/ar/products-partners" className="rounded-lg border border-white/15 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100">العودة إلى المنتجات</Link><Link href="/ar/rfq" className="btn-primary">ابدأ طلب عرض سعر</Link><Link href={`/products-partners/intelligence/${params.slug}`} className="rounded-lg border border-orange-300/40 bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-100">عرض النسخة التقنية الإنجليزية</Link></div></section></SectionShell></main>;
}
