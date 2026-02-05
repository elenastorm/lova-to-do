// Детерминированная «случайная» эмодзи по id пункта (одинаковая при каждой загрузке)
const EMOJIS = [
  "🌸", "🌷", "🌹", "💐", "🎀", "💖", "✨", "🌟", "🦋", "🐱",
  "🍀", "🌈", "🎈", "🎀", "💕", "🌺", "🪷", "🌼", "☕", "🍪",
  "🎬", "📷", "🎵", "🎨", "📚", "🧸", "🛍️", "🍽️", "🚶", "🗺️",
];

export function getItemEmoji(id: string): string {
  let n = 0;
  for (let i = 0; i < id.length; i++) {
    n = (n * 31 + id.charCodeAt(i)) >>> 0;
  }
  return EMOJIS[n % EMOJIS.length];
}
