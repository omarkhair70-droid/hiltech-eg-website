import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.defaultTitle,
    template: '%s | HILTECH',
  },
  description: site.defaultDescription,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: site.defaultTitle,
    description: site.defaultDescription,
    url: site.siteUrl,
    siteName: site.brand,
    type: 'website',
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: 'HILTECH network infrastructure and project supply' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.defaultTitle,
    description: site.defaultDescription,
    images: [site.ogImage],
  },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
