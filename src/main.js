import {
  activityTypeFromTitle,
  calculateProgramHours,
  clampIndex,
  formatLongDateRu,
  formatShortDateRu,
  getBlocksSummary,
  getCountdownStatus,
  buildCourseCalendarIcs,
} from './utils/course-utils.js';
import {
  buildApplicationSummary,
  createFeedbackCard,
} from './utils/application-feedback.js';
import { COURSE_START, COURSE_START_ISO } from './data/course.js';

const courseStartLabel = formatLongDateRu(COURSE_START);

const benefits = [
  'Разработка КД и 3D-моделей по существующим деталям',
  'Оперативный ремонт и изготовление запчастей на АТ',
  'Снижение издержек с помощью собственной оснастки',
];
const audience = [
  'Инженеры-конструкторы и технологи',
  'Операторы ЧПУ',
  'Студенты техвузов, молодые учёные, преподаватели',
  'Промышленные дизайнеры',
];
const teamMembers = [
  {
    id: 'rekut',
    title: 'Куратор',
    name: 'Рекут Алексей Валерьевич',
    summary:
      'Создатель компетенций WorldSkills по реверсивному инжинирингу и аддитивному производству.',
    badges: ['54 года', '9+ лет преподавания', 'Эксперт WorldSkills'],
    cardPoints: [
      'Заместитель руководителя технопарка РГСУ (2022—н.в.)',
      'Разработчик федеральных программ и стандартов по аддитивным технологиям',
    ],
    highlights: [
      'Создал компетенции WorldSkills по реверсивному инжинирингу и аддитивному производству',
      'Менеджер компетенции «Реверсивный инжиниринг» (WorldSkills/АРПН, 2014—н.в.)',
    ],
    education: [
      'ГАУ им. Серго Орджоникидзе, Экономическая кибернетика (1994)',
      'АНХ при правительстве РФ, Управление в маркетинге (ПК, 2004)',
      'СКФУ, Преподаватель высшей школы (ПК, 2017)',
    ],
    experience: [
      'Технопарк РГСУ — заместитель руководителя (2022—н.в.)',
      'Колледж предпринимательства №11 — мастер и методист (2009—2020)',
      'Разработчик программ ДПО по спортивно-боевому роботостроению',
    ],
    competencies: [
      'Аддитивное производство: FDM, DLP, SLA',
      'Реверсивный инжиниринг и контроль качества',
      'Промышленный дизайн и прототипирование на станках с ЧПУ',
    ],
    software: [
      'Rhino 3D, Geomagic Design X, GOM Inspect',
      'Ultimaker Cura, CHITUBOX, Polygon X, Creality Slicer',
      'Artec Studio 15, RV 3D Studio',
      'C++',
    ],
    achievements: [
      'Соавтор первого ФГОС СПО «Аддитивные технологии» (2010—2013)',
      'Создатель стандартов оценки WorldSkills Russia по реверсивному инжинирингу (2014)',
      'Создатель компетенции Additive Manufacturing WorldSkills (2020)',
      'Капитан команды «Дезинтегратор» (ТОП‑16 Битвы роботов, 2023)',
    ],
    resources: [
      {
        label:
          'Учебные материалы: «Учебное пособие по Rhinoceros 3D», «Базовый курс Rhinoceros 3D»',
      },
      { label: 'Интервью: Россия 24 «Лучший по профессии», «Аддитивная кухня», 4 канал' },
    ],
    interests: 'Увлечения: механика, кинетическая скульптура, спортивно-боевые роботы.',
  },
  {
    id: 'ganshin',
    title: 'Преподаватель',
    name: 'Ганьшин Владимир Константинович',
    summary: 'Руководитель технопарка РГСУ и тренер сборной России по реверсивному инжинирингу.',
    badges: ['34 года', '10+ лет преподавания', 'Тренер сборной'],
    cardPoints: [
      'Руководит технопарком РГСУ с 2019 года',
      'Подготовил чемпионов России и мира по компетенции «Реверсивный инжиниринг»',
    ],
    highlights: [
      'Куратор программ «Промышленный дизайн и инжиниринг», «Реверсивный инжиниринг и АТ»',
      'Тренер сборной России (WorldSkills, BRICS) — призовые места 2019–2021',
    ],
    education: [
      'МГТУ «Станкин», бакалавр «Технология машиностроения» (2008—2012)',
      'МГТУ «Станкин», магистр «Конструкторско-технологическое обеспечение» (2012—2014)',
      'Аспирантура 05.02.07 «Технология и оборудование обработки» (2014—2018)',
    ],
    experience: [
      'Руководитель технопарка РГСУ (2019—н.в.)',
      'Преподаватель РГСУ и МГТУ «Станкин» (2014—н.в.)',
      'Политехнический колледж №42 — производственное обучение (2014)',
      'Западный комплекс непрерывного образования — преподаватель спецдисциплин (2015—2018)',
    ],
    competencies: [
      'Инженерный и промышленный дизайн',
      'Реверсивный инжиниринг и внедрение ИИ в производстве',
      'Организация проектной и соревновательной подготовки',
    ],
    software: [
      'Autodesk Inventor, Fusion 360, T-FLEX CAD, КОМПАС-3D',
      'Geomagic Design X, GOM Inspect',
      'RangeVision, Artec Eva, Leica — 3D-сканеры',
      '3D-принтеры: FDM, DLP, SLA; станки с ЧПУ',
    ],
    achievements: [
      'Тренер сборной России: 3 место (WorldSkills Kazan 2019), 1 место (BRICS Shanghai 2020)',
      'Подготовил четырёх чемпионов России (WorldSkills, 2018—2021)',
      'Подготовил призёров движения «Профессионалы» и «Абилимпикс» (2023—2025)',
      'Команда «Дезинтегратор» — ¼ финала Битвы роботов (2023, 2024)',
    ],
    resources: [
      {
        label: 'Видео-лекции по методологии ДПО (курс из 6 занятий)',
        href: 'https://surl.lu/xcfxzz',
      },
      { label: 'Telegram: t.me/step_3d_mngr', href: 'https://t.me/step_3d_mngr' },
      { label: 'E-mail: projects.step3d@gmail.com', href: 'mailto:projects.step3d@gmail.com' },
    ],
    interests: 'Увлекается шахматами, футболом и искусственным интеллектом.',
  },
  {
    id: 'ponkratova',
    title: 'Преподаватель',
    name: 'Понкратова Христина Анатольевна',
    summary:
      'Практик STEP_3D по биопротезированию, реверсивному инжинирингу и аддитивному производству.',
    badges: ['23 года', '5+ лет преподавания', 'Чемпион WorldSkills & BRICS'],
    cardPoints: [
      'Учебный мастер технопарка РГСУ, ведёт практикумы по 3D-сканированию',
      'Наставник Московских мастеров и корпоративных команд по АТ',
    ],
    highlights: [
      'Специализируется на изготовлении индивидуальных имплантов и биопротезов',
      'Подготовила десятки призёров чемпионатов профессионального мастерства',
    ],
    education: [
      'РУДН, бакалавр «Прикладная математика и информатика» (2020—2024)',
      'Университет «Синергия», магистратура «Дизайн и продвижение цифрового продукта» (2024—н.в.)',
    ],
    experience: [
      'Технопарк РГСУ — учебный мастер (2024—н.в.)',
      'Первый МОК — мастер производственного обучения по АТ (2023—2025)',
      'ЗКНО — лаборатория широкополосных систем радиосвязи, кружок 3D-моделирования (2019—2020)',
      'Школы 1287 и «Марьина Роща им. Орлова» — ДО по 3D-моделированию (2021—2024)',
    ],
    competencies: [
      'Реверсивный инжиниринг и биопротезирование',
      'Аддитивное производство и подготовка печати',
      'Инженерный дизайн САПР и наставничество команд',
    ],
    software: [
      'КОМПАС-3D, Autodesk Inventor, Fusion 360',
      'Geomagic Design X, Geomagic Control X, GOM Inspect',
      'Materialise 3-matic, Blender',
      'Ultimaker Cura, Polygon X, Creality Slicer; Artec Studio 15',
    ],
    achievements: [
      'Чемпион WorldSkills Russia 2019 (реверсивный инжиниринг, Казань)',
      'Чемпион BRICS Skills Challenge 2019 (Китай, Фошань)',
      'Призёр WorldSkills Hi-Tech 2018/2019 (Екатеринбург)',
      'Лауреат гранта Правительства Москвы в сфере образования (2024)',
    ],
    resources: [
      {
        label:
          'Опыт подготовки корпоративных и школьных команд по АТ (Ростех, Сибур, Роскосмос, Северсталь)',
      },
    ],
    interests: 'Увлечения: музыка, программирование, спорт.',
  },
];
const teamShowcase = [
  {
    id: 'showcase-ponkratova',
    tag: 'Эксперт',
    title: 'Христина Понкратова',
    caption:
      'Практикум по 3D-сканированию: от калибровки до высокоточной цифровки деталей для биопротезирования.',
    picture: {
      avif: 'images/gallery/scan-station.avif',
      webp: 'images/gallery/scan-station.webp',
      fallback: 'images/gallery/scan-station.svg',
    },
    alt: 'Христина Понкратова демонстрирует 3D-сканирование детали',
  },
  {
    id: 'showcase-project',
    tag: 'Кейс STEP_3D',
    title: 'Индивидуальные импланты',
    caption:
      'Команда STEP_3D разрабатывает CAD-модели имплантов и медицинской оснастки по результатам реверсивного инжиниринга.',
    picture: {
      avif: 'images/gallery/cad-model.avif',
      webp: 'images/gallery/cad-model.webp',
      fallback: 'images/gallery/cad-model.svg',
    },
    alt: 'Цифровая модель импланта в CAD после реверсивного инжиниринга',
  },
  {
    id: 'showcase-rekut',
    tag: 'Эксперт',
    title: 'Алексей Рекут',
    caption:
      'Наставник WorldSkills сопровождает этап аддитивного производства: подбор технологии и контроль печати мастер-моделей.',
    picture: {
      avif: 'images/gallery/printing.avif',
      webp: 'images/gallery/printing.webp',
      fallback: 'images/gallery/printing.svg',
    },
    alt: 'Алексей Рекут контролирует 3D-печать детали',
  },
];
const modules = [
  {
    day: '01 (Пн)',
    blocks: [
      {
        title:
          'Лекция: Реверсивный инжиниринг и аддитивные технологии в производстве. ОТ и ТБ. Кейсы РГСУ (Hi-Tech, Ростех, Северсталь, СИБУР, ЕВРАЗ)',
        hours: '2 ч (1 лк + 0,5 сем + 0,5 кт)',
        control: 'Устный опрос',
      },
      {
        title: 'Мастер-класс №1: CAD/CAM-моделирование мастер-моделей и метаформ (T-FLEX CAD)',
        hours: '—',
        control: 'Зачёт',
      },
      {
        title:
          'Прак-работа #1: Выбор средства оцифровки и оснастки. Калибровка сканера (RangeVision Spectrum)',
        hours: '2 ч',
        control: '—',
      },
      {
        title: 'Прак-работа #2: 3D-сканирование на стационарном сканере',
        hours: '4 ч',
        control: '—',
      },
    ],
  },
  {
    day: '02 (Вт)',
    blocks: [
      {
        title: 'Прак-работа #3: Реверс в Geomagic Design X (базовые функции)',
        hours: '4 ч',
        control: '—',
      },
      {
        title: 'Мастер-класс №2: Основы 3D-печати (FDM, PICASO 3D). От индустриального партнёра',
        hours: '2 ч (0,5 лк + 1 пр + 0,5 кт)',
        control: '—',
      },
      {
        title: 'Прак-работа #4: Подготовка моделей к FDM/DLP/SLA. Запуск печати',
        hours: '2 ч',
        control: '—',
      },
    ],
  },
  {
    day: '03 (Ср)',
    blocks: [
      {
        title: 'Мастер-класс №3: 3D-сканирование ручным оптическим сканером (Artec Eva)',
        hours: '2 ч (0,5 лк + 1 пр + 0,5 кт)',
        control: 'Устный опрос',
      },
      {
        title: 'Прак-работа #5: Geomagic Design X (продвинутые функции)',
        hours: '6 ч (1 лк + 5 пр)',
        control: 'Зачёт',
      },
    ],
  },
  {
    day: '04 (Чт)',
    blocks: [
      {
        title: 'Мастер-класс №4: Основы DLP/SLA-печати. От индустриального партнёра',
        hours: '2 ч (0,5 лк + 1 пр + 0,5 кт)',
        control: 'Устный опрос',
      },
      {
        title: 'Прак-работа #6: Подготовка к FDM/DLP/SLA. Запуск печати',
        hours: '2 ч (0,5 лк + 1 пр + 0,5 кт)',
        control: 'Зачёт',
      },
      {
        title: 'Отработка навыков (сканирование/реверс/печать) — свободный формат',
        hours: '4 ч',
        control: '—',
      },
    ],
  },
  {
    day: '05 (Пт)',
    blocks: [
      {
        title:
          'Экзамен (ДЭ): задание в формате International High-Tech Competition (компетенция «Реверсивный инжиниринг»)',
        hours: '16 ч (2 лк + 12 пр + 2 кт)',
        control: 'Экзамен (ДЭ)',
      },
    ],
  },
  { day: '06 (Сб)', blocks: [] },
];
const totalProgramHours = Math.round(calculateProgramHours(modules));
const lead = {
  price: '68\u202f000 ₽',
  schedule: '1 неделя, пн-сб 09:00—18:00',
  seats: '6–12 человек в группе',
  startLabel: courseStartLabel,
  venue:
    'Москва, ул. Беговая, д. 12 (лаборатория промдизайна); итоговое занятие (суббота) — Москва, ул. Вильгельма Пика, д. 4, к. 8 (технопарк РГСУ)',
};
const applyLocations = [
  {
    id: 'begovaya',
    kind: 'Основная площадка',
    badge: 'Будни',
    address: 'Москва, ул. Беговая, д. 12',
    caption: 'Лаборатория промышленного дизайна',
    mapQuery: 'Москва, ул. Беговая, 12',
  },
  {
    id: 'vika',
    kind: 'Финальное занятие',
    badge: 'Суббота',
    address: 'Москва, ул. Вильгельма Пика, д. 4, к. 8',
    caption: 'Технопарк РГСУ, пространство STEP_3D',
    mapQuery: 'Москва, ул. Вильгельма Пика, 4к8',
  },
];
const faqItems = [
  {
    question: 'Как устроено расписание курса?',
    answer: `<p>Интенсив проходит в формате ${lead.schedule}. За неделю мы проходим ${totalProgramHours} академических часов: совмещаем лекции, практикумы, мастер-классы и консультации.</p>
<p class="mt-2">Пятый день полностью посвящён экзамену и защите проекта в формате International High-Tech Competition.</p>`,
  },
  {
    question: 'Какие навыки нужны для участия?',
    answer: `<p>Программа рассчитана на специалистов, которые развивают компетенции в реверсивном инжиниринге и аддитивном производстве. Особенно полезна она для:</p>
<ul class="mt-2 list-disc space-y-1 pl-5">
  ${audience.map((item) => `<li>${item}</li>`).join('')}
</ul>
<p class="mt-2">Опыт в CAD и 3D-сканировании приветствуется, но наставники помогают выровнять стартовый уровень на первых занятиях.</p>`,
  },
  {
    question: 'Где проходят занятия?',
    answer: `<p>${lead.venue}.</p>
<ul class="mt-2 list-disc space-y-1 pl-5">
  ${applyLocations.map((loc) => `<li>${loc.address} — ${loc.caption}</li>`).join('')}
</ul>`,
  },
  {
    question: 'Что происходит на экзамене?',
    answer: '<p>Итоговый модуль — 16 академических часов практики. Участники выполняют задание компетенции «Реверсивный инжиниринг»: оцифровывают деталь, строят CAD-модель и подготавливают её к аддитивному производству.</p><p class="mt-2">Экзамен завершает программу сертификацией навыков и обратной связью от экспертов.</p>',
  },
];
const helpfulLinks = [
  {
    title: 'Сайт технопарка РГСУ',
    subtitle: 'Официальный портал и проекты',
    href: 'https://technopark-rgsu.ru/',
    icon: 'campus',
  },
  {
    title: 'Портфолио и новости',
    subtitle: 'Telegram-канал STEP_3D Lab',
    href: 'https://t.me/STEP_3D_Lab',
    icon: 'telegram',
  },
  {
    title: 'Связаться с нами в Telegram',
    subtitle: 'Ответим на вопросы и согласуем детали',
    href: 'https://t.me/step_3d_mngr',
    icon: 'chat',
  },
];
const GALLERY_FOLDER = 'images/gallery';
const APP_VERSION = (import.meta.env && import.meta.env.VITE_APP_VERSION) || 'dev';
const GALLERY_MANIFEST = `${GALLERY_FOLDER}/manifest.json?v=${encodeURIComponent(APP_VERSION)}`;
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function renderHeroStart() {
  const heroStartEl = document.getElementById('heroStartDate');
  if (!heroStartEl) {
    console.warn('Элемент #heroStartDate не найден, дата старта в герое не обновлена.');
    return;
  }
  heroStartEl.textContent = courseStartLabel;
  heroStartEl.setAttribute('data-start', COURSE_START_ISO);

  const calendarBtn = document.getElementById('addToCalendarBtn');
  if (calendarBtn) {
    calendarBtn.setAttribute('aria-label', `Добавить в календарь: старт ${courseStartLabel}`);
  }
}

function initCalendarDownload() {
  const button = document.getElementById('addToCalendarBtn');
  const message = document.getElementById('calendarMessage');
  if (!button || !message) {
    if (!button) {
      console.warn('Кнопка добавления в календарь не найдена.');
    }
    return;
  }

  const updateLabel = () => {
    button.setAttribute('aria-label', `Добавить в календарь: старт ${courseStartLabel}`);
  };

  updateLabel();

  const resetMessage = () => {
    message.classList.add('hidden');
    message.textContent = '';
  };

  resetMessage();

  button.addEventListener('click', (event) => {
    event.preventDefault();
    resetMessage();

    try {
      const pageUrl =
        typeof window !== 'undefined' && window.location && window.location.href
          ? window.location.href
          : 'https://step3dlab.github.io/4I.AM.R22/';
      const icsContent = buildCourseCalendarIcs({
        durationHours: totalProgramHours,
        title: 'Реверсивный инжиниринг и АТ — интенсив',
        description:
          'Практический курс STEP_3D × РГСУ: 3D-сканирование → реверс в CAD → 3D-печать оснастки и мастер-моделей.',
        location: lead.venue,
        url: pageUrl,
      });
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'step3d-course.ics';
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);

      message.textContent = `Файл календаря скачан. Старт ${courseStartLabel}.`;
    } catch (error) {
      console.error('Не удалось сформировать файл календаря', error);
      message.textContent = 'Не удалось подготовить файл календаря. Попробуйте ещё раз.';
    }

    message.classList.remove('hidden');
    window.requestAnimationFrame(() => {
      message.focus({ preventScroll: true });
    });
  });
}
function createPill(text, tone = 'neutral') {
  const tones = {
    neutral: 'border-black/10 bg-white text-ink-800 shadow-soft',
    lecture: 'border-sky-200 bg-sky-50 text-sky-900 shadow-soft',
    practice: 'border-emerald-200 bg-emerald-50 text-emerald-900 shadow-soft',
    workshop: 'border-amber-200 bg-amber-50 text-amber-900 shadow-soft',
    exam: 'border-rose-200 bg-rose-50 text-rose-900 shadow-soft',
  };
  const span = document.createElement('span');
  span.className = `inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
    tones[tone] || tones.neutral
  }`;
  span.textContent = text;
  return span;
}
function renderBenefits() {
  const root = $('#benefits');
  if (!root) {
    console.warn('Не удалось отрисовать преимущества: контейнер #benefits не найден.');
    return;
  }
  root.innerHTML = '';
  benefits.forEach((b) => root.appendChild(createPill(b)));
}
function renderIcon(name) {
  switch (name) {
    case 'clock':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v6l4 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    case 'group':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><circle cx="8" cy="10" r="3" stroke="currentColor" fill="none" stroke-width="1.5"/><circle cx="16" cy="10" r="3" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M2 18c1.5-3 4-4 6-4s4.5 1 6 4" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
    case 'workshop':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="3" y="6" width="18" height="12" rx="2" ry="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="14" r="1.5" fill="currentColor"/><circle cx="12" cy="14" r="1.5" fill="currentColor"/><circle cx="16" cy="14" r="1.5" fill="currentColor"/></svg>';
    case 'handshake':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M2 9l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M22 9l-4-4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M2 9l4 12h12l4-12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M7 13l3 3 3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
    case 'trophy':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M7 4h10v2a5 5 0 0 0 5 5h-2a5 5 0 0 1-5-5H9a5 5 0 0 1-5 5H2a5 5 0 0 0 5-5V4z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 20h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 16v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 20h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    case 'medal':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><circle cx="12" cy="14" r="5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9 3l3 5 3-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M8 3h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    case 'scan3d':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M5 9h14" stroke="currentColor" stroke-width="1.5"/><path d="M5 15h14" stroke="currentColor" stroke-width="1.5"/></svg>';
    case 'engineer':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><circle cx="12" cy="7" r="3" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M5 20c1-4 5-5 7-5s6 1 7 5" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M9 7h6" stroke="currentColor" stroke-width="1.5"/></svg>';
    case 'cnc':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="4" y="4" width="16" height="10" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M8 18h8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4" stroke="currentColor" stroke-width="1.5"/></svg>';
    case 'student':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M12 4l8 4-8 4-8-4 8-4z" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M6 12v3c2 2 10 2 12 0v-3" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
    case 'designer':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M4 20l6-2 10-10-4-4L6 14l-2 6z" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
    case 'calendar':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="3" y="5" width="18" height="16" rx="2" ry="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.5"/><path d="M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    case 'view-detailed':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="4" y="6" width="16" height="12" rx="2" ry="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    case 'view-compact':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="5" y="6" width="6" height="12" rx="1.5" stroke="currentColor" fill="none" stroke-width="1.5"/><rect x="13" y="6" width="6" height="12" rx="1.5" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
    case 'map-pin':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M12 3c-3.2 0-5.5 2.5-5.5 5.6 0 3.6 4 8.5 5.1 9.8a0.6 0.6 0 0 0 .8 0c1.1-1.3 5.1-6.2 5.1-9.8C17.5 5.5 15.2 3 12 3z" stroke="currentColor" fill="none" stroke-width="1.5"/><circle cx="12" cy="8.6" r="2.2" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
    case 'external':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M14 4h6v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M20 4l-9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
    case 'chevron-down':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
    case 'chevron-up':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
    case 'chevron-left':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
    case 'chevron-right':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
    case 'close':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    case 'focus':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="7" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
    case 'campus':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M4 20V8l8-4 8 4v12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/><path d="M10 20v-6h4v6" stroke="currentColor" stroke-width="1.5"/><path d="M4 12h16" stroke="currentColor" stroke-width="1.5"/></svg>';
    case 'telegram':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M20.5 5.5L4.5 11.2c-.8.3-.8 1.3 0 1.6l4.3 1.6 1.7 5.4c.2.7 1 .8 1.5.2l2.5-2.9 4.3 3.2c.6.4 1.4.1 1.6-.6l2.5-13c.2-.8-.5-1.4-1.4-1.1zM9.8 16.1l.4 2.4 1-1.2 7.1-7.1-8.5 6z" fill="currentColor"/></svg>';
    case 'chat':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H9l-4 4v-4.5A3 3 0 0 1 4 13V6z" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>';
    case 'lecture':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="3" y="5" width="18" height="12" rx="2" ry="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M7 9h10M7 12h6" stroke="currentColor" stroke-width="1.5"/></svg>';
    case 'practice':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><path d="M4 18h16" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="6" width="12" height="8" rx="1.5" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M9 14v4M15 14v4" stroke="currentColor" stroke-width="1.5"/></svg>';
    case 'exam':
      return '<svg viewBox="0 0 24 24" class="h-full w-full"><rect x="4" y="4" width="12" height="16" rx="2" ry="2" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M20 7l-5 5-3-3" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
    default:
      return '';
  }
}
function renderStats() {
  const stats = [
    {
      id: 'stat-trust',
      icon: 'handshake',
      value: '5 корпораций',
      label: 'нам доверяют',
      detail: 'Ростех, СИБУР, Роскосмос, Северсталь, ЕВРАЗ',
      ariaLabel: 'Нам доверяют 5 крупных корпораций: Ростех, СИБУР, Роскосмос, Северсталь и ЕВРАЗ.',
    },
    {
      id: 'stat-hitech',
      icon: 'trophy',
      value: '17 призёров',
      label: 'чемпионат hi-tech',
      detail: 'Выпускники занимают призовые места на отраслевом чемпионате Hi-Tech.',
      ariaLabel: '17 выпускников стали призёрами чемпионата Hi-Tech.',
    },
    {
      id: 'stat-worldskills',
      icon: 'medal',
      value: '9 чемпионов',
      label: 'worldskills и brics',
      detail: 'Российские и международные победители WorldSkills и BRICS.',
      ariaLabel: '9 выпускников — чемпионы WorldSkills и BRICS России и международных соревнований.',
    },
  ];

  const root = $('#stats');
  if (!root) return;
  root.innerHTML = '';
  stats.forEach((stat) => {
    const card = document.createElement('div');
    card.className = 'stat-card group';
    card.setAttribute('role', 'group');
    if (stat.ariaLabel) {
      card.setAttribute('aria-label', stat.ariaLabel);
    }
    if (stat.chart?.id) {
      card.setAttribute('aria-describedby', stat.chart.id);
    }
    card.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-ink-900">${renderIcon(stat.icon)}</div>
        <div>
          <div class="text-xl font-semibold tracking-tight">${stat.value}</div>
          <div class="text-[11px] uppercase tracking-[.2em] text-ink-500">${stat.label}</div>
        </div>
      </div>
      ${stat.detail ? `<div class="mt-3 text-xs text-ink-700">${stat.detail}</div>` : ''}
      ${stat.chart?.markup ? `<div class="mt-4">${stat.chart.markup}</div>` : ''}
    `;
    root.appendChild(card);
  });
}
function renderInfoSection(title, items) {
  if (!items?.length) return '';
  const list = items
    .map((item) => {
      if (!item) return '';
      if (typeof item === 'string') {
        return `<li class="relative pl-4 text-sm leading-snug text-ink-800"><span class="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-black/20"></span>${item}</li>`;
      }
      const label = item.label || '';
      const href = item.href || '';
      const content = href
        ? `<a href="${href}" target="_blank" rel="noreferrer" class="underline decoration-black/20 underline-offset-2 transition hover:decoration-black">${label}</a>`
        : label;
      return `<li class="relative pl-4 text-sm leading-snug text-ink-800"><span class="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-black/20"></span>${content}</li>`;
    })
    .join('');
  return `
    <div class="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-soft">
      <div class="text-[11px] uppercase tracking-[.15em] text-ink-500">${title}</div>
      <ul class="mt-2 space-y-1">${list}</ul>
    </div>
  `;
}
function getMemberHeadingId(member) {
  if (member && member.id) {
    return `team-member-${member.id}-title`;
  }
  return 'team-member-detail-title';
}
function renderMemberDetail(member) {
  if (!member) return '';
  const badges = (member.badges || [])
    .map(
      (text) =>
        `<span class="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-ink-800">${text}</span>`,
    )
    .join('');
  const highlightChips = (member.highlights || [])
    .map(
      (text) =>
        `<span class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-900">${text}</span>`,
    )
    .join('');
  const headingId = getMemberHeadingId(member);
  return `
    <article class="space-y-6">
      <header class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 id="${headingId}" class="text-2xl font-semibold tracking-tight">${member.name}</h3>
          <div class="mt-1 text-sm text-ink-700">${member.title} · ${member.summary}</div>
        </div>
        ${badges ? `<div class="flex flex-wrap gap-2">${badges}</div>` : ''}
      </header>
      ${highlightChips ? `<div class="flex flex-wrap gap-2">${highlightChips}</div>` : ''}
      <div class="grid gap-4 md:grid-cols-2">
        ${renderInfoSection('Образование', member.education)}
        ${renderInfoSection('Опыт и роли', member.experience)}
        ${renderInfoSection('Компетенции', member.competencies)}
        ${renderInfoSection('Инструменты и ПО', member.software)}
        ${renderInfoSection('Достижения', member.achievements)}
        ${renderInfoSection('Материалы и контакты', member.resources)}
      </div>
      ${member.interests ? `<p class="text-sm text-ink-700">${member.interests}</p>` : ''}
    </article>
  `;
}
function renderTeam() {
  const cardsRoot = document.getElementById('teamCards');
  const detailRoot = document.getElementById('teamDetail');
  if (!cardsRoot || !detailRoot || !teamMembers.length) return;
  cardsRoot.innerHTML = '';
  detailRoot.innerHTML = `
    <div data-team-overlay class="team-modal pointer-events-none fixed inset-0 z-[70] flex items-center justify-center px-4 py-8 opacity-0" aria-hidden="true">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" data-team-dismiss></div>
      <div class="team-modal__panel relative w-full max-w-4xl overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft-md transition duration-300" role="dialog" aria-modal="true" aria-labelledby="" tabindex="-1" data-team-dialog>
        <button type="button" class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-ink-700 transition hover:border-black/20 hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20" aria-label="Закрыть" data-team-dismiss data-team-close>
          <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5"><path d="M7 7l10 10m0-10L7 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div data-team-modal-content class="max-h-[80vh] overflow-y-auto px-6 py-6 sm:max-h-[75vh] sm:px-8 sm:py-8"></div>
        <p class="sr-only" aria-live="polite" data-team-announcer></p>
      </div>
    </div>
  `;
  const overlay = detailRoot.querySelector('[data-team-overlay]');
  const modalContent = detailRoot.querySelector('[data-team-modal-content]');
  const panel = detailRoot.querySelector('[data-team-dialog]');
  const announcer = detailRoot.querySelector('[data-team-announcer]');
  if (panel) {
    panel.setAttribute('aria-hidden', 'true');
  }
  const closeButtons = detailRoot.querySelectorAll('[data-team-dismiss]');
  let lastTrigger = null;
  let focusableElements = [];
  let focusTrapHandler = null;
  function closeModal() {
    overlay?.setAttribute('aria-hidden', 'true');
    panel?.setAttribute('aria-hidden', 'true');
    panel?.removeAttribute('aria-labelledby');
    overlay?.classList.remove('opacity-100', 'pointer-events-auto');
    overlay?.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
    if (panel && focusTrapHandler) {
      panel.removeEventListener('keydown', focusTrapHandler);
    }
    focusTrapHandler = null;
    focusableElements = [];
    if (announcer) {
      announcer.textContent = '';
    }
    if (lastTrigger) {
      lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    }
  }
  function openModal(member, trigger) {
    if (!overlay || !modalContent) return;
    modalContent.innerHTML = renderMemberDetail(member);
    const headingId = getMemberHeadingId(member);
    if (panel) {
      panel.setAttribute('aria-labelledby', headingId);
      panel.setAttribute('aria-hidden', 'false');
    }
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    document.body.classList.add('overflow-hidden');
    if (trigger instanceof HTMLElement) {
      lastTrigger = trigger;
    }
    if (announcer) {
      announcer.textContent = member?.name || '';
    }
    if (panel) {
      focusableElements = Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
      focusTrapHandler = (event) => {
        if (event.key !== 'Tab') return;
        if (!focusableElements.length) {
          event.preventDefault();
          panel.focus({ preventScroll: true });
          return;
        }
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;
        if (event.shiftKey) {
          if (activeElement === firstElement || !panel.contains(activeElement)) {
            event.preventDefault();
            lastElement.focus({ preventScroll: true });
          }
        } else if (activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus({ preventScroll: true });
        }
      };
      panel.addEventListener('keydown', focusTrapHandler);
    }
    const closeBtn = overlay.querySelector('[data-team-close]');
    if (closeBtn) {
      closeBtn.focus({ preventScroll: true });
    } else if (panel) {
      panel.focus({ preventScroll: true });
    }
  }
  closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));
  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });
  const handleKeydown = (event) => {
    if (event.key === 'Escape' && overlay?.getAttribute('aria-hidden') === 'false') {
      event.preventDefault();
      closeModal();
    }
  };
  if (!document.body.dataset.teamModalEscape) {
    document.body.dataset.teamModalEscape = 'bound';
    document.addEventListener('keydown', handleKeydown);
  }
  teamMembers.forEach((member) => {
    const card = document.createElement('article');
    card.className =
      'group flex h-full flex-col justify-between gap-5 rounded-2xl border border-black/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-soft';
    card.innerHTML = `
      <div>
        <div class="text-sm opacity-60">${member.title}</div>
        <div class="mt-1 text-lg font-semibold leading-snug">${member.name}</div>
        <p class="mt-3 text-sm text-ink-800">${member.summary}</p>
        <ul class="mt-4 space-y-1 text-xs text-ink-700">
          ${(member.cardPoints || []).map((point) => `<li class="relative pl-3 leading-snug before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-black/30">${point}</li>`).join('')}
        </ul>
      </div>
      <button type="button" class="mt-5 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-ink-800 transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20" data-team-open>
        <span>Подробнее</span>
        <span aria-hidden class="transition group-hover:translate-x-0.5">→</span>
      </button>
    `;
    card
      .querySelector('[data-team-open]')
      ?.addEventListener('click', (event) => openModal(member, event.currentTarget));
    cardsRoot.appendChild(card);
  });
}
function renderTeamShowcase() {
  const figure = document.getElementById('teamShowcaseFigure');
  const status = document.getElementById('teamShowcaseStatus');
  const prev = document.querySelector('[data-showcase-prev]');
  const next = document.querySelector('[data-showcase-next]');
  if (!figure) return;

  const pictureHost = figure.querySelector('[data-showcase-picture]');
  const titleEl = figure.querySelector('[data-showcase-title]');
  const captionEl = figure.querySelector('[data-showcase-caption]');
  const counterEl = figure.querySelector('[data-showcase-counter]');
  const tagEl = figure.querySelector('[data-showcase-tag]');
  const total = teamShowcase.length;
  let activeIndex = 0;

  figure.setAttribute('aria-describedby', 'teamShowcaseStatus');

  const disableNavigation = total <= 1;

  const updateNavigationState = () => {
    [prev, next].forEach((btn) => {
      if (!btn) return;
      btn.disabled = disableNavigation;
      btn.setAttribute('aria-disabled', String(disableNavigation));
      btn.classList.toggle('pointer-events-none', disableNavigation);
      btn.classList.toggle('opacity-50', disableNavigation);
    });
  };

  const formatLabel = (item) => item?.title || item?.caption || 'без названия';

  const setControlLabels = () => {
    if (disableNavigation) {
      if (prev) prev.setAttribute('aria-label', 'Предыдущее фото недоступно');
      if (next) next.setAttribute('aria-label', 'Следующее фото недоступно');
      return;
    }
    const prevItem = teamShowcase[clampIndex(activeIndex, -1, total)];
    const nextItem = teamShowcase[clampIndex(activeIndex, 1, total)];
    if (prev) prev.setAttribute('aria-label', `Предыдущее фото: ${formatLabel(prevItem)}`);
    if (next) next.setAttribute('aria-label', `Следующее фото: ${formatLabel(nextItem)}`);
  };

  const updateStatus = (item, announce = true) => {
    if (!status || !announce) return;
    const base = `Фото ${activeIndex + 1} из ${total}`;
    const details = [];
    if (item.title) details.push(item.title);
    if (item.caption) details.push(item.caption);
    let message = details.length ? `${base} — ${details.join('. ')}` : base;
    if (!/[.!?]$/.test(message)) {
      message += '.';
    }
    const hint = total > 1 ? ' Используйте стрелки на клавиатуре или кнопки рядом с галереей.' : '';
    status.textContent = `${message}${hint}`;
  };

  const updateFigure = (options = {}) => {
    if (!total) return;
    const item = teamShowcase[activeIndex];
    if (!item) return;
    if (pictureHost) {
      pictureHost.innerHTML = '';
      const sources = item.picture || { fallback: item.src };
      if (sources?.avif) {
        const source = document.createElement('source');
        source.srcset = sources.avif;
        source.type = 'image/avif';
        pictureHost.appendChild(source);
      }
      if (sources?.webp) {
        const source = document.createElement('source');
        source.srcset = sources.webp;
        source.type = 'image/webp';
        pictureHost.appendChild(source);
      }
      const img = document.createElement('img');
      const fallback = sources?.fallback || sources?.webp || sources?.avif || item.src || '';
      img.src = fallback;
      img.alt = item.alt || item.title || 'Фотография из галереи';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.className =
        'h-full w-full object-cover transition duration-300 group-focus-visible:scale-[1.01] group-hover:scale-[1.01]';
      img.setAttribute('data-showcase-img', '');
      pictureHost.appendChild(img);
    }
    if (titleEl) {
      titleEl.textContent = item.title || item.tag || 'Без названия';
    }
    if (captionEl) {
      captionEl.textContent = item.caption || '';
    }
    if (counterEl) {
      counterEl.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }
    if (tagEl) {
      if (item.tag) {
        tagEl.textContent = item.tag;
        tagEl.classList.remove('hidden');
        tagEl.classList.add('inline-flex');
      } else {
        tagEl.textContent = '';
        tagEl.classList.add('hidden');
        tagEl.classList.remove('inline-flex');
      }
    }
    figure.setAttribute('data-active-index', String(activeIndex));
    figure.setAttribute('aria-label', item.title ? `Фото: ${item.title}` : 'Фото из галереи');
    updateStatus(item, options.announce !== false);
    setControlLabels();
  };

  updateNavigationState();

  if (!total) {
    if (status) status.textContent = 'Галерея пока пуста.';
    if (titleEl) titleEl.textContent = '';
    if (captionEl) captionEl.textContent = '';
    if (counterEl) counterEl.textContent = '';
    if (tagEl) {
      tagEl.textContent = '';
      tagEl.classList.add('hidden');
      tagEl.classList.remove('inline-flex');
    }
    if (pictureHost) {
      pictureHost.innerHTML = '';
    }
    setControlLabels();
    return;
  }

  updateFigure();

  const setActive = (nextIndex, options = {}) => {
    const clamped = Math.max(0, Math.min(total - 1, nextIndex));
    if (clamped === activeIndex && !options.force) {
      updateStatus(teamShowcase[activeIndex], options.announce !== false);
      return;
    }
    activeIndex = clamped;
    updateFigure(options);
  };

  const moveBy = (delta, options = {}) => {
    if (total <= 1) return;
    activeIndex = clampIndex(activeIndex, delta, total);
    updateFigure(options);
  };

  if (prev && !disableNavigation) {
    prev.addEventListener('click', () => moveBy(-1));
  }
  if (next && !disableNavigation) {
    next.addEventListener('click', () => moveBy(1));
  }

  const handleKeydown = (event) => {
    if (!total) return;
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveBy(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveBy(1);
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(total - 1);
        break;
      default:
        break;
    }
  };

  figure.addEventListener('keydown', handleKeydown);
}

function renderApplyLocations() {
  const root = document.getElementById('applyLocations');
  const mapContainer = document.getElementById('applyMap');
  if (!root) return;
  root.innerHTML = '';
  const cards = [];
  let activeIndex = 0;
  let frame = null;
  let mapTitle = null;
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div class="relative h-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft">
        <div class="flex items-center justify-between border-b border-black/10 bg-white/70 px-4 py-3 text-xs text-ink-700">
          <div class="flex items-center gap-2 text-sm font-medium text-ink-950">
            <span class="h-4 w-4 text-ink-700">${renderIcon('map-pin')}</span>
            <span data-map-address></span>
          </div>
          <span class="hidden text-xs text-ink-400 sm:inline">Выберите площадку, чтобы обновить карту</span>
        </div>
        <iframe data-map-frame title="Карта площадки курса" class="h-64 w-full border-0" src="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
    `;
    frame = mapContainer.querySelector('[data-map-frame]');
    mapTitle = mapContainer.querySelector('[data-map-address]');
  }
  const getMapUrl = (loc) =>
    `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(loc.mapQuery || loc.address)}&lang=ru_RU&z=16`;
  const getMapLink = (loc) =>
    `https://yandex.ru/maps/?text=${encodeURIComponent(loc.mapQuery || loc.address)}`;
  function setActive(index) {
    activeIndex = index;
    cards.forEach((card, idx) => {
      const isActive = idx === index;
      card.dataset.active = isActive ? 'true' : 'false';
      card.classList.toggle('border-black/30', isActive);
      card.classList.toggle('shadow-soft-md', isActive);
    });
    const loc = applyLocations[index];
    if (!loc) return;
    const mapUrl = getMapUrl(loc);
    if (frame && frame.getAttribute('src') !== mapUrl) {
      frame.setAttribute('src', mapUrl);
    }
    if (mapTitle) {
      mapTitle.textContent = loc.address;
    }
  }
  applyLocations.forEach((loc, index) => {
    const card = document.createElement('article');
    card.className =
      'group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-within:ring-2 focus-within:ring-black/20';
    const mapLink = getMapLink(loc);
    card.innerHTML = `
      <div class="flex items-start gap-3">
        <span aria-hidden class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-ink-800 transition group-hover:bg-black group-hover:text-white">
          ${renderIcon('map-pin')}
        </span>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[.2em] text-ink-400">
            <span>${loc.kind}</span>
            ${loc.badge ? `<span class="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-ink-700">${loc.badge}</span>` : ''}
          </div>
          <a href="${mapLink}" target="_blank" rel="noreferrer" class="mt-2 inline-flex items-center gap-2 text-left text-sm font-semibold text-ink-950 underline-offset-4 transition hover:underline">
            <span>${loc.address}</span>
            <span aria-hidden class="h-4 w-4 text-ink-400 transition group-hover:text-ink-950">${renderIcon('external')}</span>
          </a>
          ${loc.caption ? `<p class="mt-1 text-xs text-ink-700">${loc.caption}</p>` : ''}
          <div class="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-700">
            <button type="button" data-location-activate class="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1 font-medium text-ink-800 transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
              <span class="h-3 w-3 text-current">${renderIcon('focus')}</span>
              <span>Показать на карте</span>
            </button>
            <a href="${mapLink}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1 transition hover:bg-black hover:text-white">
              <span class="h-3 w-3 text-current">${renderIcon('external')}</span>
              <span>Маршрут</span>
            </a>
          </div>
        </div>
      </div>
    `;
    card.addEventListener('mouseenter', () => setActive(index));
    card.addEventListener('focusin', () => setActive(index));
    card.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) return;
      setActive(index);
    });
    const activateBtn = card.querySelector('[data-location-activate]');
    activateBtn?.addEventListener('click', () => setActive(index));
    root.appendChild(card);
    cards.push(card);
  });
  if (applyLocations.length > 0) {
    setActive(activeIndex);
  }
}

function renderFaq() {
  const root = document.getElementById('faqList');
  if (!root) return;
  root.innerHTML = '';
  if (!faqItems.length) {
    root.innerHTML =
      '<p class="rounded-2xl border border-black/10 bg-white/90 p-4 text-sm text-ink-700 shadow-sm">Ответы появятся позже — вы также можете задать вопрос в поле комментария формы.</p>';
    return;
  }
  faqItems.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm';
    article.setAttribute('role', 'listitem');
    const controlId = `faq-control-${index + 1}`;
    const panelId = `faq-panel-${index + 1}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.id = controlId;
    button.className =
      'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-ink-950 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20';
    button.setAttribute('aria-controls', panelId);
    const expanded = index === 0;
    button.setAttribute('aria-expanded', String(expanded));
    button.innerHTML = `
      <span>${item.question}</span>
      <span aria-hidden class="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-black/10 bg-white text-ink-700 transition-transform duration-200 transform" data-faq-icon>${renderIcon('chevron-down')}</span>
    `;
    const panel = document.createElement('div');
    panel.id = panelId;
    panel.className = 'faq-answer overflow-hidden px-4 text-sm text-ink-800 transition-[max-height] duration-200 ease-out';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', controlId);
    panel.setAttribute('aria-hidden', String(!expanded));
    const panelInner = document.createElement('div');
    panelInner.className = 'pb-4 leading-relaxed';
    panelInner.innerHTML = item.answer;
    panel.appendChild(panelInner);
    article.appendChild(button);
    article.appendChild(panel);
    root.appendChild(article);
    const icon = article.querySelector('[data-faq-icon]');
    if (icon && expanded) {
      icon.classList.add('rotate-180');
    }
    requestAnimationFrame(() => {
      panel.style.maxHeight = expanded ? `${panel.scrollHeight}px` : '0px';
    });
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;
      button.setAttribute('aria-expanded', String(nextState));
      panel.setAttribute('aria-hidden', String(!nextState));
      const targetHeight = panel.scrollHeight;
      panel.style.maxHeight = nextState ? `${targetHeight}px` : '0px';
      if (icon) {
        icon.classList.toggle('rotate-180', nextState);
      }
    });
  });
}

function renderHelpfulLinks() {
  const root = document.getElementById('helpfulLinks');
  if (!root) return;
  root.innerHTML = '';
  helpfulLinks.forEach((link) => {
    const card = document.createElement('a');
    card.href = link.href;
    card.target = '_blank';
    card.rel = 'noreferrer';
    card.className =
      'group relative flex flex-col justify-between gap-3 rounded-2xl border border-black/10 bg-white/70 p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20';
    card.innerHTML = `
      <div class="flex items-start gap-3">
        <span aria-hidden class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-ink-800 transition group-hover:bg-black group-hover:text-white">
          ${renderIcon(link.icon)}
        </span>
        <div>
          <div class="font-semibold text-ink-950">${link.title}</div>
          ${link.subtitle ? `<p class="mt-1 text-xs text-ink-700">${link.subtitle}</p>` : ''}
        </div>
      </div>
      <span aria-hidden class="inline-flex h-9 w-9 items-center justify-center self-end rounded-full border border-black/10 text-ink-400 transition group-hover:translate-x-1 group-hover:text-ink-950">
        ${renderIcon('external')}
      </span>
    `;
    root.appendChild(card);
  });
}
async function loadGallery() {
  try {
    const response = await fetch(GALLERY_MANIFEST);
    if (!response.ok) throw new Error(`Не удалось получить manifest: ${response.status}`);
    const manifest = await response.json();
    const items = Array.isArray(manifest?.items) ? manifest.items : [];
    const normalized = items
      .map((item, index) => ({
        id: item?.id ?? index + 1,
        alt: item?.alt ?? '',
        src: `${GALLERY_FOLDER}/${item?.file ?? ''}`.replace(/\/$/, ''),
      }))
      .filter((item) => item.src && !item.src.endsWith('/'));
    const declaredTotal = Number(manifest?.totalFiles);
    if (Number.isFinite(declaredTotal) && declaredTotal !== normalized.length) {
      console.warn(
        'Количество записей в manifest не совпадает с totalFiles. Проверить папку с изображениями.',
      );
    }
    const results = await Promise.all(
      normalized.map(
        (item) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ ok: true, item });
            img.onerror = () => resolve({ ok: false, item });
            img.src = item.src;
          }),
      ),
    );
    const validItems = results.filter((r) => r.ok).map((r) => r.item);
    const failed = results
      .filter((r) => !r.ok)
      .map((r) => r.item?.src)
      .filter(Boolean);
    if (failed.length) {
      console.error('Не удалось загрузить изображения карусели:', failed);
    }
    if (Number.isFinite(declaredTotal) && declaredTotal !== validItems.length) {
      console.warn('Количество загруженных изображений отличается от числа файлов в папке.');
    }
    return validItems;
  } catch (err) {
    console.error('Ошибка чтения галереи:', err);
    return [];
  }
}
function initCarousel(gallery) {
  const root = $('#carousel');
  if (!root) return;
  let idx = 0,
    zoom = 1,
    origin = '50% 50%',
    touchStartX = null;
  if (!gallery?.length) {
    const empty = document.createElement('div');
    empty.className =
      'flex h-full w-full items-center justify-center rounded-2xl bg-white/60 text-center text-sm text-ink-700';
    empty.textContent = 'Галерея пока пуста. Добавьте изображения в папку images/gallery.';
    root.appendChild(empty);
    return;
  }
  const img = document.createElement('img');
  img.draggable = false;
  img.className = 'absolute inset-0 h-full w-full object-cover transition-opacity duration-300';
  img.loading = 'eager';
  img.decoding = 'async';
  root.appendChild(img);
  if (!root.hasAttribute('tabindex')) {
    root.setAttribute('tabindex', '0');
  }
  root.classList.add('focus:outline-none');
  root.classList.add('focus-visible:ring-2', 'focus-visible:ring-black/20');
  const prevBtn = document.createElement('button');
  prevBtn.setAttribute('aria-label', 'Предыдущее фото');
  prevBtn.className =
    'pointer-events-auto absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-ink-950 shadow transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20';
  prevBtn.textContent = '‹';
  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('aria-label', 'Следующее фото');
  nextBtn.className =
    'pointer-events-auto absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-ink-950 shadow transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20';
  nextBtn.textContent = '›';
  root.appendChild(prevBtn);
  root.appendChild(nextBtn);
  const dots = document.createElement('div');
  dots.className = 'absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2';
  root.appendChild(dots);
  function render() {
    const item = gallery[idx];
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = item.src;
      img.alt = item.alt || '';
      img.style.opacity = 1;
      img.style.transform = `scale(${zoom})`;
      img.style.transformOrigin = origin;
    }, 100);
    dots.innerHTML = '';
    gallery.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'pointer-events-auto dot ' + (i === idx ? 'w-6 bg-black' : 'w-3 bg-black/40');
      b.setAttribute('aria-label', `Слайд ${i + 1}`);
      b.onclick = () => {
        idx = i;
        zoom = 1;
        render();
      };
      dots.appendChild(b);
    });
  }
  function go(d) {
    idx = (idx + d + gallery.length) % gallery.length;
    zoom = 1;
    render();
  }
  prevBtn.onclick = () => go(-1);
  nextBtn.onclick = () => go(1);

  const handleKeydown = (event) => {
    const lightboxActive =
      document.getElementById('showcaseLightbox')?.getAttribute('aria-hidden') === 'false';
    if (!lightboxActive && !root.matches(':focus-within')) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  };

  root.addEventListener('keydown', handleKeydown);
  root.addEventListener('dblclick', (e) => {
    const rect = root.getBoundingClientRect();
    const x = (((e.clientX ?? rect.width / 2) - rect.left) / rect.width) * 100;
    const y = (((e.clientY ?? rect.height / 2) - rect.top) / rect.height) * 100;
    origin = `${x}% ${y}%`;
    zoom = zoom > 1 ? 1 : 1.6;
    render();
  });
  root.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  root.addEventListener('touchend', (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    touchStartX = null;
  });
  render();
}
function renderAudience() {
  const root = $('#audienceGrid');
  if (!root) return;
  root.innerHTML = '';
  const icons = ['engineer', 'cnc', 'student', 'designer'];
  audience.forEach((a, i) => {
    const card = document.createElement('article');
    card.className =
      'group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft';
    card.innerHTML = `
      <div class="flex items-start gap-3">
        <span aria-hidden class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-ink-800 transition group-hover:bg-black group-hover:text-white">${renderIcon(icons[i % icons.length])}</span>
        <div>
          <div class="text-[10px] uppercase tracking-[.18em] text-ink-400">Аудитория</div>
          <div class="mt-2 text-base font-medium leading-snug text-ink-950">${a}</div>
        </div>
      </div>
      <span aria-hidden class="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full border border-black/5 opacity-0 transition group-hover:opacity-100"></span>
    `;
    root.appendChild(card);
  });
}
function renderStartCalendar() {
  const days = 6;
  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const arr = new Array(days)
    .fill(0)
    .map((_, i) => new Date(COURSE_START.getTime() + i * 86400000));
  const root = $('#startCalendar');
  if (!root) {
    console.warn('Контейнер стартового календаря не найден, блок пропущен.');
    return;
  }
  const head = `<div class="grid grid-cols-6 bg-white/60 text-xs">${labels.map((l) => `<div class="px-3 py-2 text-center font-medium text-ink-700">${l}</div>`).join('')}</div>`;
  const body = `<div class="grid grid-cols-6 bg-white/30 text-sm">${arr.map((d) => `<div class="px-3 py-3 text-center"><div class="inline-flex min-w-[3rem] items-center justify-center rounded-full border border-black/10 px-3 py-1">${formatShortDateRu(d)}</div></div>`).join('')}</div>`;
  root.innerHTML = head + body;
}
export function getInitialOpenDay(programModules = []) {
  if (!Array.isArray(programModules)) return '';
  const firstWithDay = programModules.find((module) => {
    const day = module?.day;
    return typeof day === 'string' && day.trim().length > 0;
  });
  return firstWithDay?.day ?? '';
}
function renderProgram(options = {}) {
  const programModules = Array.isArray(options.modules) ? options.modules : modules;
  const root = $('#programRoot');
  if (!root) {
    console.warn('Контейнер программы (#programRoot) не найден. Секция расписания не будет инициализирована.');
    return;
  }
  let view = 'full';
  let openDay = getInitialOpenDay(programModules);
  const railTone = (t) =>
    ({
      lecture: 'from-sky-400/40',
      practice: 'from-emerald-400/40',
      workshop: 'from-amber-400/50',
      exam: 'from-rose-400/40',
    })[t] || 'from-black/20';
  const typeChipMeta = {
    lecture: { label: 'Лекции', dot: 'bg-sky-400', badge: 'border-sky-200 bg-sky-50 text-sky-800' },
    practice: {
      label: 'Практика',
      dot: 'bg-emerald-400',
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    },
    workshop: {
      label: 'Мастер-класс',
      dot: 'bg-amber-400',
      badge: 'border-amber-200 bg-amber-50 text-amber-800',
    },
    exam: {
      label: 'Экзамен',
      dot: 'bg-rose-400',
      badge: 'border-rose-200 bg-rose-50 text-rose-800',
    },
  };
  const head = document.createElement('div');
  head.className =
    'flex flex-col gap-4 rounded-t-3xl border-b border-black/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between';
  head.innerHTML = `
    <div class="flex items-center gap-3">
      <span aria-hidden class="grid h-11 w-11 place-items-center rounded-xl bg-black/5 text-ink-800">${renderIcon('calendar')}</span>
      <div>
        <div class="text-[11px] uppercase tracking-[.2em] text-ink-400">Режим просмотра</div>
        <div class="text-sm text-ink-800">Выберите формат расписания под ваше устройство</div>
      </div>
    </div>
    <div class="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white p-1 shadow-sm">
      <button type="button" data-view="full" class="group/view flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
        <span class="h-4 w-4 text-current">${renderIcon('view-detailed')}</span>
        <span>Подробно</span>
      </button>
      <button type="button" data-view="compact" class="group/view flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
        <span class="h-4 w-4 text-current">${renderIcon('view-compact')}</span>
        <span>Кратко</span>
      </button>
    </div>
  `;
  root.appendChild(head);
  const updateViewButtons = (active) => {
    head.querySelectorAll('button[data-view]').forEach((btn) => {
      const isActive = btn.getAttribute('data-view') === active;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('bg-ink-950', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('border-ink-900', isActive);
      btn.classList.toggle('shadow-soft-md', isActive);
      btn.classList.toggle('bg-white', !isActive);
      btn.classList.toggle('text-ink-700', !isActive);
      btn.classList.toggle('border-black/10', !isActive);
    });
  };
  const tabsWrap = document.createElement('div');
  tabsWrap.className = 'relative border-b border-black/10 bg-white md:sticky md:top-16 md:shadow-sm';
  tabsWrap.innerHTML =
    '<div class="overflow-x-auto px-3 py-2"><div class="flex items-stretch gap-3" id="dayTabs"></div></div>';
  root.appendChild(tabsWrap);
  const body = document.createElement('div');
  body.id = 'programDays';
  root.appendChild(body);
  const formatHoursChip = (hours) =>
    `<span class="inline-flex items-center gap-1 rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[11px] font-medium text-ink-800"><span class="h-3 w-3 text-current">${renderIcon(
      'clock',
    )}</span>${hours} ч</span>`;
  const renderTypeChips = (counts, variant = 'full') =>
    Object.entries(typeChipMeta)
      .map(([type, meta]) => {
        const value = counts?.[type] ?? 0;
        if (!value) return '';
        if (variant === 'compact') {
          return `<span class="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-ink-800"><span class="h-2.5 w-2.5 rounded-full ${meta.dot}"></span>${value}</span>`;
        }
        return `<span class="inline-flex items-center gap-1 rounded-full border ${meta.badge} px-2 py-0.5 text-[11px] font-medium"><span class="h-3.5 w-3.5 text-current">${renderIcon(
          type,
        )}</span>${meta.label} · ${value}</span>`;
      })
      .filter(Boolean)
      .join('');
  function renderTabs() {
    const tabs = $('#dayTabs');
    if (!tabs) return;
    tabs.innerHTML = '';
    if (programModules.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.className =
        'flex min-h-[64px] w-full items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white px-4 text-sm text-ink-600';
      placeholder.textContent = 'Расписание формируется. Подробности появятся ближе к старту.';
      tabs.appendChild(placeholder);
      return;
    }
    programModules.forEach((m, i) => {
      const isActive = openDay === m.day;
      const d = new Date(COURSE_START.getTime() + i * 86400000);
      const summary = getBlocksSummary(m.blocks);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'group relative flex min-w-[220px] flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30';
      if (isActive) {
        btn.classList.add('border-black/30', 'shadow-soft-md');
      }
      const hoursChip = summary.hours > 0 ? formatHoursChip(summary.hours) : '';
      const typeChips = renderTypeChips(summary.typeCounts, 'compact');
      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-sm font-semibold text-ink-900">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <div class="text-sm font-semibold text-ink-950">${m.day}</div>
            <div class="text-xs text-ink-700">${formatShortDateRu(d)}</div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-xs text-ink-700">
          ${hoursChip}
          ${typeChips}
        </div>
      `;
      btn.addEventListener('click', () => {
        openDay = m.day;
        renderTabs();
        renderDays();
      });
      tabs.appendChild(btn);
    });
  }
  function renderDays() {
    body.innerHTML = '';
    if (programModules.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.className =
        'rounded-2xl border border-dashed border-black/10 bg-white p-6 text-center text-sm text-ink-700 shadow-sm';
      placeholder.textContent = 'Скоро появится подробное расписание по дням. Следите за обновлениями!';
      body.appendChild(placeholder);
      return;
    }
    programModules.forEach((m, i) => {
      const host = document.createElement('div');
      host.className = 'relative z-10 border-b border-black/10';
      const summary = getBlocksSummary(m.blocks);
      const expanded = openDay === m.day;
      const panelId = `program-day-${String(i + 1).padStart(2, '0')}`;
      const hoursChip = summary.hours > 0 ? formatHoursChip(summary.hours) : '';
      const compactChips = renderTypeChips(summary.typeCounts, 'compact');
      const fullChips = renderTypeChips(summary.typeCounts, 'full');
      const chevron = expanded ? renderIcon('chevron-up') : renderIcon('chevron-down');
      const displayDate = formatShortDateRu(new Date(COURSE_START.getTime() + i * 86400000));
      const buttonClasses =
        'group flex w-full flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 text-left transition hover:bg-black/5 md:flex-row md:items-center md:justify-between' +
        (expanded ? ' border-black/20 shadow-soft-md' : '');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = buttonClasses;
      btn.setAttribute('aria-controls', panelId);
      btn.setAttribute('aria-expanded', String(expanded));
      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white text-sm font-semibold text-ink-900">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <div class="font-medium text-ink-950">${m.day}</div>
            <div class="text-xs text-ink-700">${displayDate}</div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-xs text-ink-700 md:hidden">
          ${hoursChip}
          ${compactChips}
        </div>
        <div class="hidden flex-wrap items-center gap-2 md:flex md:justify-end">
          ${hoursChip}
          ${fullChips}
        </div>
        <span class="inline-flex h-9 w-9 items-center justify-center self-end rounded-full border border-black/10 bg-white text-ink-600 md:self-auto">${chevron}</span>
      `;
      btn.addEventListener('click', () => {
        openDay = openDay === m.day ? '' : m.day;
        renderTabs();
        renderDays();
      });
      host.appendChild(btn);

      const panel = document.createElement('div');
      panel.id = panelId;
      panel.className = 'overflow-hidden transition-[max-height] duration-300 ease-out';
      panel.setAttribute('aria-hidden', String(!expanded));
      panel.toggleAttribute('hidden', !expanded);
      panel.toggleAttribute('inert', !expanded);

      const panelContent = document.createElement('div');
      panelContent.className = `min-h-0 gap-4 p-4 ${view === 'full' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`;
      panelContent.classList.toggle('grid', expanded);
      panelContent.classList.toggle('hidden', !expanded);
      panelContent.innerHTML = `
        ${
          m.blocks.length === 0
            ? '<div class="rounded-xl border border-black/10 p-4 text-sm opacity-60">Зарезервировано под защиту проектов/экскурсию/подведение итогов.</div>'
            : ''
        }
        ${m.blocks
          .map((b) => {
            const t = activityTypeFromTitle(b.title);
            const icon =
              t === 'lecture'
                ? 'lecture'
                : t === 'practice'
                  ? 'practice'
                  : t === 'exam'
                    ? 'exam'
                    : 'workshop';
            return `
            <div class="relative overflow-hidden rounded-xl border border-black/10 p-4 shadow-sm hover:shadow-md hover-shimmer">
              <span aria-hidden class="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b ${railTone(t)} to-transparent"></span>
              <div class="flex items-start gap-3">
                <div class="grid h-8 w-8 place-items-center rounded-lg border border-black/10 bg-white">
                  <span class="h-5 w-5 text-ink-900">${renderIcon(icon)}</span>
                </div>
                <div class="flex-1">
                  <div class="font-medium leading-snug ${view === 'compact' ? 'line-clamp-2' : ''}">${b.title}</div>
                  <div class="mt-2 flex flex-wrap items-center gap-2 text-xs opacity-70">
                    ${b.hours !== '—' ? createPill('⏱ ' + b.hours).outerHTML : ''}
                    ${b.control !== '—' ? createPill('✔ ' + b.control).outerHTML : ''}
                    ${createPill('Тип: ' + { lecture: 'Лекция', practice: 'Практика', workshop: 'Мастер-класс', exam: 'Экзамен' }[t], t).outerHTML}
                  </div>
                </div>
              </div>
            </div>`;
          })
          .join('')}
      `;

      panel.appendChild(panelContent);
      host.appendChild(panel);
      body.appendChild(host);

      window.requestAnimationFrame(() => {
        const isExpanded = openDay === m.day;
        panel.setAttribute('aria-hidden', String(!isExpanded));
        panel.toggleAttribute('hidden', !isExpanded);
        panel.toggleAttribute('inert', !isExpanded);
        panelContent.classList.toggle('hidden', !isExpanded);
        panelContent.classList.toggle('grid', isExpanded);
        panel.style.maxHeight = isExpanded ? `${panelContent.scrollHeight}px` : '0px';
      });
    });
  }
  updateViewButtons(view);
  renderTabs();
  renderDays();
  head.querySelectorAll('button[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextView = btn.getAttribute('data-view') || 'full';
      if (view === nextView) return;
      view = nextView;
      updateViewButtons(view);
      renderDays();
    });
  });
}
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  el.setAttribute('data-start', COURSE_START_ISO);

  let lastContent = '';
  let liveMode = '';
  let timerId = null;

  function setLiveMode(nextMode) {
    if (liveMode === nextMode) return;
    if (nextMode) {
      el.setAttribute('aria-live', nextMode);
    } else {
      el.removeAttribute('aria-live');
    }
    liveMode = nextMode;
  }

  function tick() {
    const status = getCountdownStatus(COURSE_START, new Date());

    if (status.isStarted) {
      setLiveMode('polite');
      const startedMessage = 'курс начался';
      if (lastContent !== startedMessage) {
        el.textContent = startedMessage;
        lastContent = startedMessage;
      }
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
      }
      return;
    }

    const isLastHour = status.days === 0 && status.hours === 0;
    setLiveMode(isLastHour ? 'polite' : 'off');

    const nextText = `${status.days}д ${status.hours}ч ${status.minutes}м`;
    if (nextText !== lastContent) {
      el.textContent = nextText;
      lastContent = nextText;
    }
  }

  tick();
  timerId = setInterval(tick, 60000);
}
const FEEDBACK_HIDE_DELAY = 6000;
function initForm() {
  const form = document.getElementById('applyForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedbackHost = document.getElementById('applyFeedback');
  const storageKey = 'applyForm';
  let feedbackTimer = null;
  if (!(form instanceof HTMLFormElement) || !(submitBtn instanceof HTMLButtonElement)) {
    console.warn('Форма заявки недоступна, инициализация пропущена.');
    return;
  }
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      ['name', 'email', 'comment', 'agree'].forEach((k) => {
        if (k in parsed && form.elements[k]) {
          if (k === 'agree') form.elements[k].checked = !!parsed[k];
          else form.elements[k].value = parsed[k];
        }
      });
    }
  } catch (error) {
    console.warn('Не удалось загрузить сохранённые данные формы', error);
  }
  function hideFeedback() {
    if (!feedbackHost) return;
    const card = feedbackHost.querySelector('.feedback-card');
    if (!card) return;
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
      feedbackTimer = null;
    }
    card.setAttribute('data-state', 'hidden');
    window.setTimeout(() => {
      if (feedbackHost.contains(card)) {
        feedbackHost.innerHTML = '';
      }
    }, 250);
  }
  function showFeedback(summary) {
    if (!feedbackHost) return;
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
      feedbackTimer = null;
    }
    feedbackHost.innerHTML = '';
    const { card, closeBtn } = createFeedbackCard(summary || {});
    feedbackHost.append(card);
    closeBtn?.addEventListener('click', hideFeedback, { once: true });
    window.requestAnimationFrame(() => {
      card?.setAttribute('data-state', 'visible');
    });
    feedbackTimer = window.setTimeout(hideFeedback, FEEDBACK_HIDE_DELAY);
  }
  function showError(name, msg) {
    const err = form.querySelector(`[data-err="${name}"]`);
    if (!err) return;
    if (msg) {
      err.textContent = msg;
      err.classList.remove('hidden');
    } else {
      err.textContent = '';
      err.classList.add('hidden');
    }
    const input = form.elements[name];
    if (input) {
      if (msg) input.classList.add('border-red-400');
      else input.classList.remove('border-red-400');
    }
  }
  function validate(silent = false) {
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const agree = form.elements.agree.checked;
    let ok = true;
    if (name.split(/\s+/).length < 2) {
      ok = false;
      if (!silent) showError('name', 'Укажите имя и фамилию');
    } else if (!silent) showError('name', '');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      ok = false;
      if (!silent) showError('email', 'Проверьте формат e-mail');
    } else if (!silent) showError('email', '');
    if (!agree) {
      ok = false;
      if (!silent) showError('agree', 'Нужно согласие на обработку данных');
    } else if (!silent) showError('agree', '');
    submitBtn.disabled = !ok;
    submitBtn.className =
      'rounded-xl px-4 py-2 text-white outline-none transition focus-visible:ring-2 focus-visible:ring-black/30 ' +
      (ok ? 'bg-black hover:opacity-90' : 'bg-black/30 cursor-not-allowed');
    return ok;
  }
  form.addEventListener('input', () => {
    const state = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      comment: form.elements.comment.value,
      agree: form.elements.agree.checked,
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.warn('Не удалось сохранить данные формы', error);
    }
    validate(true);
  });
  form.addEventListener(
    'blur',
    (e) => {
      if (e.target && e.target.name) validate(false);
    },
    true,
  );
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(false)) return;
    const summary = buildApplicationSummary({
      name: form.elements.name.value,
      email: form.elements.email.value,
      comment: form.elements.comment.value,
    });
    showFeedback(summary);
    form.reset();
    try {
      const clearedState = { name: '', email: '', comment: '', agree: false };
      localStorage.setItem(storageKey, JSON.stringify(clearedState));
    } catch (error) {
      console.warn('Не удалось очистить сохранённые данные формы', error);
    }
    validate(true);
  });
  validate(true);
}
function initObservers() {
  const links = Array.from(document.querySelectorAll('#navLinks a'));
  const ids = ['top', 'about', 'program', 'team', 'apply'];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const cta = document.getElementById('stickyCta');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((a) => {
            const isActive = a.dataset.nav === id;
            a.classList.toggle('text-ink-950', isActive);
            a.classList.toggle('opacity-70', !isActive);
            if (isActive) {
              a.setAttribute('aria-current', 'page');
            } else {
              a.removeAttribute('aria-current');
            }
          });
          if (cta) {
            if (id === 'apply') {
              cta.style.opacity = '0';
              cta.style.pointerEvents = 'none';
            } else {
              cta.style.opacity = '1';
              cta.style.pointerEvents = 'auto';
            }
          }
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] },
  );
  sections.forEach((s) => io.observe(s));
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          reveal.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  Array.from(document.querySelectorAll('.reveal')).forEach((el) => reveal.observe(el));
}
function initScrollBar() {
  const bar = document.getElementById('scrollbar');
  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.transform = `scaleX(${Math.max(0, Math.min(1, scrolled))})`;
  }
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const container = document.getElementById('mobileNav');
  const panel = document.getElementById('mobileNavPanel');
  if (!toggleBtn || !container || !panel) return;
  const overlay = container.querySelector('[data-mobile-nav-overlay]');
  const linksRoot = container.querySelector('[data-mobile-nav-links]');
  const closeBtn = container.querySelector('[data-mobile-nav-close]');
  if (!overlay || !linksRoot) return;
  let closeTimer = null;
  let previousOverflow = '';
  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const mm = window.matchMedia('(min-width: 768px)');
  function syncLinks() {
    linksRoot.innerHTML = '';
    $$('#navLinks a').forEach((link) => {
      const clone = link.cloneNode(true);
      clone.className =
        'block rounded-xl border border-black/10 px-3 py-2 text-base font-medium text-ink-950 transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40';
      clone.addEventListener('click', () => close());
      linksRoot.appendChild(clone);
    });
  }
  function getFocusable() {
    return Array.from(panel.querySelectorAll(focusableSelector)).filter(
      (el) =>
        el !== panel &&
        !el.hasAttribute('disabled') &&
        el.tabIndex !== -1 &&
        (el.offsetParent !== null || el === document.activeElement),
    );
  }
  let restoreFocusTo = toggleBtn;
  function open() {
    if (container.getAttribute('data-open') === 'true') return;
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    restoreFocusTo =
      document.activeElement instanceof HTMLElement ? document.activeElement : toggleBtn;
    syncLinks();
    container.classList.remove('hidden');
    container.setAttribute('data-open', 'true');
    container.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      panel.focus({ preventScroll: true });
    });
  }
  function close() {
    if (container.getAttribute('data-open') !== 'true') return;
    container.setAttribute('data-open', 'false');
    container.setAttribute('aria-hidden', 'true');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100');
    panel.classList.add('translate-x-full');
    panel.classList.remove('translate-x-0');
    document.body.style.overflow = previousOverflow;
    toggleBtn.setAttribute('aria-expanded', 'false');
    closeTimer = window.setTimeout(() => {
      container.classList.add('hidden');
      if (window.getComputedStyle(toggleBtn).display !== 'none') {
        toggleBtn.focus({ preventScroll: true });
      } else if (restoreFocusTo && restoreFocusTo.focus) {
        restoreFocusTo.focus();
      }
    }, 220);
  }
  toggleBtn.addEventListener('click', () => {
    if (container.getAttribute('data-open') === 'true') close();
    else open();
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  container.addEventListener('pointerdown', (event) => {
    if (container.getAttribute('data-open') !== 'true') return;
    if (!panel.contains(event.target)) {
      close();
    }
  });
  container.addEventListener('keydown', (event) => {
    if (container.getAttribute('data-open') !== 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = getFocusable();
    if (focusable.length === 0) {
      event.preventDefault();
      panel.focus({ preventScroll: true });
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey) {
      if (document.activeElement === first || !panel.contains(document.activeElement)) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      }
    } else if (document.activeElement === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  });
  const handleMediaChange = (event) => {
    if (event.matches) close();
  };
  if (typeof mm.addEventListener === 'function') mm.addEventListener('change', handleMediaChange);
  else if (typeof mm.addListener === 'function') mm.addListener(handleMediaChange);
}
function renderLead() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Элемент #${id} не найден, пропускаем обновление данных лида.`);
      return;
    }
    el.textContent = value;
  };
  setText('leadPrice', lead.price);
  const durationEl = document.getElementById('leadDuration');
  if (durationEl) {
    durationEl.textContent = `${totalProgramHours} часов · ${lead.schedule}`;
  } else {
    console.warn('Элемент #leadDuration не найден, длительность курса не обновлена.');
  }
  const startEl = document.getElementById('leadStart');
  if (startEl) {
    startEl.textContent = `Старт: ${lead.startLabel}`;
    startEl.setAttribute('data-start', COURSE_START_ISO);
  } else {
    console.warn('Элемент #leadStart не найден, дата старта лида не обновлена.');
  }
  setText('leadSeats', lead.seats);
  setText('leadPriceInline', lead.price);
  setText('leadPriceMobile', lead.price);
}
export { renderProgram };

if (!globalThis.__STEP3D_SKIP_AUTO_INIT__) {
  renderHeroStart();
  renderBenefits();
  initCalendarDownload();
  renderStats();
  loadGallery()
    .then(initCarousel)
    .catch(() => initCarousel([]));
  renderAudience();
  renderStartCalendar();
  renderProgram();
  renderTeam();
  renderTeamShowcase();
  renderApplyLocations();
  renderFaq();
  renderHelpfulLinks();
  initCountdown();
  initForm();
  initObservers();
  initMobileNav();
  initScrollBar();
  renderLead();
}
