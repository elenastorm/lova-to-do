import {
  getCatStage,
  getSecondCatStage,
  hasBothCatsMaxed,
  CAT_STAGE_LABELS,
  DUAL_CAT_LABELS,
  type CatStage,
} from "@/lib/cat";

type CatProps = {
  completedCount: number;
  totalPoints: number;
};

const EMOJI: Record<CatStage, string> = {
  neutral: "😺",
  hopeful: "🙀",
  happy: "😸",
  very_happy: "😻",
};

// Фиксированный список эмодзи для декора (детерминированный порядок)
const DECOR_EMOJIS = [
  "🩷", "💕", "💗", "💖", "❤️", "😘", "💋", "🎀", "💝", "🌸",
  "💓", "💞", "✨", "🌟", "💫", "🫶", "💌", "🌷", "🍷", "💅",
  "⭐️", "🌈", "🐁", "🐀", "🐈‍⬛", "🐈", "💦", "🌹", "🧇", "🍦",
  "🎾", "🏓", "🏸",
];

// Предопределённые "случайные" позиции для эмодзи (в процентах от контейнера)
// Позиции подобраны так, чтобы не перекрывать котиков в центре
// Отступы ~10% от краёв рамки
const DECOR_POSITIONS = [
  { top: 12, left: 12 },
  { top: 70, left: 10 },
  { top: 35, left: 8 },
  { top: 85, left: 18 },
  { top: 15, left: 22 },
  { top: 55, left: 15 },
  { top: 18, left: 82 },
  { top: 72, left: 88 },
  { top: 40, left: 90 },
  { top: 88, left: 78 },
  { top: 10, left: 72 },
  { top: 58, left: 85 },
];

export function Cat({ completedCount, totalPoints }: CatProps) {
  const stage1 = getCatStage(completedCount);
  const stage2 = getSecondCatStage(completedCount);
  const bothMaxed = hasBothCatsMaxed(completedCount);

  // Определяем текст
  let statusText: string;
  if (bothMaxed) {
    statusText = DUAL_CAT_LABELS.both_max;
  } else if (stage2 !== null) {
    statusText = stage2 === "very_happy" ? DUAL_CAT_LABELS.both_max : DUAL_CAT_LABELS.one_max;
  } else {
    statusText = CAT_STAGE_LABELS[stage1];
  }

  // Эмодзи внутри рамки (когда оба котика на максимуме) - детерминированные
  const decorCount = bothMaxed ? Math.min(completedCount - 9, 12) : 0;

  return (
    <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-6 text-center relative overflow-hidden min-h-[140px]">
      {/* Декоративные эмодзи - хаотично разбросаны */}
      {decorCount > 0 && DECOR_EMOJIS.slice(0, decorCount).map((emoji, i) => {
        const pos = DECOR_POSITIONS[i % DECOR_POSITIONS.length];
        return (
          <span
            key={`decor-${i}`}
            className="absolute text-base animate-pulse pointer-events-none"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {emoji}
          </span>
        );
      })}

      {/* Котики */}
      <div className="flex items-center justify-center gap-2 mb-2 relative z-10">
        <span className="text-6xl" role="img" aria-label={stage1}>
          {EMOJI[stage1]}
        </span>
        {stage2 !== null && (
          <span className="text-6xl" role="img" aria-label={stage2}>
            {EMOJI[stage2]}
          </span>
        )}
      </div>

      <p className="text-[var(--text-muted)] text-sm mb-1 relative z-10">
        Выполнено: {completedCount} · Баллы: {totalPoints}
      </p>
      <p className="text-[var(--text)] text-sm font-medium relative z-10">
        {statusText}
      </p>
    </div>
  );
}
