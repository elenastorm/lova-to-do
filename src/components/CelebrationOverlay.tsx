"use client";

import { useMemo } from "react";

const EMOJIS = [
  "🩷", "💕", "💗", "💖", "❤️", "😘", "💋", "🎀", "💝", "🌸",
  "💓", "💞", "😍", "🥰", "✨", "🌟", "💫", "🫶", "💌", "🌷",
  "🍷", "💅", "⭐️", "🌈", "🐁", "🐀", "🐈‍⬛", "🐈", "💦", "🌹",
  "🧇", "🍦", "🎾", "🏓", "🏸",
];
const COUNT = 48;

function rnd(max: number) {
  return Math.random() * max;
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function CelebrationOverlay() {
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      emoji: pick(EMOJIS),
      left: rnd(100),
      delay: rnd(0.6),
      duration: 2.5 + rnd(2),
      size: 44 + rnd(44),
      axis: i % 3 === 0 ? "up" : i % 3 === 1 ? "diag" : "across",
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="celebration-emoji absolute animate-celebration-fly"
          data-axis={p.axis}
          style={{
            left: `${p.left}%`,
            top: "100%",
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
