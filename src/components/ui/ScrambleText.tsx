"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#@$%&0123456789ACEFLT";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** total decode time in ms */
  duration?: number;
  delay?: number;
}

/**
 * Decodes text on scroll-into-view: characters flicker through random
 * glyphs and settle left-to-right, like a departures board.
 */
export default function ScrambleText({
  text,
  className,
  duration = 900,
  delay = 0,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const settled = Math.floor(t * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") {
            out += " ";
            continue;
          }
          out +=
            i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(t < 1 ? out : text);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played.current) {
            played.current = true;
            timeout = setTimeout(run, delay);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [text, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
