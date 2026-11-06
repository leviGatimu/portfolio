"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

/**
 * Two-part cursor: an instant dot and a ring trailing on a spring. Both are
 * white under mix-blend-difference so they invert correctly on light AND
 * dark themes. Elements with [data-cursor-label] morph the ring into a
 * solid labeled pill (blend off) — used on the work gallery cards.
 */
export default function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 220, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    if (!finePointer) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setHovering(
        !!target.closest("a, button, input, textarea, [data-cursor='hover']"),
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [finePointer, mouseX, mouseY]);

  if (!finePointer) return null;

  const showPill = label !== null;

  return (
    <>
      {/* Instant dot */}
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[10000] size-2 rounded-full bg-white"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          opacity: visible && !showPill ? 1 : 0,
        }}
        animate={{ scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing ring / labeled pill */}
      <motion.div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[10000] flex items-center justify-center overflow-hidden rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: showPill ? "normal" : "difference",
          border: showPill ? "none" : "1.5px solid #ffffff",
          backgroundColor: showPill ? "var(--fg)" : "transparent",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: showPill ? 88 : 40,
          height: showPill ? 88 : 40,
          scale: pressed ? 0.8 : hovering && !showPill ? 1.7 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {showPill && (
          <motion.span
            className="mono-label text-bg"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
