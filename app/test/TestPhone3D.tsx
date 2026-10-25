"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const screens = [1, 2, 3];

export default function TestPhone3D() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".test-experiment-page .phone-stage");
    if (!stage) return;
    const desktop = window.matchMedia("(min-width: 1000px)");
    const syncToViewport = () => {
      stage.classList.toggle("is-test-3d-ready", desktop.matches);
      setHost(desktop.matches ? stage : null);
    };
    const animationFrame = window.requestAnimationFrame(syncToViewport);
    desktop.addEventListener("change", syncToViewport);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      desktop.removeEventListener("change", syncToViewport);
      stage.classList.remove("is-test-3d-ready");
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % screens.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    const render = () => {
      current.current.x += (target.current.x - current.current.x) * 0.09;
      current.current.y += (target.current.y - current.current.y) * 0.09;
      phoneRef.current?.style.setProperty("--phone-rotate-x", `${current.current.x.toFixed(3)}deg`);
      phoneRef.current?.style.setProperty("--phone-rotate-y", `${current.current.y.toFixed(3)}deg`);
      animationFrame = window.requestAnimationFrame(render);
    };
    animationFrame = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    target.current = { x: y * -8, y: x * 12 };
  };

  const resetTilt = () => {
    target.current = { x: 0, y: 0 };
  };

  if (!host) return null;

  return createPortal(
    <div
      className="test-phone-3d"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      aria-label="Vista tridimensional interactiva de una tienda online"
    >
      <div className="test-phone-shadow" aria-hidden="true" />
      <div className="test-phone-object" ref={phoneRef}>
        <span className="test-phone-side test-phone-side--left" aria-hidden="true" />
        <span className="test-phone-side test-phone-side--right" aria-hidden="true" />
        <div className="test-phone-depth" aria-hidden="true" />
        <div className="test-phone-front">
          <div className="test-phone-screen">
            {screens.map((number, index) => (
              <img
                key={number}
                className={active === index ? "is-active" : ""}
                src={asset(`/media/shop-screen-${number}.webp`)}
                alt={active === index ? `Pantalla ${number} de la tienda online` : ""}
                aria-hidden={active !== index}
                width="460"
                height="927"
                loading="lazy"
                decoding="async"
              />
            ))}
            <span className="test-phone-glare" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="test-phone-controls" aria-label="Elegir pantalla de la tienda">
        {screens.map((number, index) => (
          <button
            key={number}
            type="button"
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Ver pantalla ${number}`}
            aria-pressed={active === index}
          />
        ))}
      </div>
    </div>,
    host,
  );
}
