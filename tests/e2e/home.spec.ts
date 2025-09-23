import { expect, test } from '@playwright/test';

test.describe('Landing page smoke', () => {
  test('loads hero and key CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /реверсивный инжиниринг/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Подать заявку' }).first()).toBeVisible();
  });

  test('navigates via primary menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Программа' }).click();
    await expect(page).toHaveURL(/#program/);
  });

  test('validates application form', async ({ page }) => {
    await page.goto('/');
    await page.locator('form#applyForm [name="name"]').fill('Тест Пользователь');
    await page.locator('form#applyForm [name="email"]').fill('invalid-email');
    await page.locator('form#applyForm [name="comment"]').fill('Интересуюсь интенсивом');
    await page.locator('form#applyForm [name="agree"]').check();
    await page.locator('form#applyForm [name="email"]').press('Tab');
    await expect(page.getByText(/Проверьте формат e-mail/i)).toBeVisible();
    await expect(page.locator('form#applyForm button[type="submit"]')).toBeDisabled();
  });

  test('hero start date matches countdown origin', async ({ page }) => {
    await page.goto('/');
    const heroText = await page.locator('#heroStartDate').textContent();
    const countdownIso = await page.locator('#countdown').getAttribute('data-start');
    expect(countdownIso).toBeTruthy();

    const formattedFromCountdown = await page.evaluate((iso) => {
      if (!iso) return null;
      const date = new Date(iso);
      if (Number.isNaN(date.valueOf())) return null;
      const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const cleaned = formatter
        .formatToParts(date)
        .filter((part) => part.type !== 'literal' || part.value.trim() !== 'г.');
      return cleaned
        .map((part) => part.value)
        .join('')
        .replace(/\s+/g, ' ')
        .trim();
    }, countdownIso);

    expect(formattedFromCountdown).not.toBeNull();
    expect(heroText?.trim()).toBe(formattedFromCountdown ?? undefined);

    const { COURSE_START_ISO } = await import('../../src/data/course.js');
    expect(countdownIso).toBe(COURSE_START_ISO);
  });
});
