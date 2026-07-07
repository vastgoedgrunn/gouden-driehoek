import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="eyebrow text-gold-dark">404</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink">
          Pagina niet gevonden
        </h1>
        <p className="mt-3 max-w-md text-graphite">
          Deze pagina bestaat niet (meer). Ga terug naar de homepage om verder
          te kijken naar de units, kantoren en voorverkoop.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">
            Terug naar de homepage
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Neem contact op
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
