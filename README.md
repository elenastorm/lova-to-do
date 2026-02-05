# Ту ду лист пары (Lova To-Do)

Небольшое веб-приложение: список дел для пары с котиком, который становится счастливее по мере выполнения пунктов.

## Стек

- Next.js (App Router) + TypeScript
- Prisma + SQLite
- Server Actions, без отдельного REST API

## Запуск

```bash
# Установка зависимостей
npm install

# Переменные окружения (уже есть .env с DATABASE_URL="file:./dev.db")
cp .env.example .env   # при необходимости

# Миграции и генерация клиента Prisma
npm run db:generate
npm run db:migrate

# Опционально: тестовые данные
npm run db:seed

# Режим разработки
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Docker

```bash
# Сборка и запуск (база SQLite в томе lova-todo-data)
docker compose up --build

# В фоне
docker compose up -d --build
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000). При первом запуске выполняются миграции Prisma; данные хранятся в томе `lova-todo-data`. Новые пункты можно добавлять через интерфейс (кнопка «+» на главной).

## Скрипты

- `npm run dev` — разработка
- `npm run build` / `npm run start` — сборка и запуск
- `npm run db:generate` — генерация Prisma Client
- `npm run db:migrate` — миграции
- `npm run db:seed` — сид данных
- `npm run db:studio` — Prisma Studio

## Структура

- **Главная /** — список пунктов, форма добавления, котик с прогрессом
- **Пункт /item/[id]** — название, описание, ссылка (Instagram / Яндекс.Карты), вес, отметка «выполнено», удаление

Вес пункта 1–10 влияет на «счастье» котика: прогресс = сумма весов выполненных / сумма весов всех.
