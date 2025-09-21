import { describe, expect, it } from 'vitest';
import {
  activityTypeFromTitle,
  calculateProgramHours,
  clampIndex,
  formatShortDateRu,
  getBlocksSummary,
  getCountdownStatus,
  parseHours,
} from '../../src/utils/course-utils.js';

describe('course utils', () => {
  it('formats Russian short dates without trailing dot', () => {
    const date = new Date('2025-10-20T00:00:00Z');
    expect(formatShortDateRu(date)).toMatch(/\d{2}\s[а-я]+/i);
    expect(formatShortDateRu(date).includes('.')).toBe(false);
  });

  it('parses hour strings with decimal commas', () => {
    expect(parseHours('2,5 ч')).toBe(2.5);
    expect(parseHours('8 ч (лекция + практика)')).toBe(8);
    expect(parseHours('—')).toBe(0);
  });

  it('categorises activity types', () => {
    expect(activityTypeFromTitle('Лекция: обзор')).toBe('lecture');
    expect(activityTypeFromTitle('Прак-работа')).toBe('practice');
    expect(activityTypeFromTitle('Экзамен')).toBe('exam');
    expect(activityTypeFromTitle('Мастер-класс')).toBe('workshop');
  });

  it('summarises blocks and totals hours', () => {
    const summary = getBlocksSummary([
      { title: 'Лекция', hours: '2 ч' },
      { title: 'Прак', hours: '1,5 ч' },
      { title: 'Экзамен', hours: '0.5 ч' },
    ]);
    expect(summary.hours).toBeCloseTo(4);
    expect(summary.typeCounts.practice).toBe(1);
  });

  it('calculates total program hours', () => {
    const modules = [
      { blocks: [{ title: 'Лекция', hours: '2 ч' }] },
      { blocks: [{ title: 'Прак', hours: '1 ч' }] },
    ];
    expect(calculateProgramHours(modules)).toBe(3);
  });

  it('computes countdown status', () => {
    const now = new Date('2025-10-10T00:00:00Z');
    const start = new Date('2025-10-12T00:00:00Z');
    const status = getCountdownStatus(start, now);
    expect(status.isStarted).toBe(false);
    expect(status.days).toBe(2);
  });

  it('wraps carousel index safely', () => {
    expect(clampIndex(0, -1, 3)).toBe(2);
    expect(clampIndex(2, 1, 3)).toBe(0);
  });
});
