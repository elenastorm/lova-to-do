"use client";

import { useState, useCallback } from "react";
import { AddItemForm } from "./AddItemForm";

export function AddItemModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)] text-white text-xl font-light flex items-center justify-center hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)] transition-opacity"
        aria-label="Добавить пункт"
      >
        +
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-item-title"
        >
          <div
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 id="add-item-title" className="text-lg font-semibold text-[var(--text)]">
                  Новый пункт
                </h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg text-[var(--text-muted)] hover:bg-[var(--accent-pale)] flex items-center justify-center"
                  aria-label="Закрыть"
                >
                  ×
                </button>
              </div>
              <AddItemForm key={isOpen ? "open" : "closed"} onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
