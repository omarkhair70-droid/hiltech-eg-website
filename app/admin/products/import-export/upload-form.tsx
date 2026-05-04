'use client';
import { useState } from 'react';

export function CsvImportForm() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true); setError(''); setResult(null);
    const res = await fetch('/admin/products/import', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Import failed.');
    else setResult(data);
    setLoading(false);
  }

  return <form action={onSubmit} className='rounded-xl border border-slate-200 bg-white p-4 space-y-3'>
    <h2 className='text-lg font-semibold'>Import CSV</h2>
    <input required type='file' name='file' accept='.csv,text/csv' className='block w-full text-sm' />
    <label className='flex items-center gap-2 text-sm'><input type='checkbox' name='dry_run' defaultChecked />Dry run (no database writes)</label>
    <label className='flex items-center gap-2 text-sm'><input type='checkbox' name='create_missing' />Create missing products</label>
    <button disabled={loading} className='rounded-md bg-navy-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50'>{loading ? 'Processing…' : 'Run import'}</button>
    {error ? <p className='rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700'>{error}</p> : null}
    {result?.summary ? <div className='rounded border border-slate-200 bg-slate-50 p-3 text-sm space-y-1'><p><strong>Total rows:</strong> {result.summary.totalRows}</p><p><strong>Valid rows:</strong> {result.summary.validRows}</p><p><strong>Invalid rows:</strong> {result.summary.invalidRows}</p><p><strong>Would update:</strong> {result.summary.wouldUpdate}</p><p><strong>Would create:</strong> {result.summary.wouldCreate}</p><p><strong>Skipped:</strong> {result.summary.skipped}</p>{result.summary.errors?.length ? <div><p className='font-semibold'>Errors:</p><ul className='list-disc pl-5'>{result.summary.errors.map((e:string)=><li key={e}>{e}</li>)}</ul></div> : null}</div> : null}
  </form>;
}
