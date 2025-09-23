import { beforeAll, describe, expect, it } from 'vitest';
import { access, readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');

beforeAll(async () => {
  await execFileAsync('node', ['scripts/build.mjs'], { cwd: rootDir });
});

describe('build assets', () => {
  it('copies accessibility stylesheet to dist', async () => {
    const filePath = path.join(rootDir, 'dist/assets/css/a11y.css');
    await expect(access(filePath)).resolves.toBeUndefined();
  });

  it('pre-renders core course content into dist/index.html', async () => {
    const html = await readFile(path.join(rootDir, 'dist/index.html'), 'utf8');
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const benefitTexts = Array.from(document.querySelectorAll('#benefits span'))
      .map((node) => node.textContent?.trim())
      .filter(Boolean);
    expect(benefitTexts.length).toBeGreaterThan(0);
    expect(benefitTexts).toContain('Разработка КД и 3D-моделей по существующим деталям');
    const audienceCards = document.querySelectorAll('#audienceGrid article');
    expect(audienceCards.length).toBeGreaterThanOrEqual(4);
    const noscript = document.querySelector('noscript');
    expect(noscript?.textContent).toMatch(/интерактивные элементы/i);
  });
});
