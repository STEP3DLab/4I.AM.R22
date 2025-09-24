const DATE_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'short',
});

const LONG_DATE_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatShortDateRu(date) {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    throw new TypeError('formatShortDateRu expects a valid Date instance');
  }
  return DATE_FORMATTER.format(date).replace('.', '');
}

export function formatLongDateRu(date) {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    throw new TypeError('formatLongDateRu expects a valid Date instance');
  }
  const parts = LONG_DATE_FORMATTER.formatToParts(date);
  const cleaned = parts.filter((part) => part.type !== 'literal' || part.value.trim() !== 'г.');
  return cleaned
    .map((part) => part.value)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseHours(input) {
  if (typeof input !== 'string') {
    return 0;
  }
  const lower = input.toLowerCase();
  const markerIndex = lower.indexOf('ч');
  if (markerIndex === -1) {
    return 0;
  }
  let numeric = '';
  for (let i = markerIndex - 1; i >= 0; i -= 1) {
    const ch = lower[i];
    if ((ch >= '0' && ch <= '9') || ch === ',' || ch === '.') {
      numeric = ch + numeric;
    } else if (numeric) {
      break;
    }
  }
  const value = parseFloat(numeric.replace(',', '.'));
  return Number.isFinite(value) ? Math.round(value * 10) / 10 : 0;
}

export function activityTypeFromTitle(title = '') {
  const normalized = String(title).trim().toLowerCase();
  if (normalized.startsWith('лекция')) return 'lecture';
  if (normalized.startsWith('прак')) return 'practice';
  if (normalized.startsWith('экзамен')) return 'exam';
  if (normalized.startsWith('мастер')) return 'workshop';
  return 'lecture';
}

export function getBlocksSummary(blocks = []) {
  const typeCounts = { lecture: 0, practice: 0, workshop: 0, exam: 0 };
  let hours = 0;
  for (const block of blocks) {
    if (!block) continue;
    const kind = activityTypeFromTitle(block.title ?? '');
    typeCounts[kind] += 1;
    hours += parseHours(block.hours ?? '');
  }
  return {
    hours: Math.round(hours * 10) / 10,
    typeCounts,
  };
}

export function getCountdownStatus(startDate, now = new Date()) {
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  if (Number.isNaN(start.valueOf())) {
    throw new TypeError('Invalid startDate supplied to getCountdownStatus');
  }
  const diff = start.getTime() - now.getTime();
  if (diff <= 0) {
    return { isStarted: true, days: 0, hours: 0, minutes: 0 };
  }
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
  const minutes = totalMinutes - days * 60 * 24 - hours * 60;
  return { isStarted: false, days, hours, minutes };
}

export function formatDaysLabel(input) {
  if (!Number.isFinite(input)) {
    return '';
  }
  const value = Math.trunc(input);
  const abs = Math.abs(value) % 100;
  const last = abs % 10;
  let suffix = 'дней';
  if (abs > 10 && abs < 20) {
    suffix = 'дней';
  } else if (last === 1) {
    suffix = 'день';
  } else if (last >= 2 && last <= 4) {
    suffix = 'дня';
  }
  return `${value} ${suffix}`;
}

export function clampIndex(current, delta, length) {
  if (!Number.isFinite(current) || !Number.isFinite(delta) || length <= 0) {
    return 0;
  }
  const next = (current + delta + length) % length;
  return next;
}

export function calculateProgramHours(modules = []) {
  return modules.reduce((total, module) => {
    const summary = getBlocksSummary(module?.blocks ?? []);
    return total + summary.hours;
  }, 0);
}
