"use client";

import { MouseEvent, useCallback, useEffect, useId, useRef, useState } from "react";

type MobileMenuItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  items: MobileMenuItem[];
  logoSrc: string;
};

type MenuPhase = "closed" | "open" | "closing";

const ANIMATION_MS = 560;

export default function MobileMenu({ items, logoSrc }: MobileMenuProps) {
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const generatedId = useId();
  const menuId = `mobile-menu-${generatedId.replace(/:/g, "")}`;
  const isVisible = phase !== "closed";
  const isOpen = phase === "open";

  const animationDuration = useCallback(() => (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ANIMATION_MS
  ), []);

  const finishClose = useCallback((restoreFocus = true) => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    setPhase((current) => current === "closed" ? current : "closing");
    if (restoreFocus) buttonRef.current?.focus({ preventScroll: true });
    closeTimerRef.current = window.setTimeout(() => {
      setPhase("closed");
      closeTimerRef.current = null;
    }, animationDuration());
  }, [animationDuration]);

  const toggleMenu = () => {
    if (phase === "open") {
      finishClose();
      return;
    }
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    setPhase("open");
  };

  const navigateAfterClose = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    finishClose(false);
    window.setTimeout(() => window.location.assign(href), animationDuration());
  };

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.add("mobile-menu-locked");
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finishClose();
        return;
      }
      if (event.key !== "Tab" || phase !== "open") return;

      const links = Array.from(overlayRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []);
      const focusable = [buttonRef.current, ...links].filter((element): element is HTMLElement => Boolean(element));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("mobile-menu-locked");
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [finishClose, isVisible, phase]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = window.requestAnimationFrame(() => {
      overlayRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1401px)");
    const resetOnDesktop = () => {
      if (!desktop.matches) return;
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
      setPhase("closed");
    };
    desktop.addEventListener("change", resetOnDesktop);
    return () => {
      desktop.removeEventListener("change", resetOnDesktop);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  return <>
    <button
      ref={buttonRef}
      className={`menu mobile-menu-toggle ${isOpen ? "is-open" : ""}`}
      type="button"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isOpen}
      aria-controls={menuId}
      onClick={toggleMenu}
    >
      <span /><span /><span />
    </button>

    <div
      ref={overlayRef}
      id={menuId}
      className={`mobile-menu-overlay is-${phase}`}
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
      aria-label="Menú de navegación"
      aria-hidden={phase === "closed"}
    >
      <div className="mobile-menu-grid" aria-hidden="true" />
      <div className="mobile-menu-orbit" aria-hidden="true"><i /><i /></div>
      <div className="mobile-menu-top">
        <img src={logoSrc} alt="Ideamos" />
        <span>MENÚ</span>
      </div>

      <nav className="mobile-menu-nav" aria-label="Navegación mobile">
        <ol>
          {items.map((item, index) => <li key={item.href} style={{ "--menu-index": index } as React.CSSProperties}>
            <a href={item.href} onClick={(event) => navigateAfterClose(event, item.href)}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{item.label}</span>
            </a>
          </li>)}
        </ol>
      </nav>

      <div className="mobile-menu-foot" aria-hidden="true">
        <span>DISEÑO WEB &amp; MARKETING DIGITAL</span>
        <i />
        <span>MÁS ESTRATEGIA, MÁS RESULTADOS</span>
      </div>
    </div>
  </>;
}
