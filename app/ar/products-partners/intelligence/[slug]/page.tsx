import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionShell } from '@/components/ui/primitives';
import { productIntelligenceBySlug } from '@/content/product-intelligence';
interface Params { slug: string }
export default function Page({ params }: { params: Params }) { const category=productIntelligenceBySlug[params.slug]; if(!category) notFound();
return <main dir="rtl"><SectionShell><h1 className="text-3xl font-bold">ملاحظات فنية</h1><p className="mt-3 text-sm text-slate-700">استخدم هذه الملاحظات لفهم السياق الفني قبل طلب عرض السعر.</p><p className="mt-2 text-sm text-slate-600">قد تحتوي بعض التفاصيل الفنية على مصطلحات إنجليزية لأنها أسماء فنية أو مواصفات منتجات.</p><div className="mt-5 flex gap-3"><Link href="/ar/products-partners" className="rounded-lg border px-4 py-2">العودة إلى المنتجات</Link><Link href={`/products-partners/intelligence/${params.slug}`} className="rounded-lg bg-navy-900 px-4 py-2 text-white">عرض المحتوى الفني</Link></div></SectionShell></main>; }
