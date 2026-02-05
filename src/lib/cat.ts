// Логика развития котиков:
// 0 выполненных: 1 котик neutral
// 1-2: 1 котик hopeful
// 3-5: 1 котик happy
// 6+: 1 котик very_happy → появляется второй котик
//   6-7: 2й котик hopeful
//   8-9: 2й котик happy
//   10+: оба котика very_happy → вокруг появляются эмодзи

export type CatStage = "neutral" | "hopeful" | "happy" | "very_happy";

export function getCatStage(completedCount: number): CatStage {
  if (completedCount <= 0) return "neutral";
  if (completedCount <= 2) return "hopeful";
  if (completedCount <= 5) return "happy";
  return "very_happy";
}

export function getSecondCatStage(completedCount: number): CatStage | null {
  if (completedCount < 6) return null; // второй котик ещё не появился
  if (completedCount <= 7) return "hopeful";
  if (completedCount <= 9) return "happy";
  return "very_happy";
}

export function hasBothCatsMaxed(completedCount: number): boolean {
  return completedCount >= 10;
}

export const CAT_STAGE_LABELS: Record<CatStage, string> = {
  neutral: "Пока ничего не выполнено — начните!",
  hopeful: "Хорошее начало, продолжайте!",
  happy: "Отлично, вы молодцы!",
  very_happy: "Котик счастлив!",
};

export const DUAL_CAT_LABELS: Record<string, string> = {
  one_max: "Первый котик счастлив! Появился друг",
  both_growing: "Котики развиваются вместе!",
  both_max: "Оба котика счастливы! Вы супер-пара!",
};
