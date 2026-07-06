"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { navItems } from "@/lib/site";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
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
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-gold-dark"
                    : "text-ink-soft hover:text-gold-dark",
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
          className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobiel menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-line bg-cream transition-[max-height] duration-300 ease-out",
          open ? "max-h-[80vh]" : "max-h-0 border-t-0",
        )}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink-soft hover:bg-sand"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="mt-3 w-full">
            Interesse tonen
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
