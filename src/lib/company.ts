/**
 * Все сведения о компании — ровно здесь.
 *
 * ВАЖНО для демо: тут нет ни гарантии, ни стажа, ни числа объектов, ни
 * бесплатного замера, ни цены за квадратный метр. Эти данные в карточке
 * не подтверждены, а выдуманная цифра — первое, на чём владелец поймает
 * сайт на вранье. Появятся подтверждённые — добавлять сюда.
 */
export const COMPANY = {
  name: "RemontHouseRoom",
  city: "Подольск",
  tagline: "Ремонт квартир и санузлов под ключ",
  address: "Комсомольская улица, 59",
  postcode: "142100",
  phone: "+7 (926) 964-50-74",
  phoneHref: "+79269645074",
  /** Номер без плюса и скобок — так его ждут ссылки WhatsApp и Viber. */
  messengerNumber: "79269645074",
  hours: "Ежедневно, 09:00–21:00",
  opensAt: "09:00",
  closesAt: "21:00",
  rating: 4.5,
  reviewCount: 9,
  textReviewCount: 8,
  photoCount: 19,
  /** Категории из карточки на картах. */
  categories: [
    "Ремонт и отделка",
    "Строительство домов и коттеджей",
    "Строительная компания",
  ],
} as const;

export const WHATSAPP_URL = `https://wa.me/${COMPANY.messengerNumber}?text=${encodeURIComponent(
  "Здравствуйте! Пишу с сайта, хочу рассчитать ремонт.",
)}`;

export const VIBER_URL = `viber://chat?number=%2B${COMPANY.messengerNumber}`;

export const TEL_URL = `tel:${COMPANY.phoneHref}`;

/** Яндекс-карты по адресу: кнопка «построить маршрут» без встроенного iframe. */
export const MAP_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(
  `${COMPANY.city}, ${COMPANY.address}`,
)}`;
