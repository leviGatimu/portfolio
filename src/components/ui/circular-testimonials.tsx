"use client";

// Adapted from a 21st.dev component: uses this site's motion package, icons and
// colour tokens instead of react-icons, framer-motion and styled-jsx. Arrow keys
// only act while focus is inside it, so they can't hijack the rest of the page.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CircularTestimonial {
  id: string;
  name: string;
  designation: string;
  quote: string;
  image: string;
}

const AUTOPLAY_MS = 6000;
const MIN_WIDTH = 1024;
const MAX_WIDTH = 1456;
const MIN_GAP = 60;
const MAX_GAP = 86;

function gapFor(width: number) {
  if (width <= MIN_WIDTH) return MIN_GAP;
  if (width >= MAX_WIDTH) return Math.max(MIN_GAP, MAX_GAP + 0.06018 * (width - MAX_WIDTH));
  return MIN_GAP + (MAX_GAP - MIN_GAP) * ((width - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH));
}

export default function CircularTestimonials({ items }: { items: CircularTestimonial[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(MIN_WIDTH);
  const [autoplay, setAutoplay] = useState(true);
  const reduce = useReducedMotion();
  const inView = useInView(rootRef, { amount: 0.3 });
  const count = items.length;
  const current = items[active];

  useEffect(() => {
    const node = imagesRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Only advances on screen, and stops for good once someone takes control.
  useEffect(() => {
    if (!autoplay || !inView || reduce || count < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [autoplay, inView, reduce, count]);

  const go = (step: 1 | -1) => {
    setAutoplay(false);
    setActive((index) => (index + step + count) % count);
  };

  const imageStyle = (index: number): React.CSSProperties => {
    const gap = gapFor(width);
    const transition = reduce ? "none" : "all 0.8s cubic-bezier(.4,2,.3,1)";
    if (index === active) {
      return { zIndex: 3, opacity: 1, transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition };
    }
    if (index === (active - 1 + count) % count) {
      return { zIndex: 2, opacity: 1, transform: `translateX(-${gap}px) translateY(-${gap * 0.8}px) scale(0.85) rotateY(15deg)`, transition };
    }
    if (index === (active + 1) % count) {
      return { zIndex: 2, opacity: 1, transform: `translateX(${gap}px) translateY(-${gap * 0.8}px) scale(0.85) rotateY(-15deg)`, transition };
    }
    return { zIndex: 1, opacity: 0, transition };
  };

  return (
    <div
      ref={rootRef}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
      className="grid gap-12 md:grid-cols-2 md:gap-20"
    >
      <div
        ref={imagesRef}
        className="relative mx-auto mt-16 h-80 w-[min(100%,20rem)] [perspective:1000px] md:mt-20 md:h-[26rem] md:w-[min(100%,22rem)]"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            aria-hidden={index !== active}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            style={imageStyle(index)}
          >
            <Image
              src={item.image}
              alt={index === active ? item.name : ""}
              fill
              sizes="(min-width: 768px) 352px, 320px"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-10 md:pt-20">
        <div aria-live={autoplay ? "off" : "polite"} className="min-h-72 md:min-h-80">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-display text-[clamp(2rem,3.4vw,3.25rem)] text-fg">{current.name}</h3>
              <p className="mono-label mt-3 text-muted">{current.designation}</p>
              <blockquote className="mt-6 max-w-[46ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-relaxed text-fg">
                {current.quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * index }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="flex gap-3">
            {([-1, 1] as const).map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => go(step)}
                aria-label={step < 0 ? "Previous person" : "Next person"}
                className={cn(
                  "flex size-12 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:bg-accent hover:text-on-accent",
                )}
              >
                {step < 0 ? (
                  <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
