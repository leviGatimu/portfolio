"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { stats } from "@/data/stats";
import type { Stat } from "@/data/types";

/** Full-width credibility strip — odometer numerals roll up on scroll. */
export default function StatsStrip() {
  return (
    <section aria-label="Stats" className="border-y border-border">
      <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setValue(stat.value), index * 120);
    return () => clearTimeout(t);
  }, [inView, stat.value, index]);

  return (
    <div ref={ref} className="flex flex-col gap-2 bg-bg px-6 py-12 md:px-10">
      <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none text-fg">
        <NumberFlow value={value} />
        {stat.suffix && <span className="text-accent-ink">{stat.suffix}</span>}
      </p>
      <p className="mono-label text-muted">{stat.label.toUpperCase()}</p>
    </div>
  );
}
