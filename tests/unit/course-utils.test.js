import { describe, expect, it } from 'vitest';
import {
  activityTypeFromTitle,
  calculateProgramHours,
  clampIndex,
  formatLongDateRu,
  formatShortDateRu,
  getBlocksSummary,
  getCountdownStatus,
  normalizeActivityType,
  parseHours,
} from '../../src/utils/course-utils.js';

describe('course utils', () => {
  it('formats Russian short dates without trailing dot', () => {
    const date = new Date('2025-10-20T00:00:00Z');
    expect(formatShortDateRu(date)).toMatch(/\d{2}\s[а-я]+/i);
    expect(formatShortDateRu(date).includes('.')).toBe(false);
  });

  it('formats long Russian dates without year abbreviation', () => {
    const date = new Date('2025-10-20T09:00:00+03:00');
    expect(formatLongDateRu(date)).toBe('20 октября 2025');
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
      { title: 'Лекция', hours: '2 ч', type: 'lecture' },
      { title: 'Практика', hours: '—', durationHours: 1.5, type: 'practice' },
      { title: 'Экзамен', durationHours: 0.5, type: 'exam' },
    ]);
    expect(summary.hours).toBeCloseTo(4);
    expect(summary.typeCounts.practice).toBe(1);
    expect(summary.typeCounts.exam).toBe(1);
  });

  it('normalises activity types with explicit overrides', () => {
    expect(normalizeActivityType('exam', 'Лекция')).toBe('exam');
    expect(normalizeActivityType(undefined, 'Мастер-класс')).toBe('workshop');
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
    expect(clampIndex(1, 10, 4)).toBe(3);
    expect(clampIndex(1, -10, 4)).toBe(3);
    expect(clampIndex(0, -13, 5)).toBe(2);
  });
});
