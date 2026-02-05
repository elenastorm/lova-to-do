"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteItem } from "@/lib/actions";

type DeleteItemIconButtonProps = { itemId: string };

export function DeleteItemIconButton({ itemId }: DeleteItemIconButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!confirm("Удалить этот пункт из списка?")) return;
    startTransition(async () => {
      await deleteItem(itemId);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
      aria-label="Удалить пункт"
    >
      <span aria-hidden>🗑</span>
    </button>
  );
}
