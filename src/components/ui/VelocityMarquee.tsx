"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/cn";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface VelocityMarqueeProps {
  text: string;
  /** %/s drift when idle; negative reverses direction */
  baseVelocity?: number;
  className?: string;
}

/**
 * Infinite marquee that reacts to scroll: scrolling faster accelerates and
 * skews the text; scrolling up reverses its direction.
 */
export default function VelocityMarquee({
  text,
  baseVelocity = 2,
  className,
}: VelocityMarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-1500, 1500], ["8deg", "-8deg"]);

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div
      className={cn("overflow-hidden whitespace-nowrap py-6", className)}
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max will-change-transform"
        style={reduce ? undefined : { x, skewX }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "font-display pr-6 text-[clamp(3.5rem,9vw,8rem)] leading-none",
              i % 2 === 0 ? "text-outline" : "text-fg",
            )}
          >
            {text}&nbsp;✕&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}
