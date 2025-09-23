import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { COURSE_START, COURSE_START_ISO } from '../../src/data/course.js';
import { formatLongDateRu } from '../../src/utils/course-utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');

describe('course start metadata', () => {
  it('exports a valid course start date', () => {
    expect(COURSE_START).toBeInstanceOf(Date);
    expect(Number.isNaN(COURSE_START.valueOf())).toBe(false);
    expect(new Date(COURSE_START_ISO).toISOString()).toBe(COURSE_START.toISOString());
  });

  it('keeps hero and lead start labels in sync', async () => {
    const html = await readFile(path.join(projectRoot, 'index.html'), 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const heroStart = document.getElementById('heroStartDate');
    const leadStart = document.getElementById('leadStart');
    const formatted = formatLongDateRu(COURSE_START);

    expect(heroStart?.textContent?.trim()).toBe(formatted);
    expect(heroStart?.getAttribute('data-start')).toBe(COURSE_START_ISO);
    expect(leadStart?.textContent?.replace(/\s+/g, ' ').trim()).toBe(`Старт: ${formatted}`);
    expect(leadStart?.getAttribute('data-start')).toBe(COURSE_START_ISO);
  });
});
