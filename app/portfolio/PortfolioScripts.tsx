"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function PortfolioScripts() {
  const [projectsReady, setProjectsReady] = useState(false);
  const [uiReady, setUiReady] = useState(false);
  const [nearCatalogue, setNearCatalogue] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    const catalogue = document.querySelector("#trabajos");
    if (!catalogue || !("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setNearCatalogue(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setNearCatalogue(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px" });
    observer.observe(catalogue);
    return () => observer.disconnect();
  }, []);

  if (!nearCatalogue) return null;

  return <>
    <Script src={`${base}/portfolio/projects.js`} strategy="afterInteractive" onReady={() => setProjectsReady(true)} />
    <Script src={`${base}/portfolio/project-card.js`} strategy="afterInteractive" onReady={() => setUiReady(true)} />
    {projectsReady && uiReady && <Script src={`${base}/portfolio/gallery.js`} strategy="afterInteractive" />}
  </>;
}
