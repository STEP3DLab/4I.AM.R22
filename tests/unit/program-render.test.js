import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

describe('program rendering', () => {
  let renderProgram;
  let getInitialOpenDay;
  let rafSpy;

  beforeAll(async () => {
    globalThis.__STEP3D_SKIP_AUTO_INIT__ = true;
    ({ renderProgram, getInitialOpenDay } = await import('../../src/main.js'));
  });

  afterAll(() => {
    delete globalThis.__STEP3D_SKIP_AUTO_INIT__;
  });

  beforeEach(() => {
    document.body.innerHTML = '<div id="programRoot"></div>';
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (cb) => {
        cb();
        return 0;
      };
    }
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb();
      return 0;
    });
  });

  afterEach(() => {
    rafSpy?.mockRestore();
    document.body.innerHTML = '';
  });

  it('selects the first available day for the initial state', () => {
    expect(
      getInitialOpenDay([
        { day: '10 (Пн)', blocks: [] },
        { day: '11 (Вт)', blocks: [] },
      ]),
    ).toBe('10 (Пн)');
    expect(getInitialOpenDay([{ day: '  ' }, { day: '11 (Вт)', blocks: [] }])).toBe('11 (Вт)');
    expect(getInitialOpenDay([])).toBe('');
  });

  it('renders fallbacks when program modules are empty', () => {
    renderProgram({ modules: [] });

    const tabs = document.querySelector('#dayTabs');
    expect(tabs).toBeTruthy();
    expect(tabs?.textContent).toContain('Расписание формируется');

    const body = document.querySelector('#programDays');
    expect(body).toBeTruthy();
    expect(body?.textContent).toContain('Скоро появится подробное расписание');
  });

  it('keeps modules collapsed by default', () => {
    renderProgram({
      modules: [
        { day: '10 (Пн — обновлено)', blocks: [] },
        { day: '11 (Вт)', blocks: [] },
      ],
    });

    const dayButtons = document.querySelectorAll('#programDays button[aria-expanded]');
    expect(dayButtons.length).toBeGreaterThan(1);
    dayButtons.forEach((btn) => {
      expect(btn.getAttribute('aria-expanded')).toBe('false');
    });

    const panels = document.querySelectorAll('#programDays [id^="program-day-"]');
    panels.forEach((panel) => {
      expect(panel?.hasAttribute('hidden')).toBe(true);
    });
  });
});
