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
});
