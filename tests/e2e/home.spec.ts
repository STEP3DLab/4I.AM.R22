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

  test('submits application successfully', async ({ page }) => {
    await page.route('**/forms/apply', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });
    await page.goto('/');
    await page.locator('form#applyForm [name="name"]').fill('Тест Пользователь');
    await page.locator('form#applyForm [name="email"]').fill('user@example.com');
    await page.locator('form#applyForm [name="comment"]').fill('Хочу присоединиться к интенсиву');
    await page.locator('form#applyForm [name="agree"]').check();
    const submit = page.locator('form#applyForm button[type="submit"]');
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByRole('status')).toContainText(/заявка отправлена/i);
    await expect(submit).toBeDisabled();
  });

  test('показывает ошибку при сбое сервера', async ({ page }) => {
    await page.route('**/forms/apply', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Внутренняя ошибка' }),
      });
    });
    await page.goto('/');
    await page.locator('form#applyForm [name="name"]').fill('Тест Пользователь');
    await page.locator('form#applyForm [name="email"]').fill('user@example.com');
    await page.locator('form#applyForm [name="comment"]').fill('Проверка ошибки');
    await page.locator('form#applyForm [name="agree"]').check();
    const submit = page.locator('form#applyForm button[type="submit"]');
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByRole('alert')).toContainText(/не удалось отправить заявку/i);
    await expect(submit).toBeEnabled();
  });
});
