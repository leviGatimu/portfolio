"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { ContributionDay } from "@/lib/github";
import { EASE } from "@/lib/easing";
import { cn } from "@/lib/cn";

/** Phones show the most recent half year, so the cells stay big enough to read. */
const PHONE_WEEKS = 26;

const LEVEL_CLASS = [
  "bg-fg/[0.07]",
  "bg-accent-ink/35",
  "bg-accent-ink/55",
  "bg-accent-ink/80",
  "bg-accent-ink",
];

const dateFormat = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });

const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** Sunday-first weeks. The first week is padded so weekdays line up in rows. */
function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = Array.from({ length: asDate(days[0].date).getUTCDay() }, () => null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

/** A month's name goes on the first week starting in it, unless it would be clipped at either end. */
function monthLabel(weeks: (ContributionDay | null)[][], index: number) {
  const first = weeks[index].find(Boolean);
  if (!first || index === 0 || index > weeks.length - 3) return null;
  const previous = weeks[index - 1].find(Boolean);
  if (!previous || asDate(first.date).getUTCMonth() === asDate(previous.date).getUTCMonth()) return null;
  return monthFormat.format(asDate(first.date));
}

export default function ContributionGraph({ days, total }: { days: ContributionDay[]; total: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);
  // Watched on the wrapper: the graph itself starts fully clipped, so it would never count as in view.
  const inView = useInView(hostRef, { once: true, amount: 0.3 });
  const weeks = toWeeks(days);

  const showTip = (event: React.PointerEvent<HTMLDivElement>) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>("[data-tip]");
    const host = hostRef.current;
    if (!cell || !host) {
      setTip(null);
      return;
    }
    const cellBox = cell.getBoundingClientRect();
    const hostBox = host.getBoundingClientRect();
    setTip({
      text: cell.dataset.tip ?? "",
      // Kept inside the graph so the label never runs off the edge of the screen.
      x: Math.min(Math.max(cellBox.left - hostBox.left + cellBox.width / 2, 90), hostBox.width - 90),
      y: cellBox.top - hostBox.top,
    });
  };

  return (
    <div ref={hostRef} className="relative" onPointerOver={showTip} onPointerLeave={() => setTip(null)}>
      {/* One wipe across the year, on first sight. Announced as a summary, not 370 cells. */}
      <motion.div
        role="img"
        aria-label={`${total} GitHub contributions in the last year.`}
        className="flex gap-[3px] md:gap-1"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
      >
        {weeks.map((week, index) => {
          const label = monthLabel(weeks, index);
          return (
            <div
              key={week.find(Boolean)?.date ?? index}
              className={cn("min-w-0 flex-1", index < weeks.length - PHONE_WEEKS && "hidden md:block")}
            >
              <p className="mono-label mb-2 h-4 whitespace-nowrap text-[0.65rem] text-muted">{label}</p>
              <div className="grid gap-[3px] md:gap-1">
                {Array.from({ length: 7 }, (_, row) => {
                  const day = week[row];
                  return day ? (
                    <div
                      key={day.date}
                      data-tip={`${day.count === 0 ? "No" : day.count} contribution${day.count === 1 ? "" : "s"} · ${dateFormat.format(asDate(day.date))}`}
                      className={cn("aspect-square rounded-[2px]", LEVEL_CLASS[day.level] ?? LEVEL_CLASS[0])}
                    />
                  ) : (
                    <div key={row} className="aspect-square" />
                  );
                })}
              </div>
            </div>
          );
        })}
      </motion.div>

      <div
        aria-hidden="true"
        className={cn(
          "mono-label pointer-events-none absolute left-0 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+6px)] whitespace-nowrap bg-fg px-2 py-1 text-[0.65rem] text-bg transition-opacity duration-150",
          tip ? "opacity-100" : "opacity-0",
        )}
        style={tip ? { left: tip.x, top: tip.y } : undefined}
      >
        {tip?.text}
      </div>
    </div>
  );
}
