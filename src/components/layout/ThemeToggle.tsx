"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { animateThemeChange } from "@/lib/themeTransition";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  const onToggle = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : undefined;
    animateThemeChange(next, setTheme, origin);
  };

  return (
    <button
      ref={btnRef}
      onClick={onToggle}
      aria-label={mounted ? `Switch to ${next} theme` : "Switch theme"}
      className="flex size-9 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-fg"
    >
      {mounted ? (
        isDark ? (
          <Sun size={15} strokeWidth={1.5} />
        ) : (
          <Moon size={15} strokeWidth={1.5} />
        )
      ) : (
        <span className="size-[15px] rounded-full border border-current opacity-40" />
      )}
    </button>
  );
}
