/** The house curve — every timed animation on the site uses this. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Lenis scroll easing (exponential out). */
export const scrollEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
