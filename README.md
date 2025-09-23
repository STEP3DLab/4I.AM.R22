# 4I.AM.R22 — лендинг интенсивного курса

Информационный сайт интенсивного курса по реверсивному инжинирингу и аддитивному производству. Кодовая база построена на статическом HTML, модульном JavaScript и утилитах для контроля качества.

## Стек

- **Клиент**: статические HTML/CSS, Tailwind CDN, модульный JS (`src/main.js`).
- **Сборка**: Vite (ESM-бандл JS + статический CSS).
- **Инфраструктура**: GitHub Pages, GitHub Actions, Lighthouse CI.
- **Тестирование**: Vitest (unit), Playwright (e2e).
- **Код-стиль**: ESLint, Prettier, EditorConfig.

## Установка

```bash
npm install
```

## Локальная разработка

```bash
npm run dev            # http://localhost:5173 (Vite dev server)
```

## Сборка

```bash
npm run build          # Vite build + копирование статических ресурсов в dist/
```

## Тестирование

```bash
npm run lint           # проверка ESLint
npm run format:check   # проверка форматирования Prettier
npm test               # unit-тесты Vitest
npm run test:e2e       # e2e Playwright (собранный бандл через Vite preview)
```

## Качество

- Lighthouse CI настроен на целевые показатели: производительность ≥ 90, доступность ≥ 90, SEO ≥ 95 (`.lighthouserc.json`).
- В репозитории есть стили `assets/css/a11y.css` с видимыми контурами фокуса и skip-link.
- Для ручной проверки скорости откройте [Lighthouse](https://developers.google.com/web/tools/lighthouse) в Chrome DevTools или запустите `npx lhci autorun` локально (после `npm run build`).

## Деплой

Автоматический деплой выполняется GitHub Actions (`.github/workflows/pages.yml`) при пуше в `main`. Собранный `dist/` загружается через `actions/upload-pages-artifact`, затем публикуется `actions/deploy-pages`.

Ручной деплой из терминала остаётся доступным:

```bash
npm run deploy         # публикация содержимого dist/ через gh-pages
```

## Lighthouse CI

Запуск из Actions: используйте workflow **Lighthouse CI** (`.github/workflows/lhci.yml`). Он собирает проект, поднимает Vite preview и сохраняет отчёты в артефактах.

## SEO

- Мета-теги Open Graph, Twitter и canonical уже внедрены в `<head>` (`index.html`).
- Файл `public/robots.txt` разрешает индексацию и указывает `/sitemap.xml`.
- Скрипт `scripts/generate-sitemap.mjs` собирает статический `public/sitemap.xml` с базовым URL `https://step3dlab.github.io/4I.AM.R22/`.

## Conventional Commits

Используем схему `type(scope): описание`. Примеры:

- `feat(nav): add keyboard focus outline`
- `fix(form): handle invalid email state`
- `chore(ci): add lighthouse workflow`
