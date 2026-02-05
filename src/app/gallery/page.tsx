import Link from "next/link";
import { prisma } from "@/lib/db";

// Отключаем кэширование
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Получаем все фото с информацией о задачах
  const photos = await prisma.photo.findMany({
    include: {
      todoItem: {
        select: {
          id: true,
          title: true,
          completedAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
            📸 Галерея воспоминаний
          </h1>
          <p className="text-[var(--text-muted)] mt-1">
            Фотографии ваших совместных приключений
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--accent-pale)]"
        >
          ← К списку
        </Link>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-8 text-center">
          <span className="text-4xl mb-4 block">🖼️</span>
          <p className="text-[var(--text-muted)]">
            Пока нет фотографий. Выполняйте дела и добавляйте фото!
          </p>
          <Link
            href="/"
            className="inline-block mt-4 rounded-lg bg-[var(--accent)] text-white px-6 py-2 hover:opacity-90"
          >
            К списку дел
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden"
            >
              <a
                href={`/api/photos/${photo.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square overflow-hidden hover:opacity-90 transition-opacity"
              >
                <img
                  src={`/api/photos/${photo.filename}`}
                  alt={photo.todoItem.title}
                  className="w-full h-full object-cover"
                />
              </a>
              <div className="p-3">
                <Link
                  href={`/item/${photo.todoItem.id}`}
                  className="font-medium text-[var(--text)] hover:text-[var(--accent)] line-clamp-2"
                >
                  {photo.todoItem.title}
                </Link>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {photo.createdAt.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
