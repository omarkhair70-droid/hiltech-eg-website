import Link from 'next/link';

export default function AdminNotFound() {
  return <main className='section'><div className='container max-w-xl space-y-3'><h1 className='text-xl font-semibold'>Admin page not found.</h1><Link href='/admin/login' className='text-navy-900 underline'>Return to admin login</Link></div></main>;
}
