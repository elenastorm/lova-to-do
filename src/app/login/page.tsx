"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Неверный пароль");
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError("Ошибка соединения");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-8 shadow-lg">
          <div className="text-center mb-6">
            <span className="text-4xl" aria-hidden>🔐</span>
            <h1 className="text-xl font-bold text-[var(--text)] mt-2">
              Ту ду лист пары
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Введите пароль для входа
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                autoFocus
                autoComplete="current-password"
                disabled={isLoading}
                className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-60"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[var(--accent)] text-white px-4 py-3 font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60"
            >
              {isLoading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
