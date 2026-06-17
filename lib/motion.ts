/** Costanti di motion condivise (Fase 2). Easing/durate coerenti su tutto il sito. */

/** Expo-out: parte veloce, "atterra" morbido. L'easing principale del sito. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

/** Spring "snappy" per ricomposizione/magnetici. */
export const SPRING_SNAP = { type: "spring", stiffness: 320, damping: 22, mass: 0.6 } as const;
