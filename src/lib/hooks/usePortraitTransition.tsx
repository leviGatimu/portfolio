"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PortraitTransitionContext = createContext(false);

/**
 * Tracks whether the persistent floating portrait should be visible: true
 * once Hero has scrolled above the viewport, false again once Contact
 * arrives (so it doesn't sit on top of the final CTA).
 */
export function PortraitTransitionProvider({ children }: { children: React.ReactNode }) {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    // Hide at Contact when it exists, otherwise at the footer's own back-to-top.
    const pageEnd = document.getElementById("contact") ?? document.querySelector("footer");
    if (!hero) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    const contactObserver = new IntersectionObserver(
      ([entry]) => setAtContact(entry.isIntersecting),
      { threshold: 0, rootMargin: "-10% 0px 0px 0px" },
    );

    heroObserver.observe(hero);
    if (pageEnd) contactObserver.observe(pageEnd);
    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <PortraitTransitionContext.Provider value={pastHero && !atContact}>
      {children}
    </PortraitTransitionContext.Provider>
  );
}

export const usePortraitFloating = () => useContext(PortraitTransitionContext);
