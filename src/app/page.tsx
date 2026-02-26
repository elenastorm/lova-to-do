import Link from "next/link";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function getBuildId(): string {
  try {
    const path = join(process.cwd(), "build-id.txt");
    if (existsSync(path)) return readFileSync(path, "utf-8").trim();
  } catch {
    // ignore
  }
  return "dev";
}

export default function HomePage() {
  const buildId = getBuildId();
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center text-[var(--text-muted)]">
        <p className="mb-4">Ту ду лист пары</p>
        <Link
          href="/love"
          className="text-[var(--accent)] hover:underline font-medium"
        >
          Перейти к списку →
        </Link>
        <p className="mt-6 text-xs opacity-60">сборка: {buildId}</p>
      </div>
    </main>
  );
}
