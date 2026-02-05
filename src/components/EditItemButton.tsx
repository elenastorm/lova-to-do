"use client";

import { useState } from "react";
import { EditItemModal } from "./EditItemModal";

type TodoItem = {
  id: string;
  title: string;
  description: string | null;
  detailsType: string | null;
  detailsUrl: string | null;
  weight: number;
};

type EditItemButtonProps = {
  item: TodoItem;
};

export function EditItemButton({ item }: EditItemButtonProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        className="flex-1 rounded-lg border border-[var(--border)] px-6 py-2.5 font-medium text-[var(--text)] hover:bg-[var(--accent-pale)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
      >
        Редактировать
      </button>

      {isEditing && (
        <EditItemModal item={item} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}
