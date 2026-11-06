"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  ox: number; // origin
  oy: number;
  vx: number;
  vy: number;
};

type RGB = [number, number, number];

function parseColor(v: string): RGB | null {
  v = v.trim();
  if (v.startsWith("#")) {
    let hex = v.slice(1);
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex, 16);
    if (Number.isNaN(n)) return null;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = v.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r, g, b] = m[1].split(",").map((s) => parseFloat(s));
    return [r, g, b];
  }
  return null;
}

/**
 * Text as a particle field: the cursor shoves particles away, they spring
 * home. Theme-aware — particle ink is read from the CSS tokens and re-read
 * when the theme class flips; fast particles glint toward the accent.
 * Mount only on fine-pointer desktop without reduced motion.
 */
export default function ParticleText({ text }: { text: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mouse = { x: -9999, y: -9999, active: false };
    let particles: Particle[] = [];
    let gap = 6;
    let dotSize = 3;
    let raf = 0;
    let visible = true;

    let fg: RGB = [16, 16, 16];
    let accent: RGB = [85, 101, 26];

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      fg = parseColor(cs.getPropertyValue("--fg")) ?? fg;
      accent = parseColor(cs.getPropertyValue("--accent-ink")) ?? accent;
    };
    readColors();

    // Resolve the hashed next/font display family
    const probe = document.createElement("span");
    probe.style.fontFamily = "var(--font-display)";
    root.appendChild(probe);
    const fontFamily = getComputedStyle(probe).fontFamily || "sans-serif";
    root.removeChild(probe);

    const build = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sampler = document.createElement("canvas");
      sampler.width = w;
      sampler.height = h;
      const sctx = sampler.getContext("2d");
      if (!sctx) return;

      const fontSize = Math.min(w / (text.length * 0.52), h * 0.85);
      gap = Math.max(4, Math.round(fontSize / 26));
      dotSize = Math.max(1.5, gap * 0.62);

      sctx.fillStyle = "#fff";
      sctx.textAlign = "center";
      sctx.textBaseline = "middle";
      sctx.font = `${fontSize}px ${fontFamily}`;
      sctx.fillText(text, w / 2, h / 2);

      const data = sctx.getImageData(0, 0, w, h).data;
      const next: Particle[] = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const alpha = data[(y * w + x) * 4 + 3];
          if (alpha > 128) next.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
      particles = next;
    };

    const radius = 120;
    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.max(Math.hypot(dx, dy), 0.001);
          if (dist < radius) {
            const force = (radius - dist) / radius;
            p.vx -= (dx / dist) * force * 6;
            p.vy -= (dy / dist) * force * 6;
          }
        }

        p.vx += (p.ox - p.x) * 0.05;
        p.vy += (p.oy - p.y) * 0.05;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;

        const speed = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) / 8);
        const alpha = 0.3 + speed * 0.7;
        const r = Math.round(fg[0] + (accent[0] - fg[0]) * speed);
        const g = Math.round(fg[1] + (accent[1] - fg[1]) * speed);
        const b = Math.round(fg[2] + (accent[2] - fg[2]) * speed);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(p.x, p.y, dotSize, dotSize);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.active =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      mouse.x = ((e.clientX - rect.left) / rect.width) * (canvas.width / dpr);
      mouse.y = ((e.clientY - rect.top) / rect.height) * (canvas.height / dpr);
    };

    const ro = new ResizeObserver(build);
    ro.observe(root);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(root);

    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (document.fonts?.ready) document.fonts.ready.then(build);
    build();
    raf = requestAnimationFrame(render);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, [text]);

  return (
    <div ref={rootRef} aria-hidden="true" className="absolute inset-0">
      <canvas ref={canvasRef} className="pointer-events-none block" />
    </div>
  );
}
