/**
 * Fixed film-grain overlay. Reads --grain-opacity / --grain-blend from the
 * theme tokens: multiply on light ("paper tooth"), normal on dark ("film").
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9990]"
      style={{
        opacity: "var(--grain-opacity)",
        mixBlendMode: "var(--grain-blend)" as React.CSSProperties["mixBlendMode"],
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
  );
}
