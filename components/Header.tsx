'use client';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/content/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['Home', '/'],['Services', '/services'],['About', '/about'],['Products & Partners', '/products-partners'],['Contact', '/contact']
  ];
  return <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur"><div className="container flex h-16 items-center justify-between"><Link href="/" className="font-bold text-navy-900">{site.brand}</Link><nav className="hidden gap-6 md:flex">{nav.map(([l,h])=><Link key={h} href={h} className="text-sm font-medium">{l}</Link>)}</nav><div className="hidden md:block"><Link href="/contact" className="btn-primary">Request a Quote</Link></div><button className="md:hidden" onClick={()=>setOpen(!open)}>Menu</button></div>{open&&<div className="border-t bg-white md:hidden"><div className="container py-4 flex flex-col gap-3">{nav.map(([l,h])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{l}</Link>)}</div></div>}</header>;
}
