"use client";

import { useActionState, useEffect, useState } from "react";
import { updateItem } from "@/lib/actions";
import { WEIGHT_LEVELS, getWeightLevel } from "@/lib/weight";

type TodoItem = {
  id: string;
  title: string;
  description: string | null;
  detailsType: string | null;
  detailsUrl: string | null;
  weight: number;
};

type EditItemFormProps = {
  item: TodoItem;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function EditItemForm({ item, onSuccess, onCancel }: EditItemFormProps) {
  const [state, formAction] = useActionState(updateItem, {});
  const [weight, setWeight] = useState(item.weight);
  const currentLevel = getWeightLevel(weight);

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
    }
  }, [state?.success, onSuccess]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={item.id} />
      
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
          defaultValue={item.title}
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
          defaultValue={item.description || ""}
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
            defaultValue={item.detailsType || ""}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="">— не выбрано —</option>
            <option value="instagram">Instagram (видео)</option>
            <option value="yandex_maps">Яндекс.Карты (локация)</option>
            <option value="other">Другое</option>
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
            defaultValue={item.detailsUrl || ""}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Шкала важности */}
      <div>
        <label className="block text-sm text-[var(--text-muted)] mb-2">
          Уровень приключения *
        </label>
        
        {/* Слайдер */}
        <div className="mb-3">
          <input
            type="range"
            id="weight"
            name="weight"
            min={1}
            max={10}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-[var(--accent-pale)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1 px-1">
            {WEIGHT_LEVELS.map((level) => (
              <span
                key={level.value}
                className={`w-6 text-center ${weight === level.value ? "text-[var(--accent)] font-bold" : ""}`}
              >
                {level.value}
              </span>
            ))}
          </div>
        </div>

        {/* Карточка текущего уровня */}
        <div className="rounded-xl bg-[var(--accent-pale)] border border-[var(--border)] p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{currentLevel.emoji}</span>
            <div>
              <span className="font-medium text-[var(--text)]">
                {currentLevel.value}. {currentLevel.name}
              </span>
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-1">
            {currentLevel.description}
          </p>
          <p className="text-xs text-[var(--text-muted)] italic">
            Например: {currentLevel.example}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-[var(--accent)] text-white px-6 py-2.5 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
        >
          Сохранить
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--border)] px-6 py-2.5 font-medium text-[var(--text)] hover:bg-[var(--accent-pale)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}
