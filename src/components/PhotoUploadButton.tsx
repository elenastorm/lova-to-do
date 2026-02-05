"use client";

import { usePhotoUpload } from "@/contexts/PhotoUploadContext";

type PhotoUploadButtonProps = {
  todoItemId: string;
  todoTitle: string;
};

export function PhotoUploadButton({ todoItemId, todoTitle }: PhotoUploadButtonProps) {
  const { openUploadModal } = usePhotoUpload();

  return (
    <button
      onClick={() => openUploadModal(todoItemId, todoTitle)}
      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-pale)] transition-colors"
    >
      <span>📷</span>
      Добавить фото
    </button>
  );
}
