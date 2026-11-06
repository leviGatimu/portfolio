"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import { scrollEase } from "@/lib/easing";
import { PortraitTransitionProvider } from "@/lib/hooks/usePortraitTransition";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={{ duration: 1.1, easing: scrollEase }}>
          <PortraitTransitionProvider>{children}</PortraitTransitionProvider>
        </ReactLenis>
      </MotionConfig>
    </ThemeProvider>
  );
}
