import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_BASE_URL = 'https://step3dlab.github.io/4I.AM.R22/';

function determineBaseUrl() {
  const raw = process.env.SITEMAP_BASE_URL;
  if (raw === undefined) {
    return { url: new URL(DEFAULT_BASE_URL), warning: null };
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      url: new URL(DEFAULT_BASE_URL),
      warning: 'SITEMAP_BASE_URL is set but empty after trimming.',
    };
  }

  try {
    return { url: new URL(trimmed), warning: null };
  } catch (error) {
    return {
      url: new URL(DEFAULT_BASE_URL),
      warning: `SITEMAP_BASE_URL is not a valid absolute URL: ${error.message}`,
    };
  }
}

const { url: baseUrl, warning: baseUrlWarning } = determineBaseUrl();
if (baseUrlWarning) {
  console.warn(`[sitemap] ${baseUrlWarning} Falling back to default base URL: ${DEFAULT_BASE_URL}`);
}

const BASE_WITH_TRAILING_SLASH = baseUrl.href.endsWith('/') ? baseUrl.href : `${baseUrl.href}/`;

const pages = [
  { loc: '/', priority: 0.9, changefreq: 'monthly' },
  { loc: '/#about', priority: 0.6, changefreq: 'monthly' },
  { loc: '/#program', priority: 0.7, changefreq: 'monthly' },
  { loc: '/#team', priority: 0.6, changefreq: 'monthly' },
  { loc: '/#apply', priority: 0.8, changefreq: 'weekly' },
];

function resolveUrl(loc) {
  const normalizedLoc = loc.startsWith('/') ? loc.slice(1) : loc;
  try {
    return new URL(normalizedLoc, BASE_WITH_TRAILING_SLASH).toString();
  } catch (error) {
    const message =
      'Failed to resolve URL for sitemap entry. Ensure the base URL is a valid absolute URL.';
    throw new Error(`${message} Original error: ${error.message}`);
  }
}

export async function generateSitemap({ outputDir = 'public', filename = 'sitemap.xml' } = {}) {
  const timestamp = new Date().toISOString();
  const items = pages.map(({ loc, priority, changefreq }) => {
    const url = resolveUrl(loc);
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
