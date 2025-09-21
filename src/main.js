import {
  activityTypeFromTitle,
  calculateProgramHours,
  clampIndex,
  formatShortDateRu,
  getBlocksSummary,
  getCountdownStatus,
} from './utils/course-utils.js';
import { getAssistantRecommendations } from './utils/assistant.js';

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
const lead = {
  price: '68\u202f000 ₽',
  schedule: '1 неделя, пн-сб 09:00—18:00',
  seats: '6–12 человек в группе',
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
const GALLERY_MANIFEST = `${GALLERY_FOLDER}/manifest.json`;
const COURSE_START = new Date('2025-10-20T09:00:00+03:00');
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
function createPill(text, tone = 'neutral') {
  const tones = {
    neutral: 'border-black/10 bg-white/60 text-current',
    lecture: 'border-sky-300/40 bg-sky-50 text-sky-900',
    practice: 'border-emerald-300/40 bg-emerald-50 text-emerald-900',
    workshop: 'border-amber-300/40 bg-amber-50 text-amber-900',
    exam: 'border-rose-300/40 bg-rose-50 text-rose-900',
  };
  const span = document.createElement('span');
  span.className = `inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm backdrop-blur ${tones[tone] || tones.neutral}`;
  span.textContent = text;
  return span;
}
function renderBenefits() {
  const root = $('#benefits');
  ['a', 'b'];
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
function formatSessions(count) {
  const value = Math.abs(count) % 100;
  const lastDigit = value % 10;
  if (value > 10 && value < 20) return 'занятий';
  if (lastDigit === 1) return 'занятие';
  if (lastDigit >= 2 && lastDigit <= 4) return 'занятия';
  return 'занятий';
}

function formatHoursValue(hours) {
  if (!Number.isFinite(hours)) return '0';
  const options = Number.isInteger(hours)
    ? { maximumFractionDigits: 0 }
    : { minimumFractionDigits: 1, maximumFractionDigits: 1 };
  return hours.toLocaleString('ru-RU', options);
}

function createRadialChart({ percent, id, ariaLabel, accentClass, centerText }) {
  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
  const radius = 18;
  const circumference = Math.round(2 * Math.PI * radius * 100) / 100;
  const offset = Math.round((circumference - (circumference * safePercent) / 100) * 100) / 100;
  const text = centerText || `${safePercent}%`;
  return {
    id,
    markup: `
      <div class="mt-4 flex justify-center">
        <span id="${id}" class="sr-only">${ariaLabel}</span>
        <svg viewBox="0 0 48 48" class="h-14 w-14 ${accentClass}" aria-hidden="true">
          <circle cx="24" cy="24" r="${radius}" class="fill-none stroke-black/10" stroke-width="4"></circle>
          <circle
            cx="24"
            cy="24"
            r="${radius}"
            class="fill-none stroke-current"
            stroke-width="4"
            stroke-linecap="round"
            style="stroke-dasharray:${circumference};stroke-dashoffset:${offset};transform:rotate(-90deg);transform-origin:50% 50%;"
          ></circle>
          <text x="24" y="26" text-anchor="middle" class="fill-current text-[10px] font-semibold">${text}</text>
        </svg>
      </div>
    `,
  };
}

function createLinearChart({ percent, id, ariaLabel, accentClass }) {
  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
  return {
    id,
    markup: `
      <div class="mt-4">
        <span id="${id}" class="sr-only">${ariaLabel}</span>
        <div class="h-2 w-full overflow-hidden rounded-full bg-black/10">
          <div class="h-full rounded-full ${accentClass}" style="width: ${safePercent}%;" aria-hidden="true"></div>
        </div>
        <div class="mt-1 text-xs text-black/50">${safePercent}% программы</div>
      </div>
    `,
  };
}

function renderStats() {
  const typeConfig = {
    lecture: {
      label: 'Лекции',
      icon: 'lecture',
      accentClass: 'bg-sky-400',
      caption: 'теория и вводные блоки',
    },
    practice: {
      label: 'Практика',
      icon: 'practice',
      accentClass: 'bg-emerald-400',
      caption: 'отработка навыков',
    },
    workshop: {
      label: 'Мастер-классы',
      icon: 'workshop',
      accentClass: 'bg-amber-400',
      caption: 'экспертные демонстрации',
    },
    exam: {
      label: 'Экзамен',
      icon: 'exam',
      accentClass: 'bg-rose-400',
      caption: 'итоговая аттестация',
    },
  };

  const totalHoursRaw = calculateProgramHours(modules);
  const totalHours = Math.round(totalHoursRaw * 10) / 10;
  const activeDays = modules.filter((module) => (module.blocks?.length ?? 0) > 0).length;
  const averageHoursPerDay = activeDays
    ? Math.round((totalHours / activeDays) * 10) / 10
    : 0;

  const aggregated = modules.reduce(
    (acc, module) => {
      const summary = getBlocksSummary(module?.blocks ?? []);
      acc.totalBlocks += Object.values(summary.typeCounts).reduce(
        (total, current) => total + current,
        0,
      );
      Object.entries(summary.typeCounts).forEach(([type, count]) => {
        acc.typeCounts[type] += count;
      });
      return acc;
    },
    {
      totalBlocks: 0,
      typeCounts: { lecture: 0, practice: 0, workshop: 0, exam: 0 },
    },
  );

  const intensityPercent = activeDays
    ? Math.round(Math.min(1, averageHoursPerDay / 8) * 100)
    : 0;
  const formattedTotalHours = formatHoursValue(totalHours);
  const formattedAverage = formatHoursValue(averageHoursPerDay);
  const radialChart = createRadialChart({
    percent: intensityPercent,
    id: 'stat-program-hours-chart',
    ariaLabel: `Средняя нагрузка ${formattedAverage} часа в день — ${intensityPercent}% от ориентировочных 8 часов обучения`,
    accentClass: 'text-emerald-500',
    centerText: `${formattedAverage}ч/д`,
  });

  const stats = [
    {
      id: 'program-hours',
      icon: 'clock',
      value: `${formattedTotalHours} ч`,
      label: 'суммарная нагрузка',
      detail: activeDays ? `≈ ${formattedAverage} ч в день, ${activeDays} учебн. дней` : '',
      chart: radialChart,
      ariaLabel: `Всего ${formattedTotalHours} часов обучения. ${activeDays} учебных дней с средней нагрузкой ${formattedAverage} часа.`,
    },
  ];

  Object.entries(aggregated.typeCounts).forEach(([type, count]) => {
    const config = typeConfig[type];
    if (!config) return;
    const percent = aggregated.totalBlocks
      ? Math.round((count / aggregated.totalBlocks) * 100)
      : 0;
    const chart = createLinearChart({
      percent,
      id: `stat-${type}-chart`,
      ariaLabel: `${config.label}: ${percent}% программы (${count} ${formatSessions(count)})`,
      accentClass: config.accentClass,
    });
    stats.push({
      id: `stat-${type}`,
      icon: config.icon,
      value: `${count} ${formatSessions(count)}`,
      label: config.label,
      detail: config.caption,
      chart,
      ariaLabel: `${config.label}. ${count} ${formatSessions(count)} — ${percent}% программы.`,
    });
  });

  const root = $('#stats');
  if (!root) return;
  root.innerHTML = '';
  stats.forEach((stat) => {
    const card = document.createElement('div');
    card.className =
      'group relative overflow-hidden rounded-2xl border border-black/10 p-4 text-center hover:shadow-md';
    card.setAttribute('role', 'group');
    if (stat.ariaLabel) {
      card.setAttribute('aria-label', stat.ariaLabel);
    }
    if (stat.chart?.id) {
      card.setAttribute('aria-describedby', stat.chart.id);
    }
    card.innerHTML = `
      <div class="mx-auto h-7 w-7 text-black/80">${renderIcon(stat.icon)}</div>
      <div class="mt-2 text-2xl font-semibold tracking-tight">${stat.value}</div>
      <div class="text-[10px] uppercase tracking-[.15em] text-black/50">${stat.label}</div>
      ${stat.detail ? `<div class="mt-1 text-xs text-black/60">${stat.detail}</div>` : ''}
      ${stat.chart?.markup ?? ''}
      <span aria-hidden="true" class="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full border border-black/10"></span>
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
        return `<li class="relative pl-4 text-sm leading-snug text-black/70"><span class="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-black/20"></span>${item}</li>`;
      }
      const label = item.label || '';
      const href = item.href || '';
      const content = href
        ? `<a href="${href}" target="_blank" rel="noreferrer" class="underline decoration-black/20 underline-offset-2 transition hover:decoration-black">${label}</a>`
        : label;
      return `<li class="relative pl-4 text-sm leading-snug text-black/70"><span class="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-black/20"></span>${content}</li>`;
    })
    .join('');
  return `
    <div class="rounded-2xl border border-black/10 bg-white/60 p-4">
      <div class="text-[11px] uppercase tracking-[.15em] text-black/50">${title}</div>
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
        `<span class="inline-flex items-center rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/70">${text}</span>`,
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
          <div class="mt-1 text-sm text-black/60">${member.title} · ${member.summary}</div>
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
      ${member.interests ? `<p class="text-sm text-black/60">${member.interests}</p>` : ''}
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
        <button type="button" class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/60 transition hover:border-black/20 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20" aria-label="Закрыть" data-team-dismiss data-team-close>
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
        <p class="mt-3 text-sm text-black/70">${member.summary}</p>
        <ul class="mt-4 space-y-1 text-xs text-black/60">
          ${(member.cardPoints || []).map((point) => `<li class="relative pl-3 leading-snug before:absolute before:left-0 before:top-1.5 before:h-1 before:w-1 before:rounded-full before:bg-black/30">${point}</li>`).join('')}
        </ul>
      </div>
      <button type="button" class="mt-5 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20" data-team-open>
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
  const rail = document.getElementById('teamShowcaseRail');
  const status = document.getElementById('teamShowcaseStatus');
  if (!rail) return;
  rail.innerHTML = '';
  const total = teamShowcase.length;
  if (!total) {
    if (status) status.textContent = 'Галерея пока пуста.';
    return;
  }
  const cards = [];
  let activeIndex = 0;
  let lightboxIndex = 0;
  let scrollRaf = 0;
  let restoreFocusTo = null;
  let focusTrapHandler = null;
  let focusableElements = [];
  let overlayKeydownAttached = false;
  let previousBodyOverflow = '';
  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const overlayTitleId = 'showcaseLightboxTitle';
  const overlayCaptionId = 'showcaseLightboxCaption';

  const createOverlay = () => {
    const el = document.createElement('div');
    el.id = 'showcaseLightbox';
    el.className =
      'pointer-events-none fixed inset-0 z-[70] hidden items-center justify-center bg-neutral-950/80 px-4 py-8 opacity-0 transition-opacity duration-200';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `
      <div class="relative flex w-full max-w-5xl flex-col gap-5 rounded-3xl border border-white/10 bg-neutral-900/85 p-5 text-white shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur" role="dialog" aria-modal="true" aria-labelledby="${overlayTitleId}" aria-describedby="${overlayCaptionId}" tabindex="-1" data-showcase-panel>
        <button type="button" data-showcase-close class="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="Закрыть галерею">
          ${renderIcon('close')}
        </button>
        <div class="relative overflow-hidden rounded-2xl bg-black/40">
          <img data-showcase-image alt="" class="max-h-[70vh] w-full object-contain" loading="lazy" decoding="async" />
          <button type="button" data-showcase-nav="prev" class="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="Предыдущее фото">
            ${renderIcon('chevron-left')}
          </button>
          <button type="button" data-showcase-nav="next" class="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="Следующее фото">
            ${renderIcon('chevron-right')}
          </button>
          <div class="pointer-events-none absolute left-0 right-0 top-0 flex justify-between px-5 py-3 text-xs uppercase tracking-[.3em] text-white/50">
            <span data-showcase-counter></span>
          </div>
        </div>
        <div class="space-y-2 text-left">
          <div id="${overlayTitleId}" data-showcase-title class="text-lg font-semibold leading-tight"></div>
          <p id="${overlayCaptionId}" data-showcase-caption class="text-sm text-white/80"></p>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    return el;
  };

  let overlay = document.getElementById('showcaseLightbox');
  if (!overlay) {
    overlay = createOverlay();
  }
  const overlayPanel = overlay.querySelector('[data-showcase-panel]');
  const overlayImage = overlay.querySelector('[data-showcase-image]');
  const overlayTitle = overlay.querySelector('[data-showcase-title]');
  const overlayCaption = overlay.querySelector('[data-showcase-caption]');
  const overlayCounter = overlay.querySelector('[data-showcase-counter]');
  const prevControl = overlay.querySelector('[data-showcase-nav="prev"]');
  const nextControl = overlay.querySelector('[data-showcase-nav="next"]');
  const closeControl = overlay.querySelector('[data-showcase-close]');

  if (overlayTitle) {
    overlayTitle.id = overlayTitleId;
  }
  if (overlayCaption) {
    overlayCaption.id = overlayCaptionId;
  }
  if (overlayPanel) {
    overlayPanel.setAttribute('role', 'dialog');
    overlayPanel.setAttribute('aria-modal', 'true');
    overlayPanel.setAttribute('aria-labelledby', overlayTitleId);
    overlayPanel.setAttribute('aria-describedby', overlayCaptionId);
    if (!overlayPanel.hasAttribute('tabindex')) {
      overlayPanel.setAttribute('tabindex', '-1');
    }
  }
  overlay.setAttribute('aria-labelledby', overlayTitleId);
  overlay.setAttribute('aria-describedby', overlayCaptionId);

  function bindFocusTrap() {
    if (!overlayPanel) return;
    focusableElements = Array.from(overlayPanel.querySelectorAll(focusableSelector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
    );
    if (focusTrapHandler) {
      overlayPanel.removeEventListener('keydown', focusTrapHandler);
    }
    focusTrapHandler = (event) => {
      if (event.key !== 'Tab') return;
      if (!focusableElements.length) {
        event.preventDefault();
        overlayPanel.focus({ preventScroll: true });
        return;
      }
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;
      if (event.shiftKey) {
        if (activeElement === firstElement || !overlayPanel.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus({ preventScroll: true });
        }
      } else if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus({ preventScroll: true });
      }
    };
    overlayPanel.addEventListener('keydown', focusTrapHandler);
  }

  function unbindFocusTrap() {
    if (overlayPanel && focusTrapHandler) {
      overlayPanel.removeEventListener('keydown', focusTrapHandler);
    }
    focusTrapHandler = null;
    focusableElements = [];
  }

  function attachOverlayKeydown() {
    if (!overlay || overlayKeydownAttached) return;
    overlay.addEventListener('keydown', handleOverlayKeydown);
    overlayKeydownAttached = true;
  }

  function detachOverlayKeydown() {
    if (!overlay || !overlayKeydownAttached) return;
    overlay.removeEventListener('keydown', handleOverlayKeydown);
    overlayKeydownAttached = false;
  }

  function updateStatus() {
    if (!status || !cards.length) return;
    const currentCard = cards[activeIndex];
    const title = currentCard?.querySelector('[data-showcase-title]');
    const titleText = title?.textContent?.trim();
    status.textContent = `Элемент ${activeIndex + 1} из ${total}${titleText ? `: ${titleText}` : ''}. Нажмите на фото, чтобы открыть полноэкранный просмотр.`;
  }

  function setActiveCard(nextIndex, options = {}) {
    if (!cards.length) return;
    const { scroll = true, focus = false, announce = true, force = false } = options;
    const clamped = Math.max(0, Math.min(cards.length - 1, nextIndex));
    if (!force && clamped === activeIndex) {
      if (announce) updateStatus();
      return;
    }
    cards.forEach((card, idx) => {
      const isActive = idx === clamped;
      card.setAttribute('aria-current', isActive ? 'true' : 'false');
      card.dataset.active = isActive ? 'true' : 'false';
    });
    activeIndex = clamped;
    if (scroll) {
      cards[clamped].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
    if (focus) {
      cards[clamped].focus();
    }
    if (announce) {
      updateStatus();
    }
  }

  function moveBy(delta, options = {}) {
    if (!cards.length) return;
    const target = clampIndex(activeIndex, delta, cards.length);
    setActiveCard(target, options);
  }

  function updateLightbox() {
    const item = teamShowcase[lightboxIndex];
    if (!item) return;
    const picture = item.picture || { fallback: item.src };
    const fallback = picture.fallback || picture.webp || picture.avif || item.src || '';
    if (overlayImage) {
      overlayImage.src = fallback;
      overlayImage.alt = item.alt || item.title || 'Фотография из галереи';
    }
    if (overlayTitle) {
      overlayTitle.textContent = item.title || '';
    }
    if (overlayCaption) {
      overlayCaption.textContent = item.caption || '';
    }
    if (overlayCounter) {
      overlayCounter.textContent = `${String(lightboxIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }
  }

  function openLightbox(index, trigger) {
    if (!overlay) return;
    lightboxIndex = Math.max(0, Math.min(total - 1, index));
    restoreFocusTo =
      trigger instanceof HTMLElement
        ? trigger
        : document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    updateLightbox();
    if (overlay.getAttribute('aria-hidden') !== 'false') {
      previousBodyOverflow = document.body.style.overflow;
    }
    document.body.style.overflow = 'hidden';
    attachOverlayKeydown();
    bindFocusTrap();
    overlay.classList.remove('hidden');
    overlay.classList.remove('pointer-events-none');
    overlay.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      overlay.classList.add('opacity-100', 'pointer-events-auto');
      if (closeControl) {
        closeControl.focus({ preventScroll: true });
      } else if (overlayPanel) {
        overlayPanel.focus({ preventScroll: true });
      }
    });
    setActiveCard(lightboxIndex, { scroll: true, announce: false, force: true });
  }

  function closeLightbox() {
    if (!overlay || overlay.getAttribute('aria-hidden') === 'true') return;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('pointer-events-none');
    detachOverlayKeydown();
    unbindFocusTrap();
    document.body.style.overflow = previousBodyOverflow;
    previousBodyOverflow = '';
    const handleTransitionEnd = (event) => {
      if (event.target !== overlay) return;
      overlay.classList.add('hidden');
      overlay.removeEventListener('transitionend', handleTransitionEnd);
    };
    overlay.addEventListener('transitionend', handleTransitionEnd);
    if (restoreFocusTo && typeof restoreFocusTo.focus === 'function') {
      restoreFocusTo.focus({ preventScroll: true });
    }
  }

  function step(delta) {
    lightboxIndex = (lightboxIndex + delta + total) % total;
    updateLightbox();
    setActiveCard(lightboxIndex, { scroll: true, announce: false, force: true });
  }

  function handleKeydownNavigation(event) {
    const targetCard = event.currentTarget.closest('.showcase-card');
    if (!targetCard) return;
    const current = cards.indexOf(targetCard);
    if (current === -1) return;
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        moveBy(1, { focus: true });
        return;
      case 'ArrowLeft':
        event.preventDefault();
        moveBy(-1, { focus: true });
        return;
      case 'Home':
        event.preventDefault();
        setActiveCard(0, { focus: true });
        return;
      case 'End':
        event.preventDefault();
        setActiveCard(cards.length - 1, { focus: true });
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        openLightbox(current, event.currentTarget);
        return;
      default:
        break;
    }
  }

  function handleOverlayKeydown(event) {
    if (!overlay || overlay.getAttribute('aria-hidden') === 'true') return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  }

  if (!overlay.dataset.bound) {
    prevControl?.addEventListener('click', () => step(-1));
    nextControl?.addEventListener('click', () => step(1));
    closeControl?.addEventListener('click', () => closeLightbox());
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeLightbox();
    });
    overlayImage?.addEventListener('click', () => step(1));
    overlay.dataset.bound = 'true';
  }

  teamShowcase.forEach((item, index) => {
    const card = document.createElement('article');
    const titleId = `${item.id || `showcase-${index + 1}`}-title`;
    const captionId = `${item.id || `showcase-${index + 1}`}-caption`;
    card.className =
      'showcase-card group flex min-w-[260px] max-w-xs flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-soft backdrop-blur outline-none transition hover:-translate-y-0.5 hover:shadow-soft-md focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-labelledby', titleId);
    card.setAttribute('aria-describedby', captionId);
    card.setAttribute('aria-setsize', total);
    card.setAttribute('aria-posinset', index + 1);
    card.dataset.index = String(index);
    const picture = item.picture || { fallback: item.src };
    card.innerHTML = `
      <button type="button" data-showcase-open class="group/image relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
        <picture>
          ${picture.avif ? `<source srcset="${picture.avif}" type="image/avif" />` : ''}
          ${picture.webp ? `<source srcset="${picture.webp}" type="image/webp" />` : ''}
          <img src="${picture.fallback || picture.webp || picture.avif || ''}" alt="${item.alt || ''}" class="h-full w-full object-cover transition duration-300 group-hover/image:scale-[1.02]" loading="lazy" decoding="async" />
        </picture>
        ${item.tag ? `<span class="absolute left-3 top-3 inline-flex rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white/90">${item.tag}</span>` : ''}
        <span aria-hidden class="pointer-events-none absolute inset-0 border border-black/10 opacity-0 transition duration-300 group-hover/image:opacity-100"></span>
      </button>
      <div class="flex flex-1 flex-col p-4">
        <div id="${titleId}" data-showcase-title class="text-sm font-semibold text-black">${item.title}</div>
        <p id="${captionId}" class="mt-2 text-sm text-black/60">${item.caption}</p>
        <div class="mt-4 flex items-center justify-between text-xs text-black/45">
          <span>Нажмите на фото</span>
          <span class="inline-flex items-center gap-1 text-black/60">
            <span class="h-3 w-3 text-current">${renderIcon('chevron-right')}</span>
            <span class="translate-y-[1px]">Листайте</span>
          </span>
        </div>
      </div>
    `;
    card.addEventListener('focus', () => setActiveCard(index, { announce: false, force: true }));
    card.addEventListener('click', () => setActiveCard(index, { announce: false, force: true }));
    card.addEventListener('keydown', handleKeydownNavigation);
    const openButton = card.querySelector('[data-showcase-open]');
    openButton?.addEventListener('focus', () =>
      setActiveCard(index, { announce: false, force: true }),
    );
    openButton?.addEventListener('click', (event) => {
      event.stopPropagation();
      setActiveCard(index, { announce: false, force: true });
      openLightbox(index, event.currentTarget);
    });
    rail.appendChild(card);
    cards.push(card);
  });

  setActiveCard(activeIndex, { scroll: false, announce: true, force: true });

  const prev = document.querySelector('[data-showcase-prev]');
  const next = document.querySelector('[data-showcase-next]');
  prev?.addEventListener('click', () => moveBy(-1, { focus: true }));
  next?.addEventListener('click', () => moveBy(1, { focus: true }));

  rail.addEventListener(
    'scroll',
    () => {
      if (!cards.length) return;
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        const center = rail.scrollLeft + rail.clientWidth / 2;
        let closestIndex = activeIndex;
        let minDistance = Infinity;
        cards.forEach((card, idx) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(cardCenter - center);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });
        setActiveCard(closestIndex, { scroll: false, announce: false, force: true });
      });
    },
    { passive: true },
  );
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
        <div class="flex items-center justify-between border-b border-black/10 bg-white/70 px-4 py-3 text-xs text-black/60">
          <div class="flex items-center gap-2 text-sm font-medium text-black">
            <span class="h-4 w-4 text-black/60">${renderIcon('map-pin')}</span>
            <span data-map-address></span>
          </div>
          <span class="hidden text-xs text-black/40 sm:inline">Выберите площадку, чтобы обновить карту</span>
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
        <span aria-hidden class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-black/70 transition group-hover:bg-black group-hover:text-white">
          ${renderIcon('map-pin')}
        </span>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[.2em] text-black/40">
            <span>${loc.kind}</span>
            ${loc.badge ? `<span class="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-black/60">${loc.badge}</span>` : ''}
          </div>
          <a href="${mapLink}" target="_blank" rel="noreferrer" class="mt-2 inline-flex items-center gap-2 text-left text-sm font-semibold text-black underline-offset-4 transition hover:underline">
            <span>${loc.address}</span>
            <span aria-hidden class="h-4 w-4 text-black/40 transition group-hover:text-black">${renderIcon('external')}</span>
          </a>
          ${loc.caption ? `<p class="mt-1 text-xs text-black/60">${loc.caption}</p>` : ''}
          <div class="mt-3 flex flex-wrap items-center gap-2 text-xs text-black/60">
            <button type="button" data-location-activate class="inline-flex items-center gap-1 rounded-full border border-black/10 px-3 py-1 font-medium text-black/70 transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30">
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
        <span aria-hidden class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-black/70 transition group-hover:bg-black group-hover:text-white">
          ${renderIcon(link.icon)}
        </span>
        <div>
          <div class="font-semibold text-black">${link.title}</div>
          ${link.subtitle ? `<p class="mt-1 text-xs text-black/60">${link.subtitle}</p>` : ''}
        </div>
      </div>
      <span aria-hidden class="inline-flex h-9 w-9 items-center justify-center self-end rounded-full border border-black/10 text-black/40 transition group-hover:translate-x-1 group-hover:text-black">
        ${renderIcon('external')}
      </span>
    `;
    root.appendChild(card);
  });
}
async function loadGallery() {
  try {
    const response = await fetch(GALLERY_MANIFEST, { cache: 'no-store' });
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
      'flex h-full w-full items-center justify-center rounded-2xl bg-white/60 text-center text-sm text-black/60';
    empty.textContent = 'Галерея пока пуста. Добавьте изображения в папку images/gallery.';
    root.appendChild(empty);
    return;
  }
  const img = document.createElement('img');
  img.draggable = false;
  img.className = 'absolute inset-0 h-full w-full object-cover transition-opacity duration-300';
  root.appendChild(img);
  const prevBtn = document.createElement('button');
  prevBtn.setAttribute('aria-label', 'Предыдущее фото');
  prevBtn.className =
    'pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/70 text-black shadow transition hover:bg-white absolute left-2 top-1/2 -translate-y-1/2';
  prevBtn.textContent = '‹';
  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('aria-label', 'Следующее фото');
  nextBtn.className =
    'pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/70 text-black shadow transition hover:bg-white absolute right-2 top-1/2 -translate-y-1/2';
  nextBtn.textContent = '›';
  root.appendChild(prevBtn);
  root.appendChild(nextBtn);
  const dots = document.createElement('div');
  dots.className =
    'pointer-events-none absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2';
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
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
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
        <span aria-hidden class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-black/70 transition group-hover:bg-black group-hover:text-white">${renderIcon(icons[i % icons.length])}</span>
        <div>
          <div class="text-[10px] uppercase tracking-[.18em] text-black/40">Аудитория</div>
          <div class="mt-2 text-base font-medium leading-snug text-black">${a}</div>
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
  const head = `<div class="grid grid-cols-6 bg-white/60 text-xs">${labels.map((l) => `<div class="px-3 py-2 text-center font-medium text-black/60">${l}</div>`).join('')}</div>`;
  const body = `<div class="grid grid-cols-6 bg-white/30 text-sm">${arr.map((d) => `<div class="px-3 py-3 text-center"><div class="inline-flex min-w-[3rem] items-center justify-center rounded-full border border-black/10 px-3 py-1">${formatShortDateRu(d)}</div></div>`).join('')}</div>`;
  root.innerHTML = head + body;
}
function renderProgram() {
  const root = $('#programRoot');
  let view = 'full';
  let openDay = '01 (Пн)';
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
    'flex flex-col gap-4 border-b border-black/10 bg-white/60 p-4 md:flex-row md:items-center md:justify-between';
  head.innerHTML = `
    <div class="flex items-center gap-3">
      <span aria-hidden class="grid h-11 w-11 place-items-center rounded-xl bg-black/5 text-black/70">${renderIcon('calendar')}</span>
      <div>
        <div class="text-[11px] uppercase tracking-[.2em] text-black/40">Режим просмотра</div>
        <div class="text-sm text-black/70">Выберите формат расписания под ваше устройство</div>
      </div>
    </div>
    <div class="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 shadow-sm">
      <button type="button" data-view="full" class="group/view flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-black/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
        <span class="h-4 w-4 text-current">${renderIcon('view-detailed')}</span>
        <span>Подробно</span>
      </button>
      <button type="button" data-view="compact" class="group/view flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-black/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
        <span class="h-4 w-4 text-current">${renderIcon('view-compact')}</span>
        <span>Кратко</span>
      </button>
    </div>
  `;
  root.appendChild(head);
  const updateViewButtons = (active) => {
    head.querySelectorAll('button[data-view]').forEach((btn) => {
      const isActive = btn.getAttribute('data-view') === active;
      btn.classList.toggle('bg-black', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('shadow-soft-md', isActive);
    });
  };
  const tabsWrap = document.createElement('div');
  tabsWrap.className = 'sticky top-16 z-20 border-b border-black/10 bg-white/80 backdrop-blur';
  tabsWrap.innerHTML =
    '<div class="overflow-x-auto px-3 py-2"><div class="flex items-stretch gap-3" id="dayTabs"></div></div>';
  root.appendChild(tabsWrap);
  const body = document.createElement('div');
  body.id = 'programDays';
  root.appendChild(body);
  const formatHoursChip = (hours) =>
    `<span class="inline-flex items-center gap-1 rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[11px] font-medium text-black/70"><span class="h-3 w-3 text-current">${renderIcon(
      'clock',
    )}</span>${hours} ч</span>`;
  const renderTypeChips = (counts, variant = 'full') =>
    Object.entries(typeChipMeta)
      .map(([type, meta]) => {
        const value = counts?.[type] ?? 0;
        if (!value) return '';
        if (variant === 'compact') {
          return `<span class="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-medium text-black/70"><span class="h-2.5 w-2.5 rounded-full ${meta.dot}"></span>${value}</span>`;
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
    modules.forEach((m, i) => {
      const isActive = openDay === m.day;
      const d = new Date(COURSE_START.getTime() + i * 86400000);
      const summary = getBlocksSummary(m.blocks);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'group relative flex min-w-[220px] flex-col gap-3 rounded-2xl border border-black/10 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30';
      if (isActive) {
        btn.classList.add('border-black/30', 'shadow-soft-md');
      }
      const hoursChip = summary.hours > 0 ? formatHoursChip(summary.hours) : '';
      const typeChips = renderTypeChips(summary.typeCounts, 'compact');
      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-black/5 text-sm font-semibold text-black/80">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <div class="text-sm font-semibold text-black">${m.day}</div>
            <div class="text-xs text-black/60">${formatShortDateRu(d)}</div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-xs text-black/60">
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
    modules.forEach((m, i) => {
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
        'group flex w-full flex-col gap-3 rounded-2xl border border-black/10 bg-white/70 p-4 text-left transition hover:bg-white md:flex-row md:items-center md:justify-between' +
        (expanded ? ' border-black/20 shadow-soft-md' : '');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = buttonClasses;
      btn.setAttribute('aria-controls', panelId);
      btn.setAttribute('aria-expanded', String(expanded));
      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white text-sm font-semibold text-black/80">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <div class="font-medium text-black">${m.day}</div>
            <div class="text-xs text-black/60">${displayDate}</div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-xs text-black/60 md:hidden">
          ${hoursChip}
          ${compactChips}
        </div>
        <div class="hidden flex-wrap items-center gap-2 md:flex md:justify-end">
          ${hoursChip}
          ${fullChips}
        </div>
        <span class="inline-flex h-9 w-9 items-center justify-center self-end rounded-full border border-black/10 bg-white text-black/50 md:self-auto">${chevron}</span>
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
                  <span class="h-5 w-5 text-black/80">${renderIcon(icon)}</span>
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
  function tick() {
    const status = getCountdownStatus(COURSE_START, new Date());
    if (!el) return;
    if (status.isStarted) {
      el.textContent = 'курс начался';
      return;
    }
    const diffMs = Math.max(0, COURSE_START.getTime() - Date.now());
    const seconds = Math.floor((diffMs % 60000) / 1000);
    el.textContent = `${status.days}д ${status.hours}ч ${status.minutes}м ${String(seconds).padStart(2, '0')}с`;
  }
  tick();
  setInterval(tick, 1000);
}
const FEEDBACK_HIDE_DELAY = 6000;
function buildApplicationSummary({ name, email, comment }) {
  const trimmedName = name.trim();
  const firstName = trimmedName ? trimmedName.split(/\s+/)[0] : 'Коллега';
  const emailPart = email.trim();
  const commentPart = comment.trim();
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
function initForm() {
  const form = document.getElementById('applyForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedbackHost = document.getElementById('applyFeedback');
  const assistantInput = document.getElementById('assistantComment');
  const assistantBtn = document.getElementById('assistantSuggest');
  const assistantOutput = document.getElementById('assistantOutput');
  const storageKey = 'applyForm';
  let feedbackTimer = null;
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
    feedbackHost.innerHTML = `
      <div class="feedback-card rounded-2xl border border-black/10 bg-white p-4 shadow-soft-md" data-state="hidden" role="status">
        <div class="flex items-start gap-3">
          <div>
            <p class="text-sm font-semibold text-black">${summary.title}</p>
            <p class="mt-1 text-sm text-black/70">${summary.body}</p>
          </div>
          <button
            type="button"
            class="ml-auto inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-black/10 text-xs text-black/60 transition hover:bg-black hover:text-white"
            aria-label="Скрыть уведомление"
            data-feedback-close
          >
            ×
          </button>
        </div>
      </div>
    `;
    const card = feedbackHost.querySelector('.feedback-card');
    const closeBtn = feedbackHost.querySelector('[data-feedback-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideFeedback, { once: true });
    }
    window.requestAnimationFrame(() => {
      card?.setAttribute('data-state', 'visible');
    });
    feedbackTimer = window.setTimeout(hideFeedback, FEEDBACK_HIDE_DELAY);
  }
  function renderAssistant(result) {
    if (!assistantOutput) return;
    if (!result) {
      assistantOutput.innerHTML =
        '<p class="rounded-xl bg-white p-3 text-black/70 shadow-soft">Помощник временно недоступен. Попробуйте позже.</p>';
      return;
    }
    const pieces = [];
    if (result.message) {
      pieces.push(`<p class="text-black/70">${result.message}</p>`);
    }
    if (Array.isArray(result.modules) && result.modules.length > 0) {
      const list = result.modules
        .map(
          (item) => `
            <li class="rounded-xl bg-white p-3 shadow-soft" role="listitem">
              <p class="font-medium text-black">${item.title}</p>
              <p class="mt-1 text-sm text-black/70">${item.description}</p>
            </li>
          `,
        )
        .join('');
      pieces.push(`<ul class="space-y-2" role="list">${list}</ul>`);
    }
    assistantOutput.innerHTML =
      pieces.join('') ||
      '<p class="text-black/60">Поделитесь интересами, чтобы получить персональные рекомендации.</p>';
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
  if (assistantBtn) {
    assistantBtn.addEventListener('click', () => {
      if (assistantOutput) {
        assistantOutput.innerHTML =
          '<p class="text-black/60">Ищем подходящие модули…</p>';
      }
      assistantBtn.disabled = true;
      assistantBtn.classList.add('opacity-60', 'cursor-wait');
      try {
        const commentSource = assistantInput?.value.trim() || form.elements.comment.value.trim();
        const result = getAssistantRecommendations(commentSource);
        renderAssistant(result);
      } catch (error) {
        console.warn('Не удалось получить рекомендации помощника', error);
        renderAssistant({
          message: 'Помощник временно недоступен. Попробуйте ещё раз позже.',
          modules: [],
        });
      } finally {
        assistantBtn.disabled = false;
        assistantBtn.classList.remove('opacity-60', 'cursor-wait');
      }
    });
  }
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
            a.classList.toggle('text-black', a.dataset.nav === id);
            a.classList.toggle('opacity-70', a.dataset.nav !== id);
          });
          if (id === 'apply') {
            cta.style.opacity = '0';
            cta.style.pointerEvents = 'none';
          } else {
            cta.style.opacity = '1';
            cta.style.pointerEvents = 'auto';
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
        'block rounded-xl border border-black/10 px-3 py-2 text-base font-medium text-black transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40';
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
  document.getElementById('leadPrice').textContent = lead.price;
  const totalHours = Math.round(calculateProgramHours(modules));
  const durationEl = document.getElementById('leadDuration');
  if (durationEl) {
    durationEl.textContent = `${totalHours} часов · ${lead.schedule}`;
  }
  document.getElementById('leadSeats').textContent = lead.seats;
  document.getElementById('leadPriceInline').textContent = lead.price;
  document.getElementById('leadPriceMobile').textContent = lead.price;
}
renderBenefits();
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
renderHelpfulLinks();
initCountdown();
initForm();
initObservers();
initMobileNav();
initScrollBar();
renderLead();
