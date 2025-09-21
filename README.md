# 4I.AM.R22 — лендинг интенсивного курса

## Стек

- **Статика**: HTML + Tailwind CDN, модульный JS (`src/main.js`).
- **Инструменты**: ESLint, Prettier, Vitest, Playwright, Lighthouse CI.
- **Деплой**: GitHub Pages через GitHub Actions.

## Быстрый старт

```bash
npm install
npm run dev             # локальный статический сервер (http://localhost:8080)
```

## Проверки перед коммитом

```bash
npm run lint            # ESLint
npm run format:check    # Prettier в режиме проверки
npm test                # unit-тесты (Vitest)
npm run test:e2e        # end-to-end (Playwright)
npx lhci autorun        # Lighthouse (использует dist)
```

## Сборка и деплой

```bash
npm run build           # dist/ + sitemap
npm run deploy          # публикация в gh-pages ветку
```

Автоматический деплой выполняется при пуше в `main` (`.github/workflows/deploy.yml`).

## Conventional commits

Используем схему: `type(scope): краткое описание`. Примеры:

- `feat(nav): add keyboard focus outline`
- `fix(form): handle invalid email state`
- `chore(ci): add lighthouse step`

## Ветвление

- `main` — стабильная ветка.
- Фичи/фиксы: `feature/<slug>`, `fix/<slug>`, `chore/<slug>`.

## Тестовые данные

- Витест покрывает утилиты для расписания (парсинг часов, подсчёты).
- Playwright проверяет загрузку, навигацию и валидацию формы.

## Документация

- `.github/ISSUE_TEMPLATE` — шаблоны задач/фич.
- `.github/PULL_REQUEST_TEMPLATE.md` — чек-лист качества.
- `.lighthouserc.json` — целевые метрики (Perf ≥ 90, A11y ≥ 90, SEO ≥ 95).
