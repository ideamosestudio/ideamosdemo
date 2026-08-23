"use client";

import { useEffect, useRef } from "react";
import "../app/test/border-glow.css";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: [string, string, string];
  fillOpacity?: number;
  reveal?: boolean;
};

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: [string, string, string]) {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[COLOR_MAP[i]];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

export default function GlowCard({
  children,
  className = "",
  style,
  edgeSensitivity = 35,
  glowColor = "20 100 55",
  backgroundColor,
  borderRadius = 20,
  glowRadius = 30,
  glowIntensity = 1,
  coneSpread = 25,
  colors = ["#ff5a00", "#ff8a4d", "#ffb347"],
  fillOpacity = 0.4,
  reveal = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(Math.random() * 360);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      card.style.setProperty("--cursor-angle", `${offsetRef.current}deg`);
      return;
    }
    let raf = 0;
    const speed = 24; // degrees per second
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const angle = (offsetRef.current + elapsed * speed) % 360;
      card.style.setProperty("--cursor-angle", `${angle.toFixed(2)}deg`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return <div
    ref={cardRef}
    data-reveal={reveal ? "" : undefined}
    className={`glow-card ${className}`}
    style={{
      "--card-bg": backgroundColor,
      "--edge-sensitivity": edgeSensitivity,
      "--border-radius": `${borderRadius}px`,
      "--glow-padding": `${glowRadius}px`,
      "--cone-spread": coneSpread,
      "--fill-opacity": fillOpacity,
      ...glowVars,
      ...buildGradientVars(colors),
      ...style,
    } as React.CSSProperties}
  >
    <span className="edge-light" />
    {children}
  </div>;
}
