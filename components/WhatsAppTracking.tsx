"use client";

import { useEffect } from "react";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function WhatsAppTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement)?.closest?.("a");
      if (!link?.href.includes(`wa.me/${WHATSAPP_NUMBER}`)) return;
      window.gtag?.("event", "click_whatsapp", {
        event_category: "engagement",
        event_label: link.href,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
