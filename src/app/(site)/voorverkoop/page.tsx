import type { Metadata } from "next";
import {
  ArrowRight,
  BadgePercent,
  CalendarClock,
  ChevronDown,
  KeyRound,
  ListChecks,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ButtonLink } from "@/components/ui/button";
import { getSiteContent, getUnits, formatPrice } from "@/lib/data";
import { parseDiscount, presalePrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Voorverkoop",
  description:
    "Profiteer van de voorverkoop van De Gouden Driehoek met 10% korting en de meeste keuze in units en combinaties.",
  alternates: { canonical: "/voorverkoop" },
};

export default async function VoorverkoopPage() {
  const [content, units] = await Promise.all([getSiteContent(), getUnits()]);
  const discount = parseDiscount(content.presale_discount);

  const bedrijfsunits = units.filter((u) => u.type === "bedrijfsunit");
  const beschikbaar = bedrijfsunits.filter((u) => u.status === "beschikbaar").length;
  const totaal = bedrijfsunits.length;

  const prijzen = bedrijfsunits.filter((u) => u.prijs_vanaf).map((u) => Number(u.prijs_vanaf));
  const minBedrijf = prijzen.length ? Math.min(...prijzen) : null;
  const voorverkoopMin = presalePrice(minBedrijf, discount);
  const voordeel =
    minBedrijf != null && voorverkoopMin != null ? minBedrijf - voorverkoopMin : null;

  return (
    <>
      <PageHero
        eyebrow="Voorverkoop"
        title={`Nu instappen met ${discount}% korting`}
        intro="Als je er vroeg bij bent, profiteer je van het scherpste tarief én heb je de meeste keuze in units, kantoren en combinaties."
        actions={
          <ButtonLink href="/contact">
            Toon je interesse
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      {totaal > 0 && (
        <div className="container-x pt-10 sm:pt-12">
          <p className="reveal mx-auto max-w-2xl text-center text-sm text-graphite">
            Nu nog {beschikbaar} van de {totaal} bedrijfsunits beschikbaar in de voorverkoop.
          </p>
        </div>
      )}

      <Section>
        <h2 className="sr-only">Voordelen van de voorverkoop</h2>
        <div className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={<BadgePercent className="h-6 w-6" />} title={`${discount}% korting`} text="Het voordeligste tarief geldt uitsluitend tijdens de voorverkoop." />
          <FeatureCard icon={<ListChecks className="h-6 w-6" />} title="Meeste keuze" text="Kies als eerste je favoriete unit of kantoor op de beste plek." />
          <FeatureCard icon={<KeyRound className="h-6 w-6" />} title="Ruimtes te combineren" text="Combineer in overleg meerdere kantoren tot één grotere ruimte." />
          <FeatureCard icon={<CalendarClock className="h-6 w-6" />} title="Vroeg zekerheid" text="Leg nu je plek vast en bouw mee aan De Gouden Driehoek." />
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Rekenvoorbeeld"
          title={`Wat levert de ${discount}% korting op`}
          intro="Een concreet voorbeeld op basis van de voordeligste bedrijfsunit."
        />
        <div className="reveal mt-10 rounded-3xl border border-line bg-cream p-8 sm:p-10">
          {minBedrijf != null && voorverkoopMin != null && voordeel != null ? (
            <>
              <div className="grid gap-6 sm:grid-cols-3 sm:gap-4">
                <div>
                  <p className="eyebrow text-mist">Reguliere prijs</p>
                  <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                    {formatPrice(minBedrijf)}
                  </p>
                  <p className="mt-1 text-sm text-graphite">Bedrijfsunit vanaf</p>
                </div>
                <div>
                  <p className="eyebrow text-gold-dark">In de voorverkoop</p>
                  <p className="mt-2 font-display text-2xl font-bold text-gold-dark sm:text-3xl">
                    {formatPrice(voorverkoopMin)}
                  </p>
                  <p className="mt-1 text-sm text-graphite">Met {discount}% korting</p>
                </div>
                <div>
                  <p className="eyebrow text-mist">Je voordeel</p>
                  <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                    {formatPrice(voordeel)}
                  </p>
                  <p className="mt-1 text-sm text-graphite">Direct besparen</p>
                </div>
              </div>
              <p className="mt-8 text-xs leading-relaxed text-mist">
                Bedragen zijn indicatief, kantoren op aanvraag. Wijzigingen voorbehouden.
              </p>
            </>
          ) : (
            <>
              <p className="max-w-2xl text-graphite">
                Tijdens de voorverkoop profiteer je van {discount}% korting op de reguliere
                prijs. Zo leg je je unit of kantoor vast tegen het scherpste tarief.
              </p>
              <p className="mt-6 text-xs leading-relaxed text-mist">
                Bedragen zijn indicatief, kantoren op aanvraag. Wijzigingen voorbehouden.
              </p>
            </>
          )}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Hoe werkt het"
          title="In drie stappen"
          intro="Van eerste interesse tot vastlegging begeleiden we je persoonlijk."
        />
        <p className="reveal mt-4 max-w-2xl text-sm text-graphite">
          Interesse tonen is gratis en vrijblijvend. Je zit nergens aan vast tot je zelf
          besluit je unit of kantoor vast te leggen.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <Step n={1} title="Toon je interesse" text="Laat je gegevens achter en geef aan waar je naar op zoek bent." />
          <Step n={2} title="Persoonlijk gesprek" text="We bespreken de mogelijkheden, indeling, oppervlakte en prijs." />
          <Step n={3} title="Vastleggen" text="Je legt je unit of kantoor vast tegen het voorverkooptarief." />
        </ol>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Planning"
          title="Van vergunning tot oplevering"
          intro="De belangrijkste momenten op een rij. De genoemde perioden zijn indicatief."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {planning.map((p, i) => (
            <li key={p.title} className="reveal card-lift relative rounded-2xl border border-line bg-cream p-6">
              <span className="eyebrow text-gold-dark">{p.periode}</span>
              <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Veelgestelde vragen over de voorverkoop"
            intro="De meest gestelde vragen over instappen tijdens de voorverkoop."
          />
          <div className="reveal space-y-3">
            {presaleFaqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-line bg-white px-5 py-1 transition-colors open:border-gold/40 open:bg-gold-tint/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-bold text-ink marker:content-['']">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-gold-dark transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-graphite">{item.a}</p>
              </details>
            ))}
            <div className="pt-3">
              <ButtonLink href="/faq" variant="outline">
                Bekijk alle veelgestelde vragen
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
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

const planning = [
  {
    periode: "Afgerond",
    title: "Vergunning verleend",
    text: "Het ontwerp is goedgekeurd door de gemeente en de omgevingsvergunning is verleend.",
  },
  {
    periode: "Nu",
    title: "Voorverkoop",
    text: "Leg je unit of kantoor vast met 10% korting en de meeste keuze.",
  },
  {
    periode: "Q1 2027 · indicatief",
    title: "Start bouw",
    text: "De realisatie start; kopers worden meegenomen in de voortgang.",
  },
  {
    periode: "Q4 2027 · indicatief",
    title: "Oplevering",
    text: "Sleuteloverdracht en ingebruikname.",
  },
];

const presaleFaqs: { q: string; a: string }[] = [
  {
    q: "Wat kost het om nu interesse te tonen?",
    a: "Niets. Interesse tonen is gratis en vrijblijvend. Je legt pas iets vast na een persoonlijk gesprek.",
  },
  {
    q: "Hoelang geldt de 10% korting?",
    a: "De korting geldt uitsluitend tijdens de voorverkoop, zolang er nog voorverkoop-eenheden beschikbaar zijn.",
  },
  {
    q: "Kan ik kopen of huren?",
    a: "De bedrijfsunits worden verkocht. Voor de kantoorruimte zijn koop en huur bespreekbaar; geef je voorkeur aan in het contactformulier.",
  },
];

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
