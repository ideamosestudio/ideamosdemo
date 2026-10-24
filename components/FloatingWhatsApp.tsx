"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function FloatingWhatsApp() {
  const link = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const button = link.current;
    const footer = document.querySelector(".editorial-footer");
    if (!button || !footer || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      button.hidden = entry.isIntersecting;
    }, { rootMargin: "0px 0px -80px 0px" });
    observer.observe(footer);
    return () => { observer.disconnect(); button.hidden = false; };
  }, [pathname]);
  return (
    <a
      ref={link}
      className="floating-whatsapp"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar a Ideamos por WhatsApp"
    >
      <span className="floating-whatsapp__label" aria-hidden="true">¿Hablamos?</span>
      <img src={asset("/icons/whatsapp-floating.svg")} alt="" width="682" height="683" aria-hidden="true" decoding="async" />
    </a>
  );
}
