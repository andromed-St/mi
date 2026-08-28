/* ------------------------------------------------------------------ */
/*  Контент и конфигурация microinvest.by                              */
/*  Цены калькулятора правятся в объекте CALC_CONFIG ниже.            */
/* ------------------------------------------------------------------ */

export type BadgeKind = "hit" | "new" | "sale" | "offline" | "local";
export type Cat = "program" | "equipment" | "bundle";
export type BizType = "magazin" | "kafe" | "salon" | "fitness" | "other";

export const BADGE_LABEL: Record<BadgeKind, string> = {
  hit: "Хит",
  new: "New",
  sale: "Акция",
  offline: "Офлайн",
  local: "Локальная лицензия",
};

export const BIZ_LABEL: Record<BizType, string> = {
  magazin: "Магазин",
  kafe: "Кафе",
  salon: "Салон красоты",
  fitness: "Фитнес",
  other: "Другое",
};

export interface Product {
  id: string;
  name: string;
  cat: Cat;
  desc: string;
  price: number | null;
  old?: number;
  badges?: BadgeKind[];
  icon: string;
  sku: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "sklad-pro",
    name: "Микроинвест Склад PRO",
    cat: "program",
    desc: "Складской учёт, ТН и ТТН, розничные цены, инвентаризация. Работает без интернета.",
    price: 950,
    badges: ["hit", "offline"],
    icon: "boxes",
    sku: "MI-SKLAD-PRO",
  },
  {
    id: "midays",
    name: "MiDays",
    cat: "program",
    desc: "Касса, меню, заказы и отчёты для кафе, баров и ресторанов.",
    price: 1250,
    badges: ["hit"],
    icon: "terminal",
    sku: "MI-MIDAYS",
  },
  {
    id: "fastpos",
    name: "FastPOS",
    cat: "program",
    desc: "Быстрая кассовая система для розницы и фастфуда: старт за один день.",
    price: 890,
    badges: ["new"],
    icon: "zap",
    sku: "MI-FASTPOS",
  },
  {
    id: "emenu",
    name: "eMenu Pro",
    cat: "program",
    desc: "Электронное меню и QR-заказы для зала, доставки и самовывоза.",
    price: 620,
    badges: ["new"],
    icon: "qr",
    sku: "MI-EMENU",
  },
  {
    id: "fitness",
    name: "Fitness",
    cat: "program",
    desc: "Запись клиентов, абонементы, списание материалов, зарплата тренеров.",
    price: 900,
    icon: "dumbbell",
    sku: "MI-FITNESS",
  },
  {
    id: "gps",
    name: "GPS Tracker",
    cat: "program",
    desc: "Мониторинг транспорта и доставки: треки, геозоны, отчёты по пробегу.",
    price: 750,
    icon: "gps",
    sku: "MI-GPS",
  },
  {
    id: "callmi",
    name: "CallMi",
    cat: "program",
    desc: "Учёт звонков и заявок для сервисных компаний и колл-центров.",
    price: 680,
    icon: "call",
    sku: "MI-CALLMI",
  },
  {
    id: "opencart",
    name: "Интеграция OpenCart",
    cat: "program",
    desc: "Синхронизация интернет-магазина со складом: остатки, цены, заказы.",
    price: null,
    icon: "link",
    sku: "MI-OPENCART",
  },
  {
    id: "ksa-titan",
    name: "КСА Титан-А",
    cat: "equipment",
    desc: "Кассовый суммирующий аппарат, внесён в реестр РБ. Фискализация под ключ.",
    price: 1100,
    badges: ["offline"],
    icon: "cashbox",
    sku: "HW-KSA-TITAN",
  },
  {
    id: "honeywell",
    name: "Сканер Honeywell 1450g",
    cat: "equipment",
    desc: "Ручной 2D-сканер штрих-кодов, USB. Читает повреждённые и мелкие коды.",
    price: 320,
    icon: "scan",
    sku: "HW-HW1450G",
  },
  {
    id: "cas-scales",
    name: "Весы CAS SW-II",
    cat: "equipment",
    desc: "Торговые весы 6/15 кг с двусторонней индикацией и питанием от сети.",
    price: 480,
    icon: "scale",
    sku: "HW-CAS-SW2",
  },
  {
    id: "xprinter",
    name: "Принтер чеков Xprinter 80",
    cat: "equipment",
    desc: "Термопринтер чеков 80 мм с автообрезчиком, USB + LAN.",
    price: 560,
    icon: "printer",
    sku: "HW-XP80",
  },
  {
    id: "bundle-shop",
    name: "Комплект «Магазин под ключ»",
    cat: "bundle",
    desc: "Склад PRO + КСА + сканер + установка, загрузка справочников и обучение.",
    price: 2890,
    old: 3240,
    badges: ["sale"],
    icon: "bundle",
    sku: "SET-SHOP",
  },
  {
    id: "bundle-cafe",
    name: "Комплект «Кафе под ключ»",
    cat: "bundle",
    desc: "MiDays + POS-терминал + принтер чеков + eMenu. Монтаж за 1 день.",
    price: 3490,
    old: 3940,
    badges: ["sale"],
    icon: "bundle",
    sku: "SET-CAFE",
  },
];

/* ----------------------------- ниши ------------------------------ */

export interface Niche {
  id: BizType;
  title: string;
  desc: string;
  icon: string;
  tag: string;
}

export const NICHES: Niche[] = [
  {
    id: "magazin",
    title: "Магазин",
    desc: "Касса, склад, цены, ТН и отчёты. Меньше ошибок, быстрее инвентаризация.",
    icon: "store",
    tag: "ритейл",
  },
  {
    id: "kafe",
    title: "Кафе и общепит",
    desc: "MiDays: касса, меню, заказы, отчёты для кафе и ресторанов.",
    icon: "cafe",
    tag: "horeca",
  },
  {
    id: "fitness",
    title: "Фитнес-студия",
    desc: "Запись клиентов, списание материалов, зарплата тренеров.",
    icon: "dumbbell",
    tag: "услуги",
  },
  {
    id: "salon",
    title: "Салон красоты",
    desc: "Запись мастеров, учёт материалов, программа лояльности.",
    icon: "salon",
    tag: "услуги",
  },
  {
    id: "other",
    title: "Автозапчасти",
    desc: "Каталог по кросс-номерам, остатки, поставщики, резервы клиентов.",
    icon: "auto",
    tag: "ритейл",
  },
  {
    id: "other",
    title: "Стройматериалы",
    desc: "Учёт по весу и объёму, оптовые цены, скидки и отсрочки.",
    icon: "build",
    tag: "опт",
  },
];

/* ------------------------- почему локально ------------------------ */

export const WHY_LOCAL = [
  {
    icon: "wifioff",
    title: "Работает без интернета",
    desc: "Касса и склад продолжают работать при сбоях связи. Продажи не останавливаются, чеки печатаются, остатки списываются.",
  },
  {
    icon: "key",
    title: "Один раз купили — пользуетесь",
    desc: "Нет обязательной ежемесячной подписки за базовую лицензию. Платите за обновления и поддержку только когда они нужны.",
  },
  {
    icon: "server",
    title: "Данные в вашей инфраструктуре",
    desc: "База и отчёты остаются у вас: на кассе, компьютере или локальном сервере. Никакого внешнего хранилища.",
  },
  {
    icon: "headset",
    title: "Понятное внедрение",
    desc: "Установка, настройка, загрузка справочников, обучение персонала. Запуск под ключ за 7 дней с сопровождением.",
  },
];

/* --------------------------- сравнение ---------------------------- */

export type Mark = "ok" | "warn" | "no";

export interface CompareRow {
  param: string;
  local: { mark: Mark; text: string };
  cloud: { mark: Mark; text: string };
}

export const COMPARE_ROWS: CompareRow[] = [
  {
    param: "Работа без интернета",
    local: { mark: "ok", text: "Да, полностью автономно" },
    cloud: { mark: "warn", text: "Ограниченно или нет" },
  },
  {
    param: "Ежемесячная плата",
    local: { mark: "ok", text: "Не обязательна за базовую лицензию" },
    cloud: { mark: "no", text: "Обычно обязательна" },
  },
  {
    param: "Где хранятся данные",
    local: { mark: "ok", text: "На вашем оборудовании / сервере" },
    cloud: { mark: "warn", text: "На внешнем сервисе" },
  },
  {
    param: "Настройка под РБ",
    local: { mark: "ok", text: "ТН, ТТН, розничные цены, локальные требования" },
    cloud: { mark: "warn", text: "Зависит от вендора" },
  },
  {
    param: "Владение лицензией",
    local: { mark: "ok", text: "Разовая покупка" },
    cloud: { mark: "no", text: "Аренда сервиса" },
  },
];

export const COMPARE_ROWS_EXTRA: CompareRow[] = [
  {
    param: "Остановка при неоплате подписки",
    local: { mark: "ok", text: "Программа продолжает работать" },
    cloud: { mark: "no", text: "Доступ блокируется" },
  },
  {
    param: "Обмен с 1С и API",
    local: { mark: "ok", text: "Штатные модули, доработки под учёт" },
    cloud: { mark: "warn", text: "Через платные коннекторы" },
  },
  {
    param: "Скорость операций на кассе",
    local: { mark: "ok", text: "Локальная БД — мгновенно" },
    cloud: { mark: "warn", text: "Зависит от канала связи" },
  },
  {
    param: "Стоимость владения за 3 года",
    local: { mark: "ok", text: "Разовая лицензия + опции" },
    cloud: { mark: "no", text: "36 ежемесячных платежей" },
  },
];

/* --------------------------- таймлайн ----------------------------- */

export const TIMELINE = [
  {
    day: "День 1",
    title: "Заявка и аудит задач",
    desc: "Разбираем процессы, номенклатуру и требования к отчётности.",
    icon: "doc",
  },
  {
    day: "Дни 2–3",
    title: "Подбор продукта и оборудования",
    desc: "Фиксируем смету: лицензии, техника, интеграции.",
    icon: "list",
  },
  {
    day: "Дни 4–5",
    title: "Установка и справочники",
    desc: "Ставим ПО, переносим товары и цены из Excel или 1С.",
    icon: "gear",
  },
  {
    day: "День 6",
    title: "Обучение персонала",
    desc: "Кассиры — 2–4 часа, управляющий — 1 день. С методичками.",
    icon: "edu",
  },
  {
    day: "День 7",
    title: "Запуск и сопровождение",
    desc: "Первая смена с инженером на связи. 2 месяца поддержки.",
    icon: "rocket",
  },
];

/* ----------------------------- кейсы ------------------------------ */

export interface CaseItem {
  id: string;
  biz: string;
  title: string;
  task: string;
  metric: string;
  metricNote: string;
  photo?: string;
  results: { value: string; label: string }[];
  quote: string;
}

export const CASES: CaseItem[] = [
  {
    id: "produkty24",
    biz: "Магазин",
    title: "Сеть продуктовых магазинов «Продукты 24»",
    task: "Учёт в Excel, инвентаризация на два дня, постоянные недостачи и пересортица.",
    metric: "6 часов",
    metricNote: "инвентаризация вместо 2 дней",
    photo:
      "https://image.qwenlm.ai/generated-images/ef81c441-2e96-44b9-a2e9-d40313015a89/_result.png",
    results: [
      { value: "−92%", label: "времени на инвентаризацию" },
      { value: "+14%", label: "маржа за счёт контроля остатков" },
      { value: "0", label: "штрафов по кассовой дисциплине" },
    ],
    quote:
      "Перевели 3 магазина на Склад PRO с КСА. Инвентаризацию теперь закрываем за смену, а не за выходные.",
  },
  {
    id: "coffee1",
    biz: "Кафе",
    title: "Сеть кофеен «Кофе №1», 3 точки",
    task: "Облачная касса зависала при сбоях интернета — очередь стояла, чеки пробивались вручную.",
    metric: "0",
    metricNote: "остановок кассы за 8 месяцев",
    photo:
      "https://image.qwenlm.ai/generated-images/e69835db-7c6c-4c53-bae8-8946fcc06662/_result.png",
    results: [
      { value: "−7%", label: "фудкост после аналитики MiDays" },
      { value: "×2", label: "скорость приёма заказа с eMenu" },
      { value: "1 день", label: "занял запуск каждой точки" },
    ],
    quote:
      "MiDays работает локально: интернет пропадал дважды за зиму — гости даже не заметили.",
  },
  {
    id: "gravity",
    biz: "Фитнес",
    title: "Фитнес-студия Gravity, Минск",
    task: "Запись клиентов в мессенджерах, потери брони, ручной расчёт зарплаты тренеров.",
    metric: "+31%",
    metricNote: "повторные визиты за полгода",
    photo:
      "https://image.qwenlm.ai/generated-images/a7f22979-fcd9-43c5-93c2-0b198773a286/_result.png",
    results: [
      { value: "+31%", label: "повторных визитов" },
      { value: "2 ч/нед", label: "экономии на расчёте зарплат" },
      { value: "−40%", label: "потерянных броней" },
    ],
    quote:
      "Модуль Fitness закрыл запись и абонементы, тренеры видят свои начисления в приложении.",
  },
  {
    id: "motormarket",
    biz: "Автозапчасти",
    title: "Магазин автозапчастей «МоторМаркет»",
    task: "40 000 позиций, подбор по кросс-номерам вручную, клиенты ждали ответа часами.",
    metric: "40 сек",
    metricNote: "подбор запчасти вместо 10 минут",
    results: [
      { value: "40 000", label: "позиций в едином каталоге" },
      { value: "×15", label: "быстрее подбор по кросс-номерам" },
      { value: "+22%", label: "конверсия заявок в продажи" },
    ],
    quote:
      "Кросс-номера и аналоги ищутся мгновенно, менеджеры перестали терять горячих клиентов.",
  },
  {
    id: "stroygrad",
    biz: "Стройматериалы",
    title: "Оптово-розничная база «СтройГрад»",
    task: "Учёт по весу и объёму в разных единицах, пересортица цемента и сыпучих, ручные скидки.",
    metric: "−87%",
    metricNote: "недовесов и пересортицы",
    results: [
      { value: "−87%", label: "расхождений при приёмке" },
      { value: "+9%", label: "средний чек с ценовыми колонками" },
      { value: "3 дня", label: "перенос справочников из 1С" },
    ],
    quote:
      "Весы связаны со складом напрямую: приёмка фуры занимает час вместо смены.",
  },
];

/* ---------------------------- отзывы ------------------------------ */

export interface Review {
  photo: string;
  name: string;
  role: string;
  company: string;
  text: string;
  stars: number;
  year: string;
}

export const REVIEWS: Review[] = [
  {
    photo:
      "https://image.qwenlm.ai/generated-images/86490f7b-4935-41cb-9d37-20f02f8dd574/_result.png",
    name: "Дмитрий Ковалёв",
    role: "Собственник",
    company: "Сеть магазинов «Продукты 24», Минск",
    text: "Дважды за год у нас пропадал интернет на целый день — касса продолжала работать, ни одной продажи не потеряли. После облачного сервиса это главное, за что я готов платить.",
    stars: 5,
    year: "внедрение 2025",
  },
  {
    photo:
      "https://image.qwenlm.ai/generated-images/3c26a802-e2d8-414f-9726-bd8e6bccb14e/_result.png",
    name: "Анна Романовская",
    role: "Управляющая",
    company: "Сеть кофеен «Кофе №1», 3 точки",
    text: "Запустили три точки за неделю. Отчёты по фудкосту показали лишние списания уже в первый месяц — окупили внедрение раньше, чем закончилась бесплатная поддержка.",
    stars: 5,
    year: "внедрение 2025",
  },
  {
    photo:
      "https://image.qwenlm.ai/generated-images/c48d5667-93b7-468b-9caf-06e7b046d111/_result.png",
    name: "Сергей Лебедев",
    role: "IT-директор",
    company: "«МоторМаркет», автозапчасти",
    text: "Как технарю мне важно было API и обмен с 1С без «костылей». Модуль синхронизации работает штатно, документация внятная, на вопросы отвечали в течение часа.",
    stars: 5,
    year: "внедрение 2024",
  },
];

/* ------------------------------ FAQ -------------------------------- */

export const FAQ = [
  {
    q: "Сколько стоит автоматизация магазина?",
    a: "Стоимость зависит от количества рабочих мест, оборудования и интеграций. Рассчитайте предварительно в калькуляторе выше или оставьте заявку — точная смета после бесплатного аудита задач.",
  },
  {
    q: "Работает ли программа без интернета?",
    a: "Да, локальные решения Microinvest и MiDays работают полностью автономно. Интернет нужен только для облачных отчётов и обновлений — по желанию.",
  },
  {
    q: "Можно ли перенести базу из Excel или старой программы?",
    a: "Да, мы переносим справочники товаров, клиентов и контрагентов из Excel, 1С, Microinvest и других программ. Стоимость переноса — от 250 BYN в зависимости от объёма.",
  },
  {
    q: "Какие отчёты есть для ТН и ТТН?",
    a: "Программы формируют ТН, ТТН, розничные цены и отчёты по кассовой дисциплине в соответствии с требованиями законодательства РБ. Формы обновляются при изменении норм.",
  },
  {
    q: "Сколько времени занимает обучение персонала?",
    a: "Базовое обучение кассира — 2–4 часа, управляющего — 1 день. Мы предоставляем видеоинструкции и методички, которые остаются у вас.",
  },
  {
    q: "Есть ли поддержка после внедрения?",
    a: "Да, первые 2 месяца — бесплатная поддержка. Далее — абонентское обслуживание или разовые консультации, по вашему выбору.",
  },
];

/* ------------------- конфигурация калькулятора --------------------- */
/*  Правьте цены здесь — пересчёт автоматический.                     */

export const CALC_CONFIG = {
  typePrices: {
    magazin: { price: 950, product: "Лицензия «Микроинвест Склад PRO»" },
    kafe: { price: 1250, product: "Лицензия MiDays" },
    salon: { price: 850, product: "Лицензия FastPOS + модуль записи" },
    fitness: { price: 900, product: "Лицензия Fitness" },
    other: { price: 800, product: "Базовая лицензия Microinvest" },
  } as Record<BizType, { price: number; product: string }>,
  equipment: [
    { id: "kassa", label: "Касса (КСА Титан-А)", price: 1100 },
    { id: "scanner", label: "Сканер штрих-кодов (Honeywell 1450g)", price: 320 },
    { id: "scales", label: "Весы (CAS SW-II)", price: 480 },
    { id: "printer", label: "Принтер чеков (Xprinter 80)", price: 560 },
  ],
  options: [
    { id: "oneS", label: "Обмен с 1С", price: 700 },
    { id: "loyalty", label: "Программа лояльности", price: 450 },
    { id: "emenu", label: "Онлайн-меню / eMenu", price: 620 },
  ],
  workplacePrice: 350,
};

export const CALC_INCLUDED_BASE = [
  "Установка и настройка",
  "Загрузка справочников",
  "Обучение персонала",
  "2 месяца бесплатной поддержки",
];

/* ---------------------------- контакты ----------------------------- */

export const CONTACTS = {
  phone: "+375 (29) 123-45-67",
  phoneHref: "tel:+375291234567",
  whatsapp: "https://wa.me/375291234567",
  telegram: "https://t.me/microinvest_by",
  email: "info@microinvest.by",
  address: "г. Минск, ул. Притыцкого, 62Б, офис 412",
  hours: "Пн–Пт 9:00–18:00",
};

export const MARQUEE_ITEMS = [
  "Продуктовый ритейл",
  "HoReCa",
  "Кафе и рестораны",
  "Фитнес-студии",
  "Салоны красоты",
  "Автозапчасти",
  "Стройматериалы",
  "Аптеки",
  "СТО и сервисы",
  "Оптовые базы",
];

/* -------------------------- утилиты -------------------------------- */

export const byn = (n: number): string =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + "\u00A0BYN";

export const plural = (n: number, forms: [string, string, string]): string => {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
};
