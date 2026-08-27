"use client";

import { useEffect } from "react";

type DeferredAnalyticsProps = {
  measurementId: string;
};

const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

export default function DeferredAnalytics({ measurementId }: DeferredAnalyticsProps) {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));

    let loaded = false;
    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      window.gtag?.("js", new Date());
      window.gtag?.("config", measurementId, { anonymize_ip: true });
      INTERACTION_EVENTS.forEach((eventName) => window.removeEventListener(eventName, loadAnalytics));
    };

    INTERACTION_EVENTS.forEach((eventName) => window.addEventListener(eventName, loadAnalytics, { once: true, passive: true }));
    const fallbackTimer = window.setTimeout(loadAnalytics, 15000);

    return () => {
      window.clearTimeout(fallbackTimer);
      INTERACTION_EVENTS.forEach((eventName) => window.removeEventListener(eventName, loadAnalytics));
    };
  }, [measurementId]);

  return null;
}
