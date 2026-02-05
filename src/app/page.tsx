import { prisma } from "@/lib/db";
import { Cat } from "@/components/Cat";
import { AddItemModal } from "@/components/AddItemModal";
import { ItemList } from "@/components/ItemList";

export default async function HomePage() {
  const items = await prisma.todoItem.findMany({
    orderBy: { createdAt: "asc" },
  });

  const totalWeight = items.reduce((s, i) => s + i.weight, 0);
  const completedWeight = items
    .filter((i) => i.completed)
    .reduce((s, i) => s + i.weight, 0);

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
        <Cat totalWeight={totalWeight} completedWeight={completedWeight} />
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Список
          </h2>
          <AddItemModal />
        </div>
        <ItemList items={items} />
      </section>
    </main>
  );
}
