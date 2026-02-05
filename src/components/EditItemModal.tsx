"use client";

import { useEffect, useRef } from "react";
import { EditItemForm } from "./EditItemForm";

type TodoItem = {
  id: string;
  title: string;
  description: string | null;
  detailsType: string | null;
  detailsUrl: string | null;
  weight: number;
};

type EditItemModalProps = {
  item: TodoItem;
  onClose: () => void;
};

export function EditItemModal({ item, onClose }: EditItemModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 w-full max-w-lg mx-auto my-auto p-0 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Редактировать задачу
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text)] text-2xl leading-none"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        <EditItemForm item={item} onSuccess={onClose} onCancel={onClose} />
      </div>
    </dialog>
  );
}
