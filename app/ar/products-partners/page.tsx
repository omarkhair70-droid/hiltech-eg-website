import Link from 'next/link';

export default function Page() {
  return (
    <main className="container section">
      <h1 className="text-3xl font-bold text-navy-900">products-partners (AR)</h1>
      <p className="public-copy mt-3">هذه صفحة انتقالية ضمن المرحلة الأولى (BIL1) لتوفير تغطية مسارات عربية بدون كسر التدفق الحالي.</p>
      <div className="mt-5"><Link href="/products-partners" className="btn-secondary">فتح النسخة الإنجليزية الحالية</Link></div>
    </main>
  );
}
