import Link from 'next/link';
import { requireAdminSession } from '@/lib/server/admin-auth';
import { PRODUCT_CSV_COLUMNS } from '@/lib/server/products-csv';
import { CsvImportForm } from './upload-form';

export default async function ProductsImportExportPage() {
  await requireAdminSession();
  return <main className='section'><div className='container space-y-6'>
    <div><h1 className='text-2xl font-semibold'>Product CSV Import / Export</h1><p className='text-sm text-slate-600 mt-1'>Bulk manage product catalog and inventory with Excel or Google Sheets.</p></div>
    <div className='flex gap-2 flex-wrap'><Link href='/admin/products/export' className='rounded-md bg-navy-900 px-3 py-2 text-sm font-semibold text-white'>Export products CSV</Link><Link href='/admin/products/template' className='rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold'>Download template CSV</Link><Link href='/admin/products' className='rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold'>Back to Product Admin</Link></div>
    <div className='rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm'><p className='font-semibold'>Safety notes</p><ul className='list-disc pl-5 mt-2 space-y-1'><li><code>product_code</code> is the primary matching key.</li><li>CSV import will never delete products.</li><li>Exact stock quantities remain admin-only.</li><li>Use dry run first before applying updates.</li></ul></div>
    <div className='rounded-xl border border-slate-200 bg-white p-4'><h2 className='text-lg font-semibold'>Expected CSV columns</h2><table className='mt-3 min-w-full text-sm'><tbody>{PRODUCT_CSV_COLUMNS.map((col)=><tr key={col} className='border-t border-slate-100'><td className='py-2 font-mono'>{col}</td></tr>)}</tbody></table></div>
    <CsvImportForm />
  </div></main>;
}
