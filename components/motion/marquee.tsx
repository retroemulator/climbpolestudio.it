"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

/** wrap(min,max,v): mantiene v ciclicamente nell'intervallo da min a max. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

/**
 * Marquee reattivo alla VELOCITÀ di scroll (brief §2): scorre lento da solo,
 * accelera e inverte direzione con lo scroll. Con reduced-motion: riga statica.
 */
export function Marquee({
  children,
  baseVelocity = 2,
  className,
  repeat = 4,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
  repeat?: number;
}) {
  const reduced = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  if (reduced) {
    return (
      <div className={`overflow-hidden ${className ?? ""}`} role="presentation">
        <div className="flex whitespace-nowrap">{children}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className ?? ""}`} role="presentation">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
