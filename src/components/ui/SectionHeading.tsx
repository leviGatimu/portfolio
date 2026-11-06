"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import MaskReveal from "./MaskReveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  className?: string;
  /** "lg" opens a section; "md" fits inside pinned viewports */
  size?: "lg" | "md";
}

/** Shared section rhythm: bracketed mono index + oversized display title. */
export default function SectionHeading({
  index,
  label,
  title,
  className,
  size = "lg",
}: SectionHeadingProps) {
  return (
    <div className={cn(size === "lg" && "mb-16 md:mb-20", className)}>
      <motion.p
        className="mono-label text-accent-ink"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
      >
        [{index}] — {label}
      </motion.p>
      <h2
        className={cn(
          "font-display mt-4 text-fg",
          size === "lg"
            ? "text-[clamp(2.75rem,7vw,6rem)]"
            : "text-[clamp(2rem,4vw,3.25rem)]",
        )}
      >
        <MaskReveal text={title.toUpperCase()} stagger={0.03} />
      </h2>
    </div>
  );
}
