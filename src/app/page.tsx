import { prisma } from "@/lib/db";
import { Cat } from "@/components/Cat";
import { AddItemModal } from "@/components/AddItemModal";
import { ItemList } from "@/components/ItemList";

// Отключаем кэширование — страница всегда показывает актуальные данные из БД
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const items = await prisma.todoItem.findMany({
    orderBy: { createdAt: "asc" },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completed = items.filter((i: any) => i.completed);
  const completedCount = completed.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalPoints = completed.reduce((sum: number, item: any) => sum + item.weight, 0);

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
          Ту ду лист пары
        </h1>
        <p className="text-[var(--text-muted)] mt-1">
          Выполняйте дела — котик станет счастливее
        </p>
      </header>

      <section className="mb-8">
        <Cat completedCount={completedCount} totalPoints={totalPoints} />
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Список
          </h2>
          <AddItemModal />
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ItemList items={items.map((i: any) => ({
          id: i.id,
          title: i.title,
          weight: i.weight,
          completed: i.completed,
          createdAt: i.createdAt,
        }))} />
      </section>
    </main>
  );
}
