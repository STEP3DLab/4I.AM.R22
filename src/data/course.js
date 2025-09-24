let cachedConfig = null;

async function loadSiteConfig() {
  if (cachedConfig) return cachedConfig;
  const configUrl = new URL('./config.json', import.meta.url);
  const isNode = typeof process !== 'undefined' && process.versions?.node;
  if (isNode) {
    const { readFile } = await import('node:fs/promises');
    if (configUrl.protocol === 'file:') {
      const file = await readFile(configUrl, 'utf-8');
      cachedConfig = JSON.parse(file);
      return cachedConfig;
    }
    const { resolve } = await import('node:path');
    const relativePath = decodeURIComponent(
      configUrl.pathname.startsWith('/') ? configUrl.pathname.slice(1) : configUrl.pathname,
    );
    const filePath = resolve(process.cwd(), relativePath);
    const file = await readFile(filePath, 'utf-8');
    cachedConfig = JSON.parse(file);
    return cachedConfig;
  }
  if (typeof fetch !== 'function') {
    throw new Error('Fetch API is not available to load config.json');
  }
  const response = await fetch(configUrl);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить config.json: ${response.status} ${response.statusText}`);
  }
  cachedConfig = await response.json();
  return cachedConfig;
}

const SITE_CONFIG = await loadSiteConfig();
const COURSE_CONFIG = SITE_CONFIG?.course ?? {};
const { startDate: COURSE_START_ISO } = COURSE_CONFIG;

if (typeof COURSE_START_ISO !== 'string' || COURSE_START_ISO.length === 0) {
  throw new Error('config.course.startDate must be a non-empty ISO date string');
}

const COURSE_START = new Date(COURSE_START_ISO);

if (Number.isNaN(COURSE_START.valueOf())) {
  throw new Error('config.course.startDate must represent a valid date');
}

export { COURSE_CONFIG, COURSE_START, COURSE_START_ISO, SITE_CONFIG, loadSiteConfig };
