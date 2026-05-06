import fs from 'node:fs/promises';
import path from 'node:path';

type LogoItem = { src: string; alt: string; filename: string };

export async function getReferenceLogos() {
  const dirs = [
    { fileSystemPath: path.join(process.cwd(), 'public/company-profile/references-unconfirmed'), publicPath: '/company-profile/references-unconfirmed', matcher: (f: string) => /^(client|partner)-.+\.(png|jpe?g|webp|svg)$/i.test(f) },
    { fileSystemPath: path.join(process.cwd(), 'public/references-unconfirmed'), publicPath: '/references-unconfirmed', matcher: (f: string) => /^(client|partner)-.+\.(png|jpe?g|webp|svg)$/i.test(f) },
    { fileSystemPath: path.join(process.cwd(), 'public'), publicPath: '', matcher: (f: string) => /^(client|partner)-.+\.png$/i.test(f) },
  ];

  const logos = await Promise.all(
    dirs.map(async ({ fileSystemPath, publicPath, matcher }) => {
      try {
        const files = await fs.readdir(fileSystemPath);
        return files.filter((f) => matcher(f)).map((f) => ({
          src: `${publicPath}/${f}`,
          filename: f,
          alt: `${f.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')} logo shown in supplied company profile`,
        }));
      } catch {
        return [];
      }
    }),
  );

  const bySource = new Map<string, LogoItem>();
  logos.flat().forEach((logo) => bySource.set(logo.src, logo));
  const sorted = [...bySource.values()].sort((a, b) => a.filename.localeCompare(b.filename));
  return {
    partners: sorted.filter((logo) => logo.filename.toLowerCase().startsWith('partner-')),
    clients: sorted.filter((logo) => logo.filename.toLowerCase().startsWith('client-')),
  };
}
