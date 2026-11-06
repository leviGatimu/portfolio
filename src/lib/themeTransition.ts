import { flushSync } from "react-dom";
import { EASE } from "./easing";

/**
 * The signature theme switch: the new theme wipes over the old one as a
 * circle expanding from `origin` (the toggle button, or the terminal).
 * Falls back to a quick token cross-fade when View Transitions are
 * unavailable, for reduced motion, or in hidden tabs.
 */
export async function animateThemeChange(
  nextTheme: "light" | "dark",
  setTheme: (theme: string) => void,
  origin?: { x: number; y: number },
) {
  const doc = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduce || document.hidden || !origin) {
    doc.classList.add("theme-fade");
    setTheme(nextTheme);
    window.setTimeout(() => doc.classList.remove("theme-fade"), 350);
    return;
  }

  if (doc.hasAttribute("data-vt")) return; // one transition at a time
  doc.setAttribute("data-vt", "");

  const { x, y } = origin;
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const vt = document.startViewTransition(() => {
    flushSync(() => setTheme(nextTheme));
  });

  try {
    await vt.ready;
    doc.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${r}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 650,
        easing: `cubic-bezier(${EASE.join(",")})`,
        pseudoElement: "::view-transition-new(root)",
      },
    );
    await vt.finished;
  } catch {
    // transition skipped — theme is already applied
  } finally {
    doc.removeAttribute("data-vt");
  }
}
