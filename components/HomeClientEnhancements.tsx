"use client";

import { useEffect, useState } from "react";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const dots = [0, 1, 2];

function useRotatingIndex() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % 3), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return [active, setActive] as const;
}

export function HomeEnhancements() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll("[data-reveal]");
    const onScroll = () => root.style.setProperty("--scroll", String(window.scrollY));
    const observer = reduceMotion ? null : new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      }),
      { threshold: 0.12 },
    );

    if (reduceMotion) revealItems.forEach((element) => element.classList.add("in-view"));

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (observer) revealItems.forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return null;
}

export function WebScreenRotator() {
  const [active, setActive] = useRotatingIndex();

  return (
    <div className="screen-swap" data-reveal>
      {[1, 2, 3].map((number, index) => (
        <div key={number} className={`screen-frame ${active === index ? "active" : ""}`}>
          <img
            src={asset(`/media/screen-${number}.webp`)}
            alt={`Proyecto web ${number}`}
            width="700"
            height="531"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
      <div className="screen-dots">
        {dots.map((index) => (
          <button
            key={index}
            type="button"
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Ver pantalla ${index + 1} de diseño web`}
          />
        ))}
      </div>
    </div>
  );
}

export function ShopScreenRotator() {
  const [active, setActive] = useRotatingIndex();

  return (
    <div className="phone-stage phone-swap">
      {[1, 2, 3].map((number, index) => (
        <img
          key={number}
          className={active === index ? "active" : ""}
          src={asset(`/media/shop-screen-${number}.webp`)}
          alt={`Pantalla ${number} de tienda online desarrollada por Ideamos`}
          width="460"
          height="927"
          loading="lazy"
          decoding="async"
        />
      ))}
      <div className="screen-dots">
        {dots.map((index) => (
          <button
            key={index}
            type="button"
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Ver pantalla ${index + 1} de tienda online`}
          />
        ))}
      </div>
    </div>
  );
}

export function GoogleScreenRotator() {
  const [active, setActive] = useRotatingIndex();

  return (
    <div className="google-visual google-swap" aria-label="Proyecto web FroSZ">
      {[1, 2, 3].map((number, index) => (
        <img
          key={number}
          className={active === index ? "active" : ""}
          src={asset(`/media/frosz-screen-${number}.webp`)}
          alt={index === 0 ? "Proyecto web FroSZ desarrollado por Ideamos" : ""}
          width="700"
          height="495"
          aria-hidden={index !== 0}
          loading="lazy"
          decoding="async"
        />
      ))}
      <div className="screen-dots">
        {dots.map((index) => (
          <button
            key={index}
            type="button"
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Ver pantalla ${index + 1} de posicionamiento`}
          />
        ))}
      </div>
    </div>
  );
}
