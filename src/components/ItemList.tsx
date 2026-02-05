"use client";

import { useState } from "react";
import Link from "next/link";
import { ItemCheckbox } from "./ItemCheckbox";
import { DeleteItemIconButton } from "./DeleteItemIconButton";
import { getItemEmoji } from "@/lib/emoji";
import { getWeightLevel } from "@/lib/weight";

type TodoItem = {
  id: string;
  title: string;
  weight: number;
  completed: boolean;
  createdAt: Date;
};

type ItemListProps = {
  items: TodoItem[];
};

const ITEMS_PER_PAGE = 15;

export function ItemList({ items }: ItemListProps) {
  const [page, setPage] = useState(1);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-8 text-center text-[var(--text-muted)]">
        Пока нет пунктов. Нажмите + и добавьте первый — котик будет рад!
      </div>
    );
  }

  // Сортировка: невыполненные сверху (по дате создания), выполненные снизу (по дате создания)
  const sorted = [...items].sort((a, b) => {
    // Сначала по статусу: невыполненные (false) перед выполненными (true)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Затем по дате создания
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  // Пагинация
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <ul className="space-y-3">
        {pageItems.map((item) => (
          <li
            key={item.id}
            className={`rounded-xl bg-[var(--bg-card)] border border-[var(--border)] p-4 flex items-center gap-4 item-row ${item.completed ? "item-row--completed" : ""}`}
          >
            <ItemCheckbox id={item.id} completed={item.completed} />
            <span className="text-xl shrink-0" aria-hidden>
              {getItemEmoji(item.id)}
            </span>
            <div className="flex-1 min-w-0">
              <Link
                href={`/item/${item.id}`}
                className={`font-medium block truncate transition-all duration-300 ${item.completed ? "line-through text-[var(--text-muted)] opacity-80" : "text-[var(--text)] hover:text-[var(--accent)]"}`}
              >
                {item.title}
              </Link>
              <span className="text-xs text-[var(--text-muted)]">
                {getWeightLevel(item.weight).emoji} {getWeightLevel(item.weight).name}
                {item.completed && " · выполнено ✓"}
              </span>
            </div>
            <Link
              href={`/item/${item.id}`}
              className="rounded-lg border border-[var(--border)] px-2 py-1.5 sm:px-3 text-sm text-[var(--text)] hover:bg-[var(--accent-pale)] shrink-0"
              title="Подробнее"
            >
              <span className="hidden sm:inline">Подробнее</span>
              <span className="sm:hidden">→</span>
            </Link>
            <DeleteItemIconButton itemId={item.id} />
          </li>
        ))}
      </ul>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm text-[var(--text)] hover:bg-[var(--accent-pale)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ←
          </button>
          <span className="text-sm text-[var(--text-muted)]">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm text-[var(--text)] hover:bg-[var(--accent-pale)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
