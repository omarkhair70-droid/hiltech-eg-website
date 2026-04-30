import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hiltech-eg.com';
  return ['','/services','/about','/products-partners','/rfq','/contact'].map((p)=>({url:`${base}${p}`,lastModified:new Date()}));
}
