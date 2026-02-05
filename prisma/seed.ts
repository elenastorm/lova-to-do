import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todoItem.createMany({
    data: [
      {
        title: "Кофе-чекин «без телефонов»",
        description:
          "30 минут в кофейне, телефоны в авиарежим, обсуждаем только хорошее.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=кофейня",
        weight: 7,
      },
      {
        title: "Прогулка «3 улицы — 3 комплимента»",
        description:
          "Идём пешком и по очереди говорим 3 честных комплимента (не про внешность).",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=парк",
        weight: 8,
      },
      {
        title: "Новая кухня раз в месяц",
        description:
          "Выбираем страну и пробуем ресторан этой кухни, как мини-путешествие.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=ресторан%20национальной%20кухни",
        weight: 6,
      },
      {
        title: "Свидание в музее «выбери 1 экспонат»",
        description:
          "Каждый выбирает 1 вещь и рассказывает, почему она «про нас».",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=музей",
        weight: 5,
      },
      {
        title: "Фотопрогулка «10 кадров»",
        description:
          "Делаем 10 фото про наш день (без селфи-погони), потом собираем альбом.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=смотровая%20площадка",
        weight: 4,
      },
      {
        title: "Ужин «один готовит — другой ведущий»",
        description:
          "Один готовит простое блюдо, второй — отвечает за музыку и сервировку.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=продуктовый%20магазин",
        weight: 6,
      },
      {
        title: "Секретное место для «пятничного сброса»",
        description:
          "Выбираем одну лавочку/набережную, где раз в неделю подводим итоги.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=набережная",
        weight: 7,
      },
      {
        title: "Кино без кино: «театр дома»",
        description:
          "Каждый ставит короткую сценку/монолог на 2 минуты (да, смешно — можно).",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=театр",
        weight: 3,
      },
      {
        title: "«Рандом-цвет» пикник",
        description:
          "Покупаем еду одного цвета и устраиваем пикник — абсурдно, зато весело.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=пикниковая%20зона",
        weight: 4,
      },
      {
        title: "День маленьких «да»",
        description:
          "3 раза за день говорим «да» друг другу на маленькие просьбы/идеи.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=торговый%20центр",
        weight: 8,
      },
      {
        title: "Мини-квест «найди редкий чай/десерт»",
        description: "Заходим в 2–3 места и ищем самый необычный вкус.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=чайный%20магазин",
        weight: 5,
      },
      {
        title: "Спорт-дуэль «30 минут честно»",
        description:
          "Любая активность (сквош/зал/бадминтон) — просто вместе и без гонки.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=спортивный%20клуб",
        weight: 6,
      },
      {
        title: "Ритуал «1 вопрос на ночь»",
        description:
          "Перед сном один вопрос: «что сегодня было самым тёплым?».",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=книжный%20магазин",
        weight: 9,
      },
      {
        title: "Свидание «как туристы»",
        description:
          "Идём в свой же город, но по маршруту «топ-места как для гостей».",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=достопримечательности",
        weight: 5,
      },
      {
        title: "Письмо в будущее (в конверте)",
        description:
          "Пишем друг другу письмо на 6 месяцев вперёд и прячем в «наше» место.",
        detailsType: "yandex_maps",
        detailsUrl: "https://yandex.ru/maps/?text=почта",
        weight: 10,
      },
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
