"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type PhotoUploadModalProps = {
  todoItemId: string;
  todoTitle: string;
  isOpen: boolean;
  onClose: () => void;
};

export function PhotoUploadModal({
  todoItemId,
  todoTitle,
  isOpen,
  onClose,
}: PhotoUploadModalProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Показать превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Выберите фото");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("todoItemId", todoItemId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка загрузки");
      }

      // Успешно загружено
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="text-center mb-4">
          <span className="text-4xl">📸</span>
          <h2 className="text-lg font-semibold text-[var(--text)] mt-2">
            Добавить фото?
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Вы выполнили: <span className="font-medium">{todoTitle}</span>
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {/* Превью или кнопка выбора */}
        <div className="mb-4">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Превью"
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-sm hover:bg-white"
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--accent)] hover:bg-[var(--accent-pale)] transition-colors">
              <span className="text-3xl mb-1">🖼️</span>
              <span className="text-sm text-[var(--text-muted)]">
                Нажмите, чтобы выбрать фото
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Кнопки */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            disabled={isUploading}
            className="flex-1 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--accent-pale)] disabled:opacity-50"
          >
            Пропустить
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading || !preview}
            className="flex-1 rounded-lg bg-[var(--accent)] text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isUploading ? "Загрузка..." : "Сохранить 📸"}
          </button>
        </div>
      </div>
    </div>
  );
}
