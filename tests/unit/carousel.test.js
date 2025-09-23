import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

let initCarousel;
const baseMarkup = `
  <div id="scrollbar"></div>
  <button id="mobileNavToggle" type="button"></button>
  <div id="mobileNav" data-open="false" class="hidden">
    <div data-mobile-nav-overlay class="opacity-0 pointer-events-none"></div>
    <nav id="mobileNavPanel">
      <div data-mobile-nav-links></div>
      <button type="button" data-mobile-nav-close></button>
    </nav>
  </div>
  <div id="stickyCta" style="opacity:1"></div>
  <nav aria-label="Основная навигация">
    <ul id="navLinks">
      <li><a href="#about" data-nav="about">О курсе</a></li>
      <li><a href="#program" data-nav="program">Программа</a></li>
    </ul>
  </nav>
  <section id="top"></section>
  <section id="about"></section>
  <section id="program"></section>
  <section id="team"></section>
  <section id="apply"></section>
  <div id="carousel" aria-roledescription="карусель" aria-busy="true">
    <div class="carousel-skeleton" data-carousel-skeleton>
      <div class="carousel-skeleton__photo" aria-hidden="true"></div>
      <div class="carousel-skeleton__status" role="status">
        <span class="carousel-skeleton__spinner" aria-hidden="true"></span>
        <span class="carousel-skeleton__text">Загружаем галерею курса…</span>
      </div>
    </div>
  </div>
`;

beforeAll(async () => {
  globalThis.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  globalThis.matchMedia = globalThis.matchMedia || ((query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }));
  document.body.innerHTML = baseMarkup;
  ({ initCarousel } = await import('../../src/main.js'));
});

beforeEach(() => {
  document.body.innerHTML = baseMarkup;
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('carousel lifecycle', () => {
  it('replaces skeleton after successful render', () => {
    vi.useFakeTimers();
    initCarousel({ status: 'success', gallery: [{ id: 1, src: 'test-image.jpg', alt: 'Тест' }] });
    vi.runAllTimers();
    const root = document.getElementById('carousel');
    expect(root?.querySelector('[data-carousel-skeleton]')).toBeNull();
    const img = root?.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src') ?? '').toContain('test-image.jpg');
    expect(root?.getAttribute('data-state')).toBe('ready');
    vi.useRealTimers();
  });

  it('shows informative fallback on error', () => {
    initCarousel({ status: 'error', gallery: [], error: new Error('network') });
    const root = document.getElementById('carousel');
    const fallback = root?.querySelector('.carousel-fallback');
    expect(fallback).not.toBeNull();
    expect(fallback?.textContent).toContain('Не удалось загрузить галерею');
    const cta = fallback?.querySelector('a.carousel-fallback__cta');
    expect(cta?.getAttribute('href')).toContain('images/gallery');
    expect(root?.getAttribute('data-state')).toBe('error');
  });
});
