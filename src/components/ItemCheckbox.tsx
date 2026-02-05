"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleComplete } from "@/lib/actions";
import { useCelebration } from "@/contexts/CelebrationContext";

type ItemCheckboxProps = {
  id: string;
  completed: boolean;
};

export function ItemCheckbox({ id, completed }: ItemCheckboxProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const celebration = useCelebration();

  const handleClick = () => {
    if (!completed) {
      celebration?.triggerCelebration();
    }
    startTransition(async () => {
      await toggleComplete(id);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      aria-label={completed ? "Отметить как не выполненное" : "Отметить как выполненное"}
      disabled={isPending}
      onClick={handleClick}
      className={`item-checkbox shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center disabled:opacity-50 transition-all duration-300 ${completed ? "border-[var(--accent)] bg-[var(--accent-pale)]" : "border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-pale)]"}`}
    >
      {completed ? (
        <span className="item-checkbox__check text-[var(--accent)] text-lg" aria-hidden>✓</span>
      ) : (
        <span className="w-4 h-4" aria-hidden />
      )}
    </button>
  );
}
