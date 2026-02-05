import Link from "next/link";
import { ItemCheckbox } from "./ItemCheckbox";
import { DeleteItemIconButton } from "./DeleteItemIconButton";
import { getItemEmoji } from "@/lib/emoji";
import type { TodoItem } from "@prisma/client";

type ItemListProps = {
  items: TodoItem[];
};

export function ItemList({ items }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-8 text-center text-[var(--text-muted)]">
        Пока нет пунктов. Нажмите + и добавьте первый — котик будет рад!
      </div>
    );
  }

  const sorted = [...items].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <ul className="space-y-3">
      {sorted.map((item) => (
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
              вес {item.weight}
              {item.completed && " · выполнено"}
            </span>
          </div>
          <Link
            href={`/item/${item.id}`}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text)] hover:bg-[var(--accent-pale)] shrink-0"
          >
            Подробнее
          </Link>
          <DeleteItemIconButton itemId={item.id} />
        </li>
      ))}
    </ul>
  );
}
