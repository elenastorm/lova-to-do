"use client";

import { useActionState, useEffect } from "react";
import { createItem } from "@/lib/actions";

type AddItemFormProps = {
  onSuccess?: () => void;
};

export function AddItemForm({ onSuccess }: AddItemFormProps) {
  const [state, formAction] = useActionState(createItem, {});

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
    }
  }, [state?.success, onSuccess]);

  return (
    <form
      action={formAction}
      className="space-y-4"
    >
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="title" className="block text-sm text-[var(--text-muted)] mb-1">
          Название *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          placeholder="Например: Прогулка в парке"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm text-[var(--text-muted)] mb-1">
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          placeholder="Кратко опишите"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="detailsType" className="block text-sm text-[var(--text-muted)] mb-1">
            Тип ссылки
          </label>
          <select
            id="detailsType"
            name="detailsType"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="">— не выбрано —</option>
            <option value="instagram">Instagram (видео)</option>
            <option value="yandex_maps">Яндекс.Карты (локация)</option>
          </select>
        </div>
        <div>
          <label htmlFor="detailsUrl" className="block text-sm text-[var(--text-muted)] mb-1">
            Ссылка на подробности
          </label>
          <input
            id="detailsUrl"
            name="detailsUrl"
            type="url"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            placeholder="https://..."
          />
        </div>
      </div>
      <div>
        <label htmlFor="weight" className="block text-sm text-[var(--text-muted)] mb-1">
          Вес (важность) от 1 до 10 *
        </label>
        <input
          id="weight"
          name="weight"
          type="number"
          min={1}
          max={10}
          defaultValue={5}
          required
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] max-w-[8rem]"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--accent)] text-white px-6 py-2.5 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
      >
        Добавить
      </button>
    </form>
  );
}
