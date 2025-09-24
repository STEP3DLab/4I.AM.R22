import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('initScrollBar', () => {
  let initScrollBar;

  beforeAll(async () => {
    globalThis.__STEP3D_SKIP_AUTO_INIT__ = true;
    ({ initScrollBar } = await import('../../src/main.js'));
  });

  afterAll(() => {
    delete globalThis.__STEP3D_SKIP_AUTO_INIT__;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('exits early if the scrollbar element is missing', () => {
    const documentSpy = vi.spyOn(document, 'addEventListener');
    const windowSpy = vi.spyOn(window, 'addEventListener');

    expect(() => initScrollBar()).not.toThrow();
    expect(documentSpy).not.toHaveBeenCalled();
    expect(windowSpy).not.toHaveBeenCalled();
  });
});
