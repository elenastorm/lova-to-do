import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getItemEmoji } from "@/lib/emoji";
import { getWeightLevel } from "@/lib/weight";
import { ItemCheckbox } from "@/components/ItemCheckbox";
import { DeleteButton } from "@/components/DeleteButton";
import { PhotoUploadButton } from "@/components/PhotoUploadButton";

// Отключаем кэширование — страница всегда показывает актуальные данные из БД
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ItemPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.todoItem.findUnique({
    where: { id },
    include: { photos: { orderBy: { createdAt: "desc" } } },
  });

  if (!item) notFound();

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-block text-[var(--text-muted)] hover:text-[var(--accent)] text-sm mb-6"
      >
        ← Назад к списку
      </Link>

      <article className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-6">
        <div className="flex items-start gap-4 mb-4">
          <ItemCheckbox id={item.id} title={item.title} completed={item.completed} />
          <span className="text-3xl shrink-0" aria-hidden>
            {getItemEmoji(item.id)}
          </span>
          <div className="flex-1 min-w-0">
            <h1
              className={`text-xl font-semibold transition-all duration-300 ${item.completed ? "line-through text-[var(--text-muted)] opacity-80" : "text-[var(--text)]"}`}
            >
              {item.title}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {getWeightLevel(item.weight).emoji} {getWeightLevel(item.weight).name} ({item.weight}/10)
            </p>
          </div>
        </div>

        {item.description && (
          <div className="mb-4">
            <h2 className="text-sm font-medium text-[var(--text-muted)] mb-1">
              Описание
            </h2>
            <p className="text-[var(--text)] whitespace-pre-wrap">
              {item.description}
            </p>
          </div>
        )}

        {item.detailsUrl && (
          <div className="mb-4">
            <h2 className="text-sm font-medium text-[var(--text-muted)] mb-1">
              Подробности
            </h2>
            <a
              href={item.detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-pale)] text-[var(--text)] px-4 py-2 hover:bg-[var(--accent-soft)] hover:text-white transition-colors"
            >
              {item.detailsType === "instagram" && (
                <>
                  <span aria-hidden>📷</span>
                  Открыть в Instagram
                </>
              )}
              {item.detailsType === "yandex_maps" && (
                <>
                  <span aria-hidden>📍</span>
                  Открыть на карте
                </>
              )}
              {item.detailsType === "other" && (
                <>
                  <span aria-hidden>🔗</span>
                  Открыть ссылку
                </>
              )}
              {!item.detailsType && "Открыть ссылку"}
            </a>
          </div>
        )}

        {/* Фотографии */}
        {item.photos.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-medium text-[var(--text-muted)] mb-2">
              📸 Фотографии ({item.photos.length})
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {item.photos.map((photo) => (
                <a
                  key={photo.id}
                  href={`/api/photos/${photo.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img
                    src={`/api/photos/${photo.filename}`}
                    alt="Фото"
                    className="w-full h-full object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Кнопка добавить фото (только для выполненных) */}
        {item.completed && (
          <div className="mb-4">
            <PhotoUploadButton todoItemId={item.id} todoTitle={item.title} />
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
          <DeleteButton itemId={item.id} />
        </div>
      </article>
    </main>
  );
}
