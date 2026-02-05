"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteItem } from "@/lib/actions";

type DeleteButtonProps = { itemId: string };

export function DeleteButton({ itemId }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm("Удалить этот пункт?")) return;
    startTransition(async () => {
      await deleteItem(itemId);
      router.push("/");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-lg border border-red-200 text-red-600 px-4 py-2 text-sm hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? "Удаление…" : "Удалить"}
    </button>
  );
}
