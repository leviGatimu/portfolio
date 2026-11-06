"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { terminalOutputs } from "@/data/terminal";
import { site } from "@/data/site";
import { animateThemeChange } from "@/lib/themeTransition";

type Line = {
  id: number;
  kind: "input" | "output" | "accent";
  text: string;
};

const PROMPT = "levi@kigali:~$";
let lineId = 0;
const mkLine = (kind: Line["kind"], text: string): Line => ({
  id: lineId++,
  kind,
  text,
});

/**
 * A working shell, played straight: window chrome in theme tokens, output
 * scrolls inside (Lenis excluded), focus only on click. `theme light` fires
 * the signature circular transition from the terminal's own center.
 */
export default function TerminalSection() {
  const { setTheme } = useTheme();
  const reduce = useReducedMotion();
  const windowRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState("");
  const [flying, setFlying] = useState(false);
  const autoPlayed = useRef(false);
  const inView = useInView(windowRef, { once: true, margin: "-20%" });

  const push = (kind: Line["kind"], texts: string[]) =>
    setLines((prev) => [...prev, ...texts.map((t) => mkLine(kind, t))]);

  // Auto-type `whoami` once the terminal scrolls into view
  useEffect(() => {
    if (!inView || autoPlayed.current) return;
    autoPlayed.current = true;

    const finish = () => {
      setTyping("");
      setLines((prev) => [
        ...prev,
        mkLine("input", "whoami"),
        ...terminalOutputs.whoami.map((t) => mkLine("output", t)),
      ]);
    };

    if (reduce) {
      finish();
      return;
    }

    const cmd = "whoami";
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyping(cmd.slice(0, i));
      if (i === cmd.length) {
        clearInterval(t);
        setTimeout(finish, 300);
      }
    }, 110);
    return () => clearInterval(t);
  }, [inView, reduce]);

  // Keep the scrollback pinned to the newest line
  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [lines, typing]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();
    push("input", [cmd]);
    if (!cmd) return;

    if (lower === "clear") {
      setLines([]);
      return;
    }

    if (lower === "theme" || lower.startsWith("theme ")) {
      const arg = lower.split(/\s+/)[1];
      if (arg === "light" || arg === "dark") {
        const rect = windowRef.current?.getBoundingClientRect();
        const origin = rect
          ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
          : undefined;
        animateThemeChange(arg, setTheme, origin);
        push("accent", [`theme set to ${arg} — smooth, right?`]);
      } else {
        push("output", ["usage: theme light | theme dark"]);
      }
      return;
    }

    if (lower === "sudo hire-me" || lower === "sudo hire me") {
      push("accent", ["ACCESS GRANTED — opening a channel..."]);
      setTimeout(() => {
        window.location.href = `mailto:${site.email}?subject=Let's work together`;
      }, 700);
      return;
    }

    if (lower === "fly") {
      push("output", ["✈ cleared for takeoff"]);
      if (!reduce) {
        setFlying(true);
        setTimeout(() => setFlying(false), 2400);
      }
      return;
    }

    const output = terminalOutputs[lower];
    if (output) push("output", output);
    else push("output", [`command not found: ${cmd} — try 'help'`]);
  };

  return (
    <section id="terminal" className="px-6 py-28 md:px-10 md:py-36">
      <motion.p
        className="mono-label text-accent-ink"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
      >
        [05] — FOR THE CURIOUS
      </motion.p>
      <motion.p
        className="mt-4 max-w-md text-sm leading-relaxed text-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        There&apos;s a shell. It answers questions. Try{" "}
        <span className="text-accent-ink">help</span>.
      </motion.p>

      <motion.div
        ref={windowRef}
        onClick={() => inputRef.current?.focus()}
        className="relative mx-auto mt-12 max-w-3xl cursor-text overflow-hidden border border-border bg-surface"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-muted/40" />
            <span className="size-2.5 rounded-full bg-muted/40" />
            <span className="size-2.5 rounded-full bg-muted/40" />
          </span>
          <span className="mono-label text-muted">levi — zsh</span>
          <span className="mono-label text-muted">80×24</span>
        </div>

        {/* Scrollback — Lenis keeps its hands off */}
        <div
          ref={bodyRef}
          data-lenis-prevent
          className="h-80 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
          aria-live="polite"
        >
          {lines.map((line) => (
            <p
              key={line.id}
              className={
                line.kind === "input"
                  ? "text-fg"
                  : line.kind === "accent"
                    ? "text-accent-ink"
                    : "text-muted"
              }
            >
              {line.kind === "input" && (
                <span className="mr-2 text-accent-ink">{PROMPT}</span>
              )}
              <span className="whitespace-pre-wrap">{line.text}</span>
            </p>
          ))}

          {/* Live prompt */}
          <p className="flex items-center text-fg">
            <span className="mr-2 shrink-0 text-accent-ink">{PROMPT}</span>
            {typing ? (
              <span>
                {typing}
                <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-accent-ink" />
              </span>
            ) : (
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    run(value);
                    setValue("");
                  }
                }}
                aria-label="Terminal input"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-fg caret-accent-ink outline-none"
              />
            )}
          </p>
        </div>

        {/* The one survivor */}
        {flying && (
          <motion.span
            className="pointer-events-none absolute top-1/2 z-10 text-xl"
            initial={{ x: "-10vw", y: 0, rotate: 8 }}
            animate={{ x: "110vw", y: [-6, 6, -6] }}
            transition={{ duration: 2.2, ease: "linear" }}
            aria-hidden="true"
          >
            ✈
          </motion.span>
        )}
      </motion.div>
    </section>
  );
}
