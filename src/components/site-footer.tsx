import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { navItems, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Hoogwaardige nieuwbouw met bedrijfsunits en kantoorruimte in{" "}
            {siteConfig.location}. Nu in de voorverkoop met{" "}
            {siteConfig.presaleDiscount}% korting.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Ontdek
          </h3>
          <ul className="mt-4 space-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center py-1 text-white/70 transition-colors hover:text-gold-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-gold-light"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-gold-light"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="text-white/60">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-gold-light transition-colors hover:text-white"
              >
                Interesse tonen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Alle rechten
            voorbehouden.
          </p>
          <p>Ontwikkeling in voorverkoop &middot; wijzigingen voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
