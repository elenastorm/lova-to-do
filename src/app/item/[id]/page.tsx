import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getItemEmoji } from "@/lib/emoji";
import { getWeightLevel } from "@/lib/weight";
import { ItemCheckbox } from "@/components/ItemCheckbox";
import { DeleteButton } from "@/components/DeleteButton";
import { EditItemButton } from "@/components/EditItemButton";

// Отключаем кэширование — страница всегда показывает актуальные данные из БД
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ItemPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.todoItem.findUnique({ where: { id } });

  if (!item) notFound();

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <Link
        href="/love"
        className="inline-block text-[var(--text-muted)] hover:text-[var(--accent)] text-sm mb-6"
      >
        ← Назад к списку
      </Link>

      <article className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-6">
        <div className="flex items-start gap-4 mb-4">
          <ItemCheckbox id={item.id} completed={item.completed} />
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

        <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
          <EditItemButton
            item={{
              id: item.id,
              title: item.title,
              description: item.description,
              detailsType: item.detailsType,
              detailsUrl: item.detailsUrl,
              weight: item.weight,
            }}
          />
          <DeleteButton itemId={item.id} />
        </div>
      </article>
    </main>
  );
}
