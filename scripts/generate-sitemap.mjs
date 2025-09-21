import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL =
  process.env.SITEMAP_BASE_URL?.replace(/\/$/, '') || 'https://step3dlab.github.io/4I.AM.R22';

const pages = [
  { loc: '/', priority: 0.9, changefreq: 'monthly' },
  { loc: '/#about', priority: 0.6, changefreq: 'monthly' },
  { loc: '/#program', priority: 0.7, changefreq: 'monthly' },
  { loc: '/#team', priority: 0.6, changefreq: 'monthly' },
  { loc: '/#apply', priority: 0.8, changefreq: 'weekly' },
];

export async function generateSitemap({ outputDir = 'public', filename = 'sitemap.xml' } = {}) {
  const timestamp = new Date().toISOString();
  const items = pages.map(({ loc, priority, changefreq }) => {
    const url = `${BASE_URL}${loc}`;
    return `    <url>\n      <loc>${url}</loc>\n      <lastmod>${timestamp}</lastmod>\n      <changefreq>${changefreq}</changefreq>\n      <priority>${priority}</priority>\n    </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join('\n')}\n</urlset>\n`;
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, filename), xml, 'utf8');
  return path.join(outputDir, filename);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap().catch((error) => {
    console.error('[sitemap] generation failed', error);
    process.exitCode = 1;
  });
}
