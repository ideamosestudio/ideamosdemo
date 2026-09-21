"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(any-pointer: fine)");
    let lenis: Lenis | undefined;

    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      if (motion.matches || !pointer.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        wheelMultiplier: 0.65,
        lerp: 0.075,
        syncTouch: false,
        anchors: true,
        allowNestedScroll: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      });
    };

    configure();
    motion.addEventListener("change", configure);
    pointer.addEventListener("change", configure);
    return () => {
      motion.removeEventListener("change", configure);
      pointer.removeEventListener("change", configure);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
