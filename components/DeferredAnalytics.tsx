"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type DeferredAnalyticsProps = {
  containerId: string;
};

export default function DeferredAnalytics({ containerId }: DeferredAnalyticsProps) {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];

    const loadGTM = () => {
      if (document.getElementById("ideamos-gtm")) return;

      window.dataLayer?.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

      const script = document.createElement("script");
      script.id = "ideamos-gtm";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
      document.head.appendChild(script);

    };

    // Avoid competing with the first render; never wait 15 seconds for a visit.
    const onInteraction = () => loadGTM();
    window.addEventListener("pointerdown", onInteraction, { once: true, passive: true });
    window.addEventListener("keydown", onInteraction, { once: true });
    const idle = "requestIdleCallback" in window
      ? window.requestIdleCallback(loadGTM, { timeout: 1500 })
      : undefined;
    const fallback = window.setTimeout(loadGTM, 1500);

    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.clearTimeout(fallback);
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
    };
  }, [containerId]);

  return null;
}
