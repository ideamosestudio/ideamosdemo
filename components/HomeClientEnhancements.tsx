"use client";

import { useEffect, useRef, useState } from "react";
import { observeVisibleActivity } from "../lib/visible-activity";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const dots = [0, 1, 2];

function useRotatingIndex() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let timer: number | undefined;
    return observeVisibleActivity(ref.current, visible => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = visible ? window.setInterval(() => setActive(value => (value + 1) % 3), 2200) : undefined;
    });
  }, []);

  return [active, setActive, ref] as const;
}

export function HomeEnhancements() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll("[data-reveal]");
    const premiumSection = document.querySelector<HTMLElement>(".test-page .statement[data-premium-reveal]");
    let parallaxFrame = 0;

    const updatePremiumParallax = () => {
      parallaxFrame = 0;
      if (!premiumSection || reduceMotion) return;
      const bounds = premiumSection.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = bounds.top + bounds.height / 2;
      const offset = Math.max(-10, Math.min(10, (viewportCenter - sectionCenter) * .018));
      premiumSection.style.setProperty("--premium-parallax", `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      root.style.setProperty("--scroll", String(window.scrollY));
      if (premiumSection && !reduceMotion && parallaxFrame === 0) {
        parallaxFrame = window.requestAnimationFrame(updatePremiumParallax);
      }
    };
    const observer = reduceMotion ? null : new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      }),
      { threshold: 0.12 },
    );
    const premiumObserver = !premiumSection || reduceMotion ? null : new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        premiumSection.classList.add("is-premium-visible");
        premiumObserver?.disconnect();
      },
      { threshold: 0.25, rootMargin: "0px 0px -10%" },
    );

    if (reduceMotion) revealItems.forEach((element) => element.classList.add("in-view"));
    if (premiumSection && reduceMotion) premiumSection.classList.add("is-premium-visible");

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (observer) revealItems.forEach((element) => observer.observe(element));
    if (premiumObserver && premiumSection) premiumObserver.observe(premiumSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (parallaxFrame !== 0) window.cancelAnimationFrame(parallaxFrame);
      observer?.disconnect();
      premiumObserver?.disconnect();
    };
  }, []);

  return null;
}

export function WebScreenRotator() {
  const [active, setActive, ref] = useRotatingIndex();

  return (
    <div ref={ref} className="screen-swap" data-reveal>
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
  const [active, setActive, ref] = useRotatingIndex();

  return (
    <div ref={ref} className="phone-stage phone-swap">
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
  const [active, setActive, ref] = useRotatingIndex();

  return (
    <div ref={ref} className="google-visual google-swap" aria-label="Proyecto web FroSZ">
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
