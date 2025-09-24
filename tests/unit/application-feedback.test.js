import { describe, expect, it } from 'vitest';
import {
  buildApplicationSummary,
  createFeedbackCard,
} from '../../src/utils/application-feedback.js';

describe('application feedback', () => {
  it('builds a personalised summary with raw user input', () => {
    const summary = buildApplicationSummary({
      name: '  <script>alert(1)</script>  ',
      email: ' user@example.com ',
      comment: ' <img src=x onerror=alert(1)> ',
    });

    expect(summary.title).toBe('<script>alert(1)</script>, заявка отправлена!');
    expect(summary.body).toContain('Мы учтём ваш запрос: «<img src=x onerror=alert(1)>».');
    expect(summary.body).toContain('Подтверждение отправим на user@example.com.');
  });

  it('renders feedback card with escaped user input', () => {
    const summary = {
      title: '<strong>Заголовок</strong>',
      body: '<script>alert("boom")</script>',
    };

    const { card } = createFeedbackCard(summary);
    const titleEl = card.querySelector('p');
    const bodyEl = card.querySelectorAll('p')[1];

    expect(titleEl.textContent).toBe('<strong>Заголовок</strong>');
    expect(bodyEl.textContent).toBe('<script>alert("boom")</script>');
    expect(card.innerHTML).not.toContain('<script>');
    expect(card.innerHTML).not.toContain('<strong>');
  });
});
