'use client';

import { useState } from 'react';

export default function ImagePreview({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) return <p className="rounded-md border border-amber-200 bg-amber-50 p-2 text-sm text-amber-700">Image preview unavailable.</p>;
  return <img src={src} alt={alt} className="max-h-56 rounded-md border border-slate-200 object-contain" onError={() => setBroken(true)} />;
}
