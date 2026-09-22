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

const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

export default function DeferredAnalytics({ containerId }: DeferredAnalyticsProps) {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];

    let loaded = false;
    const loadGTM = () => {
      if (loaded) return;
      loaded = true;

      window.dataLayer?.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
      document.head.appendChild(script);

      INTERACTION_EVENTS.forEach((eventName) => window.removeEventListener(eventName, loadGTM));
    };

    INTERACTION_EVENTS.forEach((eventName) => window.addEventListener(eventName, loadGTM, { once: true, passive: true }));
    const fallbackTimer = window.setTimeout(loadGTM, 15000);

    return () => {
      window.clearTimeout(fallbackTimer);
      INTERACTION_EVENTS.forEach((eventName) => window.removeEventListener(eventName, loadGTM));
    };
  }, [containerId]);

  return null;
}
