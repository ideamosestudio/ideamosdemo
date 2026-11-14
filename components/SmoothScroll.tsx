"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(any-pointer: fine)");
    let lenis: Lenis | undefined;
    let generation = 0;

    const configure = async () => {
      const currentGeneration = ++generation;
      lenis?.destroy();
      lenis = undefined;
      if (motion.matches || !pointer.matches) return;

      const { default: LenisConstructor } = await import("lenis");
      if (currentGeneration !== generation) return;
      lenis = new LenisConstructor({
        autoRaf: true,
        smoothWheel: true,
        wheelMultiplier: 0.4,
        lerp: 0.06,
        syncTouch: false,
        anchors: true,
        allowNestedScroll: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      });
    };

    // Native scrolling remains usable if the optional enhancement cannot load.
    const safelyConfigure = () => { void configure().catch(() => {}); };
    safelyConfigure();
    motion.addEventListener("change", safelyConfigure);
    pointer.addEventListener("change", safelyConfigure);
    return () => {
      generation++;
      motion.removeEventListener("change", safelyConfigure);
      pointer.removeEventListener("change", safelyConfigure);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
