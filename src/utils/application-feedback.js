export function buildApplicationSummary({ name, email, comment }) {
  const trimmedName = (name || '').trim();
  const firstName = trimmedName ? trimmedName.split(/\s+/)[0] : 'Коллега';
  const emailPart = (email || '').trim();
  const commentPart = (comment || '').trim();
  const details = [];
  if (commentPart) {
    details.push(`Мы учтём ваш запрос: «${commentPart}».`);
  }
  if (emailPart) {
    details.push(`Подтверждение отправим на ${emailPart}.`);
  }
  return {
    title: `${firstName}, заявка отправлена!`,
    body:
      details.join(' ') ||
      'Спасибо за интерес к интенсиву. Менеджер свяжется с вами и расскажет про свободные места.',
  };
}

export function createFeedbackCard(summary) {
  const card = document.createElement('div');
  card.className =
    'feedback-card rounded-2xl border border-black/10 bg-white p-4 shadow-soft-md';
  card.setAttribute('data-state', 'hidden');
  card.setAttribute('role', 'status');

  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-start gap-3';

  const textContainer = document.createElement('div');

  const titleEl = document.createElement('p');
  titleEl.className = 'text-sm font-semibold text-ink-950';
  titleEl.textContent = summary?.title ?? '';

  const bodyEl = document.createElement('p');
  bodyEl.className = 'mt-1 text-sm text-ink-800';
  bodyEl.textContent = summary?.body ?? '';

  textContainer.append(titleEl, bodyEl);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className =
    'ml-auto inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-black/10 text-xs text-ink-700 transition hover:bg-black hover:text-white';
  closeBtn.setAttribute('aria-label', 'Скрыть уведомление');
  closeBtn.setAttribute('data-feedback-close', '');
  closeBtn.textContent = '×';

  wrapper.append(textContainer, closeBtn);
  card.append(wrapper);

  return { card, closeBtn };
}
