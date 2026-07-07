"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/site";
import { useModal } from "@/lib/use-modal";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-lock, Escape, focus-trap en focus-return voor het mobiele menu.
  const menuRef = useModal(open, () => setOpen(false));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-cream/90 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-line shadow-sm shadow-ink/5" : "border-line/60",
        )}
      >
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Link href="/" aria-label="Naar home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={cn(
                  "nav-underline rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-gold-dark" : "text-ink-soft hover:text-gold-dark",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact" size="sm">
            Interesse tonen
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2.5 text-ink transition-colors lg:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </header>

      {/* Mobiel menu — fullscreen overlay, schuift van rechts naar links.
          Staat bewust BUITEN <header>: die heeft backdrop-blur en zou anders
          het containing block worden voor dit fixed-overlay. */}
      <div
        ref={menuRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Hoofdmenu"
        className={cn(
          "fixed inset-0 z-[65] flex flex-col bg-cream outline-none lg:hidden",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        {/* Goud accent bovenrand */}
        <div
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-light via-gold to-gold-dark"
          aria-hidden
        />

        <div className="container-x flex h-18 shrink-0 items-center justify-between py-3">
          <Link href="/" aria-label="Naar home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menu sluiten"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2.5 text-ink"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="container-x flex flex-1 flex-col justify-center gap-1">
          {navItems.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                className={cn(
                  "flex items-center justify-between border-b border-line/70 py-4 font-display text-2xl font-bold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  active ? "text-gold-dark" : "text-ink",
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                )}
              >
                {item.label}
                <ArrowUpRight
                  className={cn("h-5 w-5", active ? "text-gold-dark" : "text-mist")}
                />
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            "container-x shrink-0 space-y-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
          style={{ transitionDelay: open ? `${120 + navItems.length * 55}ms` : "0ms" }}
        >
          <ButtonLink href="/contact" size="lg" className="w-full" onClick={() => setOpen(false)}>
            Interesse tonen
          </ButtonLink>
          <p className="text-center text-sm text-graphite">
            {siteConfig.location} · Voorverkoop met {siteConfig.presaleDiscount}% korting
          </p>
        </div>
      </div>
    </>
  );
}
