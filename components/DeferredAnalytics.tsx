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

    // Initialize after hydration, without losing visits that leave before 15s.
    loadGTM();

  }, [containerId]);

  return null;
}
