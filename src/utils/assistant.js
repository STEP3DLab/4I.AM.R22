const catalog = [
  {
    id: 'scan-basics',
    title: 'Модуль «3D-сканирование и подготовка оборудования»',
    description:
      'Разбираемся с калибровкой, выбором сканера и получением точного облака точек для последующей работы.',
    keywords: ['скан', 'scan', 'цифров', 'облако точек', 'калибр'],
  },
  {
    id: 'cad-reverse',
    title: 'Модуль «Реверсивный инжиниринг в CAD»',
    description:
      'Переносим данные сканирования в CAD, восстанавливаем поверхности, подготавливаем твердотельную модель.',
    keywords: ['cad', 'reverse', 'реверс', 'поверхност', 'geomagic', 'model'],
  },
  {
    id: 'additive-production',
    title: 'Модуль «Аддитивное производство и постобработка»',
    description:
      'Выбираем технологию печати, подготавливаем G-код и доводим изделия до требуемого состояния.',
    keywords: ['печать', 'additive', '3d-печать', 'постобработ', 'g-код', 'принтер'],
  },
  {
    id: 'medical',
    title: 'Практикум «Медицинские кейсы и биопротезирование»',
    description:
      'Разбираем реальные кейсы по изготовлению имплантов и биопротезов с учётом требований отрасли.',
    keywords: ['медицин', 'био', 'имплант', 'протез', 'медицина'],
  },
  {
    id: 'cnc',
    title: 'Модуль «Подготовка к ЧПУ и изготовление оснастки»',
    description:
      'Оптимизируем детали под обработку, учимся готовить управляющие программы и постпроцессинг.',
    keywords: ['чпу', 'cnc', 'оснаст', 'фрезер', 'станок'],
  },
];

const defaultModules = catalog.slice(0, 3);

export function getAssistantRecommendations(comment = '') {
  try {
    const normalized = comment.toLocaleLowerCase('ru-RU');
    const matches = normalized
      ? catalog.filter((module) =>
          module.keywords.some((keyword) => normalized.includes(keyword)),
        )
      : [];

    if (matches.length > 0) {
      return {
        success: true,
        modules: matches,
        message: 'Сфокусируйтесь на этих модулях — они лучше всего соответствуют запросу.',
        fallback: false,
      };
    }

    return {
      success: true,
      modules: defaultModules,
      message: normalized
        ? 'Не нашли точных совпадений, но эти модули помогут закрыть базовые потребности.'
        : 'Расскажите о целях подробнее или начните с ключевых модулей ниже.',
      fallback: true,
    };
  } catch (error) {
    console.warn('Assistant logic unavailable', error);
    return {
      success: false,
      modules: defaultModules,
      message: 'Помощник недоступен. Ниже — основные модули курса.',
      fallback: true,
    };
  }
}
