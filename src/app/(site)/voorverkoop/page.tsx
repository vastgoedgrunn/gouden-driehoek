import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/components/newsletter-form";
import { ButtonLink } from "@/components/ui/button";
import { getSiteContent, getUnits, formatPrice } from "@/lib/data";
import { parseDiscount, presalePrice } from "@/lib/format";
import { cn } from "@/lib/cn";

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

  const heeftBeschikbaarheid = totaal > 0 && beschikbaar > 0;
  const heeftBedragen = minBedrijf != null && voorverkoopMin != null && voordeel != null;

  return (
    <>
      <PageHero
        eyebrow="Voorverkoop"
        title={`Nu instappen met ${discount}% korting`}
        intro="Als je er vroeg bij bent, profiteer je van het scherpste tarief en heb je de meeste keuze in units, kantoren en combinaties."
        image="/impressies/impressie-01.webp"
        imageAlt="Vooraanzicht van De Gouden Driehoek in Stadskanaal"
        actions={
          <div className="flex flex-col items-start gap-4">
            <ButtonLink href="/contact">
              Toon je interesse
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            {heeftBeschikbaarheid && (
              <p className="text-sm text-white/70">
                Nu nog {beschikbaar} van de {totaal} bedrijfsunits beschikbaar in de
                voorverkoop.
              </p>
            )}
          </div>
        }
      />

      {/* Waarom nu instappen */}
      <MediaSplit
        className="bg-cream"
        image="/impressies/impressie-10.webp"
        alt="Representatieve kantoorruimte op de verdieping van De Gouden Driehoek"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="tri-marker" aria-hidden />
          <span className="eyebrow text-gold-dark">Waarom nu</span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
          Waarom nu instappen
        </h2>
        <div className="reveal mt-4 space-y-4 text-graphite">
          <p>
            De voorverkoop is het moment waarop je het meeste kiest tegen de gunstigste
            voorwaarden. Je legt je plek vast voordat de bouw start, met {discount}% korting op
            het reguliere tarief en de ruimste keuze in units, kantoren en combinaties.
          </p>
          <p>
            Wie vroeg instapt, kiest de beste plek en heeft alle rust om de indeling op de eigen
            organisatie af te stemmen.
          </p>
        </div>
        <ul className="reveal-stagger mt-8 space-y-5">
          <Benefit
            title={`Scherpste tarief.`}
            text={`De ${discount}% korting geldt uitsluitend tijdens de voorverkoop.`}
          />
          <Benefit
            title="Meeste keuze."
            text="Kies als eerste je favoriete unit of kantoor op de beste plek."
          />
          <Benefit
            title="Vroeg zekerheid."
            text="Leg je plek nu vast en stem de ruimte rustig af op je plannen."
          />
        </ul>
      </MediaSplit>

      {/* Full-bleed beeldband: rekenvoorbeeld */}
      <section className="relative overflow-hidden">
        <Image
          src="/impressies/impressie-04.webp"
          alt="Gevelbeeld van De Gouden Driehoek met de karakteristieke gouden daklijn"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container-x relative py-20 text-white sm:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="tri-marker" aria-hidden />
              <span className="eyebrow text-gold-light">Rekenvoorbeeld</span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-[2.5rem]">
              Wat {discount}% korting oplevert
            </h2>
            {heeftBedragen && (
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                Een concreet voorbeeld op basis van de voordeligste bedrijfsunit.
              </p>
            )}
          </div>

          {heeftBedragen ? (
            <>
              <div className="reveal mx-auto mt-12 flex max-w-4xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
                <PriceBlock
                  label="Reguliere prijs"
                  value={formatPrice(minBedrijf)}
                  sub="Bedrijfsunit vanaf"
                />
                <ArrowRight
                  className="mx-auto hidden h-6 w-6 shrink-0 text-gold-light sm:block"
                  aria-hidden
                />
                <PriceBlock
                  label="Voorverkoopprijs"
                  value={formatPrice(voorverkoopMin)}
                  sub={`Met ${discount}% korting`}
                  highlight
                />
                <ArrowRight
                  className="mx-auto hidden h-6 w-6 shrink-0 text-gold-light sm:block"
                  aria-hidden
                />
                <PriceBlock
                  label="Jouw voordeel"
                  value={formatPrice(voordeel)}
                  sub="Direct besparen"
                />
              </div>
              <p className="reveal mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/50">
                Bedragen zijn indicatief, kantoren op aanvraag. Wijzigingen voorbehouden.
              </p>
            </>
          ) : (
            <p className="reveal mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-white/80">
              Tijdens de voorverkoop profiteer je van {discount}% korting op de reguliere prijs.
              Zo leg je je unit of kantoor vast tegen het scherpste tarief.
            </p>
          )}
        </div>
      </section>

      {/* Zekerheid en planning */}
      <MediaSplit
        className="bg-white"
        image="/impressies/impressie-07.webp"
        alt="Impressie van De Gouden Driehoek met de karakteristieke gouden daklijn"
        reverse
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="tri-marker" aria-hidden />
          <span className="eyebrow text-gold-dark">Planning</span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
          Zekerheid en planning
        </h2>
        <div className="reveal mt-4 space-y-4 text-graphite">
          <p>
            Het ontwerp is goedgekeurd door de gemeente en de omgevingsvergunning is verleend.
            Het project heeft dus groen licht, wat extra zekerheid geeft wanneer je nu in de
            voorverkoop instapt.
          </p>
        </div>
        <ol className="reveal mt-8">
          {planning.map((p, i) => (
            <li key={p.title} className="relative flex gap-4 pb-8 last:pb-0">
              {i < planning.length - 1 && (
                <span
                  className="absolute bottom-1 left-[1.0625rem] top-9 w-px bg-line"
                  aria-hidden
                />
              )}
              <span className="relative z-10 flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="pt-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                  <span className="eyebrow text-gold-dark">{p.periode}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-graphite">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </MediaSplit>

      {/* Zo werkt het */}
      <MediaSplit
        className="bg-cream"
        image="/impressies/impressie-09.webp"
        alt="Impressie van de bedrijfsunits op de begane grond van De Gouden Driehoek"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="tri-marker" aria-hidden />
          <span className="eyebrow text-gold-dark">Hoe werkt het</span>
        </div>
        <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
          Zo werkt het
        </h2>
        <p className="reveal mt-4 text-graphite">
          Van eerste interesse tot vastlegging begeleiden we je persoonlijk, in drie
          overzichtelijke stappen.
        </p>
        <ol className="reveal mt-8 space-y-6">
          {stappen.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-graphite">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="reveal mt-8 text-sm leading-relaxed text-graphite">
          Interesse tonen is gratis en vrijblijvend. Je zit nergens aan vast tot je zelf besluit
          je unit of kantoor vast te leggen.
        </p>
      </MediaSplit>

      {/* Mini-FAQ */}
      <Section className="bg-white">
        <div className="reveal mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="tri-marker" aria-hidden />
            <span className="eyebrow text-gold-dark">FAQ</span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
            Veelgestelde vragen over de voorverkoop
          </h2>
        </div>
        <div className="reveal mx-auto mt-10 max-w-3xl space-y-3">
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
          <div className="pt-4 text-center">
            <ButtonLink href="/faq" variant="outline">
              Bekijk alle veelgestelde vragen
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Eind-CTA */}
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

const stappen = [
  {
    title: "Toon je interesse",
    text: "Laat je gegevens achter en geef aan waar je naar op zoek bent.",
  },
  {
    title: "Persoonlijk gesprek",
    text: "We bespreken de mogelijkheden, indeling, oppervlakte en prijs.",
  },
  {
    title: "Vastleggen",
    text: "Je legt je unit of kantoor vast tegen het voorverkooptarief.",
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

function MediaSplit({
  image,
  alt,
  reverse = false,
  className,
  children,
}: {
  image: string;
  alt: string;
  reverse?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Section className={className}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div
          className={cn(
            "reveal relative aspect-[4/3] overflow-hidden rounded-3xl",
            reverse && "lg:order-2",
          )}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>{children}</div>
      </div>
    </Section>
  );
}

function Benefit({ title, text }: { title: string; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-tint text-gold-dark">
        <Check className="h-4 w-4" />
      </span>
      <span className="text-graphite">
        <strong className="font-semibold text-ink">{title}</strong> {text}
      </span>
    </li>
  );
}

function PriceBlock({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex-1 rounded-2xl px-6 py-8 text-center ring-1 ring-inset backdrop-blur-sm",
        highlight
          ? "bg-gold/15 ring-gold/40"
          : "bg-white/10 ring-white/15",
      )}
    >
      <p className={cn("eyebrow", highlight ? "text-gold-light" : "text-white/60")}>{label}</p>
      <p
        className={cn(
          "mt-3 font-display text-2xl font-bold sm:text-3xl",
          highlight ? "text-gold-light" : "text-white",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-white/60">{sub}</p>
    </div>
  );
}
