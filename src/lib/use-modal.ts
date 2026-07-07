"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Gedeeld modal-gedrag voor alle overlays (video, galerij, plattegrond,
 * mobiel menu):
 *  - vergrendelt scroll van de achtergrond;
 *  - sluit met Escape;
 *  - houdt Tab-focus binnen de modal (focus-trap);
 *  - geeft de focus terug aan het element dat de modal opende (focus-return).
 *
 * Retourneert een ref die op de overlay-container gezet moet worden. Geef die
 * container `tabIndex={-1}` zodat er altijd een focus-fallback is.
 */
export function useModal<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onClose: () => void,
) {
  const containerRef = useRef<T>(null);
  // In een ref bewaren zodat de effect-dependency alleen `open` is en de
  // focus-return niet per render opnieuw wordt geïnitialiseerd.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => {
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusables[0] ?? container).focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !container) return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return containerRef;
}
