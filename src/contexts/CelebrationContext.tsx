"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";

type CelebrationContextValue = {
  triggerCelebration: () => void;
};

const CelebrationContext = createContext<CelebrationContextValue | null>(null);

const CELEBRATION_DURATION_MS = 6000;

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  const triggerCelebration = useCallback(() => {
    setShow(false);
    setTimeout(() => setShow(true), 0);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), CELEBRATION_DURATION_MS);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <CelebrationContext.Provider value={{ triggerCelebration }}>
      {children}
      {show && <CelebrationOverlay />}
    </CelebrationContext.Provider>
  );
}

export function useCelebration() {
  const ctx = useContext(CelebrationContext);
  return ctx;
}
