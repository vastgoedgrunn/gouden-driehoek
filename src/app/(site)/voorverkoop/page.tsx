import type { Metadata } from "next";
import { BadgePercent, CalendarClock, KeyRound, ListChecks } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ButtonLink } from "@/components/ui/button";
import { getSiteContent } from "@/lib/data";
import { parseDiscount } from "@/lib/format";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Voorverkoop",
  description:
    "Profiteer van de voorverkoop van De Gouden Driehoek met 10% korting en de meeste keuze in units en indeling.",
  alternates: { canonical: "/voorverkoop" },
};

export default async function VoorverkoopPage() {
  const content = await getSiteContent();
  const discount = parseDiscount(content.presale_discount);

  return (
    <>
      <PageHero
        eyebrow="Voorverkoop"
        title={`Nu instappen met ${discount}% korting`}
        intro="Als je er vroeg bij bent, profiteer je van het scherpste tarief én heb je de meeste keuze in units, kantoren en indeling."
        actions={
          <ButtonLink href="/contact">
            Toon je interesse
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <Section>
        <h2 className="sr-only">Voordelen van de voorverkoop</h2>
        <div className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={<BadgePercent className="h-6 w-6" />} title={`${discount}% korting`} text="Het voordeligste tarief geldt uitsluitend tijdens de voorverkoop." />
          <FeatureCard icon={<ListChecks className="h-6 w-6" />} title="Meeste keuze" text="Kies als eerste je favoriete unit of kantoor op de beste plek." />
          <FeatureCard icon={<KeyRound className="h-6 w-6" />} title="Inspraak in indeling" text="De kantoorlaag is vrij indeelbaar — stem hem af op jouw wensen." />
          <FeatureCard icon={<CalendarClock className="h-6 w-6" />} title="Vroeg zekerheid" text="Leg nu je plek vast en bouw mee aan De Gouden Driehoek." />
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Hoe werkt het"
          title="In drie stappen"
          intro="Van eerste interesse tot vastlegging — we begeleiden je persoonlijk."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <Step n={1} title="Toon je interesse" text="Laat je gegevens achter en geef aan waar je naar op zoek bent." />
          <Step n={2} title="Persoonlijk gesprek" text="We bespreken de mogelijkheden, indeling, oppervlakte en prijs." />
          <Step n={3} title="Vastleggen" text="Je legt je unit of kantoor vast tegen het voorverkooptarief." />
        </ol>
      </Section>

      <Section>
        <div className="reveal flex flex-col items-center gap-6 rounded-3xl bg-ink px-8 py-14 text-center text-white">
          <div className="flex items-center justify-center gap-2">
            <span className="tri-marker" aria-hidden />
            <span className="eyebrow text-gold-light">Blijf op de hoogte</span>
          </div>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
            Ontvang updates over de voorverkoop
          </h2>
          <p className="max-w-xl text-white/80">
            We houden je op de hoogte van beschikbaarheid, prijzen en planning.
          </p>
          <NewsletterForm dark />
          <ButtonLink href="/contact" variant="light">
            Direct interesse tonen
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="reveal card-lift rounded-2xl border border-line bg-cream p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-white">
        {n}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-graphite">{text}</p>
    </li>
  );
}
