"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Voegt automatisch een 'is-visible' class toe aan alle .reveal-elementen
 * zodra ze in beeld scrollen (subtiele, smooth reveals).
 *
 * Belangrijk: content kan LATER binnenkomen dan het moment waarop deze
 * provider mount. Denk aan een Suspense/loading-fallback (zie (site)/loading.tsx)
 * die bij trage data eerst een skeleton toont en pas daarna de echte pagina.
 * Daarom observeren we niet één keer een vaste set, maar houden we met een
 * MutationObserver ook nieuw toegevoegde .reveal-elementen in de gaten. Zo
 * blijft er nooit content permanent verborgen (geen "blanco pagina").
 */
export function RevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noIO = typeof IntersectionObserver === "undefined";

    // Fail-safe: zonder IntersectionObserver of met reduced-motion tonen we
    // alles direct — ook content die later binnenstroomt.
    if (prefersReduced || noIO) {
      const revealAll = () =>
        document
          .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
          .forEach((el) => el.classList.add("is-visible"));
      revealAll();
      const mo = new MutationObserver(revealAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const observeNew = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));
    };

    observeNew();

    // Nieuw toegevoegde .reveal-elementen (bv. na een Suspense-fallback of
    // client-side content-swap) alsnog observeren. Gedebounced met rAF.
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(observeNew);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
