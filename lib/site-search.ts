import { productIntelligenceCategories } from '@/content/product-intelligence';
import { products } from '@/content/products';
import { solutions } from '@/content/solutions';

export type SearchType = 'Products' | 'Solutions' | 'Services' | 'Resources' | 'Guides' | 'Pages';

export interface SearchEntry {
  title: string;
  description: string;
  keywords: string[];
  type: SearchType;
  href: string;
}

const basePages: SearchEntry[] = [
  { title: 'Home', description: 'HILTECH homepage with core capabilities and quick navigation.', type: 'Pages', href: '/', keywords: ['home', 'hiltech', 'homepage'] },
  { title: 'Products & Partners', description: 'Browse products, brands, and add items to RFQ basket.', type: 'Pages', href: '/products-partners', keywords: ['products', 'catalog', 'partners', 'منتجات', 'كابلات', 'راكات', 'كاميرات'] },
  { title: 'Solutions', description: 'Outcome-oriented enterprise infrastructure solutions.', type: 'Pages', href: '/solutions', keywords: ['solutions', 'حلول', 'infrastructure'] },
  { title: 'Services', description: 'Infrastructure delivery services, installation, and testing.', type: 'Pages', href: '/services', keywords: ['services', 'خدمات', 'testing', 'field'] },
  { title: 'Resources', description: 'Company profile, RFQ guide, one-pagers, and templates.', type: 'Pages', href: '/resources', keywords: ['resources', 'guides', 'materials', 'موارد'] },
  { title: 'Field Work & References', description: 'Public visual references and field delivery proof.', type: 'Pages', href: '/work', keywords: ['work', 'references', 'projects', 'field', 'مرجع'] },
  { title: 'Contact', description: 'Contact HILTECH for project planning and support.', type: 'Pages', href: '/contact', keywords: ['contact', 'تواصل', 'phone', 'whatsapp'] },
  { title: 'Start RFQ', description: 'Open RFQ workflow and submit project requirements.', type: 'Pages', href: '/rfq', keywords: ['rfq', 'quote', 'عرض سعر', 'طلب عرض سعر', 'request for quotation'] },
  { title: 'Track RFQ', description: 'Track previously submitted RFQ updates and status.', type: 'Pages', href: '/track', keywords: ['track rfq', 'track', 'تتبع الطلب', 'rfq status'] },
  { title: 'Scope Finder', description: 'Guided scope tool to define infrastructure direction.', type: 'Pages', href: '/scope-finder', keywords: ['scope finder', 'project scope', 'assistant', 'project planning'] },
];

const services: SearchEntry[] = [
  { title: 'Fiber Installation', description: 'Fiber extension, splicing, termination, and testing support.', type: 'Services', href: '/services', keywords: ['fiber', 'فايبر', 'ألياف ضوئية', 'installation'] },
  { title: 'Rack Installation', description: 'Rack preparation, cable routing, and infrastructure readiness.', type: 'Services', href: '/services', keywords: ['racks', 'راكات', 'cabinet', 'كابينة'] },
  { title: 'Copper Installation', description: 'Structured copper cabling, labeling, and office network delivery.', type: 'Services', href: '/services', keywords: ['copper', 'cabling', 'كابلات', 'شبكة'] },
  { title: 'Network Testing & Measurement', description: 'Fluke, OTDR, power meter, and validation workflows.', type: 'Services', href: '/services', keywords: ['testing', 'otdr', 'fluke', 'validation'] },
];

const resourceLinks: SearchEntry[] = [
  { title: 'RFQ Guide', description: 'Preparation checklist and guidance before RFQ submission.', type: 'Resources', href: '/resources/rfq-guide', keywords: ['rfq guide', 'quote guide', 'عرض سعر'] },
  { title: 'Company Profile', description: 'Company overview, capabilities, and proof content.', type: 'Resources', href: '/resources/company-profile', keywords: ['company profile', 'overview'] },
  { title: 'Client Communication Templates', description: 'Launch-ready public-safe communication templates.', type: 'Resources', href: '/resources/launch-copy', keywords: ['communication', 'templates'] },
];

const guideLinks: SearchEntry[] = productIntelligenceCategories.map((category) => ({
  title: `${category.shortTitle} Guide`,
  description: category.intro,
  type: 'Guides',
  href: `/products-partners/intelligence/${category.slug}`,
  keywords: [...category.relatedCapabilityTags, category.title, 'product intelligence', 'guide'],
}));

const productLinks: SearchEntry[] = products.map((product) => ({
  title: product.name,
  description: `${product.category} • ${product.brand} • ${product.shortSpecs}`,
  type: 'Products',
  href: `/products-partners?product=${product.id}`,
  keywords: [product.brand, product.category, product.useCase, 'products', 'catalog', 'منتجات'],
}));

const solutionLinks: SearchEntry[] = solutions.map((solution) => ({
  title: solution.title,
  description: solution.intro,
  type: 'Solutions',
  href: `/solutions/${solution.slug}`,
  keywords: [solution.shortTitle, solution.eyebrow, ...solution.relatedProductCategories, 'solution', 'حلول'],
}));

export const siteSearchIndex: SearchEntry[] = [
  ...basePages,
  ...services,
  ...resourceLinks,
  ...guideLinks,
  ...productLinks,
  ...solutionLinks,
];

export const popularSearchShortcuts: SearchEntry[] = [
  { title: 'Browse Products', description: 'Open product catalog and product intelligence pathways.', type: 'Pages', href: '/products-partners', keywords: ['products', 'catalog'] },
  { title: 'Start RFQ', description: 'Begin quotation request workflow.', type: 'Pages', href: '/rfq', keywords: ['rfq', 'quote'] },
  { title: 'Track RFQ', description: 'Check RFQ progress and updates.', type: 'Pages', href: '/track', keywords: ['track', 'status'] },
  { title: 'Solutions', description: 'Open solution pages by business outcome.', type: 'Pages', href: '/solutions', keywords: ['solutions'] },
  { title: 'Contact', description: 'Get in touch with HILTECH team.', type: 'Pages', href: '/contact', keywords: ['contact'] },
];
