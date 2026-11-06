"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/easing";
import { cn } from "@/lib/cn";

interface PortraitGlitchProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Show the photo in color at rest instead of fading to color on hover. */
  fullColor?: boolean;
}

/**
 * Grayscale at rest, crossfades to full color with a soft accent glow on
 * hover. Kept deliberately simple — no scanlines or offset layers.
 */
export default function PortraitGlitch({
  src,
  alt,
  className,
  sizes = "(min-width: 768px) 980px, 90vw",
  priority = true,
  fullColor = false,
}: PortraitGlitchProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-contain transition-[filter] duration-500",
            !fullColor && "grayscale hover:grayscale-0",
          )}
        />
      </div>
    );
  }

  return (
    <motion.div className={cn("relative h-full w-full", className)} initial="rest" whileHover="hover">
      {/* Soft accent glow blooming in behind on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        variants={{ rest: { opacity: 0, scale: 0.9 }, hover: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
          filter: "blur(24px)",
        }}
      />

      <motion.div
        className="relative h-full w-full"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain"
        />
        {!fullColor && (
          <motion.div
            className="absolute inset-0"
            variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Image
              src={src}
              alt=""
              aria-hidden="true"
              fill
              sizes={sizes}
              className="object-contain grayscale"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
