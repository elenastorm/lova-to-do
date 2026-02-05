// Прогресс: сумма weight выполненных / сумма weight всех. 0/0 = 0%.
// Стадии: 0% neutral, 1–24% sad, 25–59% hopeful, 60–89% happy, 90–100% very happy

export type CatStage = "neutral" | "sad" | "hopeful" | "happy" | "very_happy";

export function getProgress(
  totalWeight: number,
  completedWeight: number
): number {
  if (totalWeight <= 0) return 0;
  return Math.round((completedWeight / totalWeight) * 100);
}

export function getCatStage(progress: number): CatStage {
  if (progress <= 0) return "neutral";
  if (progress < 25) return "sad";
  if (progress < 60) return "hopeful";
  if (progress < 90) return "happy";
  return "very_happy";
}

export const CAT_STAGE_LABELS: Record<CatStage, string> = {
  neutral: "Пока нет дел — добавьте что-нибудь",
  sad: "Мало выполнено — давайте сделаем больше!",
  hopeful: "Уже лучше, продолжайте!",
  happy: "Отлично, вы молодцы!",
  very_happy: "Вы супер! Котик счастлив",
};
