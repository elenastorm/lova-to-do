import { getCatStage, getProgress, CAT_STAGE_LABELS, type CatStage } from "@/lib/cat";

type CatProps = {
  totalWeight: number;
  completedWeight: number;
};

const EMOJI: Record<CatStage, string> = {
  neutral: "😺",
  sad: "😿",
  hopeful: "🙀",
  happy: "😸",
  very_happy: "😻",
};

export function Cat({ totalWeight, completedWeight }: CatProps) {
  const progress = getProgress(totalWeight, completedWeight);
  const stage = getCatStage(progress);

  return (
    <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-6 text-center">
      <div className="text-6xl mb-2" role="img" aria-label={stage}>
        {EMOJI[stage]}
      </div>
      <p className="text-[var(--text-muted)] text-sm mb-1">
        Прогресс: {progress}%
      </p>
      <p className="text-[var(--text)] text-sm font-medium">
        {CAT_STAGE_LABELS[stage]}
      </p>
    </div>
  );
}
