import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Briefcase,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { AvailabilityExplorer } from "@/components/availability-explorer";
import { ImpressionGallery } from "@/components/impression-gallery";
import { NewsletterForm } from "@/components/newsletter-form";
import { getUnits, getSiteContent, formatPrice } from "@/lib/data";
import { presalePrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Bedrijfsunits & kantoren kopen in Stadskanaal",
  description:
    "De Gouden Driehoek in Stadskanaal: hoogwaardige nieuwbouw met bedrijfsunits en kantoorruimte. Nu in de voorverkoop met 10% korting — bekijk beschikbaarheid en plattegronden.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [units, content] = await Promise.all([getUnits(), getSiteContent()]);
  const discount = Number(content.presale_discount ?? "10");

  const bedrijfsunits = units.filter((u) => u.type === "bedrijfsunit");
  const kantoren = units.filter((u) => u.type === "kantoor");

  const minBedrijf = Math.min(
    ...bedrijfsunits.filter((u) => u.prijs_vanaf).map((u) => Number(u.prijs_vanaf)),
  );
  const minKantoor = Math.min(
    ...kantoren.filter((u) => u.prijs_vanaf).map((u) => Number(u.prijs_vanaf)),
  );

  return (
    <>
      <Hero
        kicker={content.hero_kicker ?? "Nieuwbouw in Stadskanaal"}
        title={content.hero_title ?? "De Gouden Driehoek"}
        subtitle={
          content.hero_subtitle ??
          "Bedrijfsunits en kantoorruimte van hoog niveau. Nu in de voorverkoop."
        }
        discount={discount}
      />

      {/* Intro / statement */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Het project"
              title={
                <>
                  Een markant gebouw met een{" "}
                  <span className="text-gold-shimmer">gouden</span> uitstraling
                </>
              }
              intro={content.project_intro}
            />
            <div className="reveal mt-8 grid grid-cols-3 gap-4">
              <Stat value={`${bedrijfsunits.length}`} label="Bedrijfsunits" />
              <Stat value={`${kantoren.length}`} label="Kantoren" />
              <Stat value={`${discount}%`} label="Voorverkoop-korting" />
            </div>
            <div className="reveal mt-8">
              <ButtonLink href="/over" variant="outline">
                Lees meer over het project
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/impressies/impressie-11.webp"
              alt="Artist impression van De Gouden Driehoek"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Section>

      {/* USP's */}
      <Section className="bg-white">
        <SectionHeading
          align="center"
          eyebrow="Waarom De Gouden Driehoek"
          title="Gebouwd om in te ondernemen"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            surface="cream"
            icon={<MapPin className="h-6 w-6" />}
            title="Zichtlocatie"
            text="Strategisch gelegen in Stadskanaal, goed bereikbaar en zichtbaar."
          />
          <FeatureCard
            surface="cream"
            icon={<Sparkles className="h-6 w-6" />}
            title="Hoogwaardig"
            text="Duurzame, representatieve nieuwbouw met oog voor detail."
          />
          <FeatureCard
            surface="cream"
            icon={<Building2 className="h-6 w-6" />}
            title="Flexibel indeelbaar"
            text="De kantoorlaag is vrij in te delen naar jouw wensen."
          />
          <FeatureCard
            surface="cream"
            icon={<TrendingUp className="h-6 w-6" />}
            title="Slimme investering"
            text={`Nu instappen in de voorverkoop met ${discount}% korting.`}
          />
        </div>
      </Section>

      {/* Aanbod teaser */}
      <Section>
        <SectionHeading
          eyebrow="Het aanbod"
          title="Bedrijfsunits en kantoren"
          intro="Onderin robuuste bedrijfsunits met overheaddeur, bovenin lichte en representatieve kantoorruimte."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <OfferCard
            href="/bedrijfsunits"
            image="/impressies/impressie-08.webp"
            icon={<Building2 className="h-5 w-5" />}
            title="Bedrijfsunits"
            subtitle="Begane grond"
            from={Number.isFinite(minBedrijf) ? formatPrice(presalePrice(minBedrijf, discount)) : undefined}
            count={bedrijfsunits.length}
          />
          <OfferCard
            href="/kantoren"
            image="/impressies/impressie-05.webp"
            icon={<Briefcase className="h-5 w-5" />}
            title="Kantoren"
            subtitle="Verdieping · vrij indeelbaar"
            from={Number.isFinite(minKantoor) ? formatPrice(presalePrice(minKantoor, discount)) : undefined}
            count={kantoren.length}
          />
        </div>
      </Section>

      {/* Beschikbaarheid */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Beschikbaarheid bedrijfsunits"
          title="Bekijk wat er nog vrij is"
          intro={`Op de begane grond zijn nog ${bedrijfsunits.filter((u) => u.status === "beschikbaar").length} van de ${bedrijfsunits.length} bedrijfsunits beschikbaar. Klik op een unit voor de details.`}
        />
        <div className="mt-10">
          <AvailabilityExplorer units={bedrijfsunits} discount={discount} />
        </div>
        <p className="reveal mt-6 text-sm text-graphite">
          Op zoek naar kantoorruimte?{" "}
          <Link href="/kantoren" className="font-semibold text-gold-dark hover:text-ink">
            Bekijk de {kantoren.length} kantoorunits en de plattegrond →
          </Link>
        </p>
      </Section>

      {/* Voorverkoop-callout */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <div className="container-x relative">
          <div className="reveal mx-auto max-w-3xl text-center">
            <span className="eyebrow text-gold-light">Voorverkoop</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Nu instappen met {discount}% korting
            </h2>
            <p className="mt-5 text-lg text-white/75">
              Wie er vroeg bij is, profiteert van het voordeligste tarief en de
              meeste keuze in units en indeling. Laat je gegevens achter en we
              houden je op de hoogte.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <NewsletterForm dark />
              <ButtonLink href="/voorverkoop" variant="light">
                Meer over de voorverkoop
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Locatie teaser */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative order-2 aspect-[4/3] overflow-hidden rounded-2xl lg:order-1">
            <Image
              src="/impressies/impressie-02.webp"
              alt="De Gouden Driehoek in de omgeving"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Locatie"
              title="Centraal in Stadskanaal"
              intro="Een goed bereikbare plek met ruimte om te ondernemen, dichtbij belangrijke verbindingen in de regio."
            />
            <ul className="reveal mt-6 space-y-3">
              {[
                "Uitstekende bereikbaarheid per auto",
                "Zichtbare, representatieve locatie",
                "Ruime parkeergelegenheid",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-graphite">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-gold-dark" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="reveal mt-8">
              <ButtonLink href="/locatie" variant="outline">
                Bekijk de locatie
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Galerij */}
      <Section className="bg-white">
        <SectionHeading
          align="center"
          eyebrow="Impressies"
          title="Zo gaat het eruitzien"
          intro="Beelden van de architect. Definitieve uitwerking kan afwijken."
        />
        <div className="mt-10">
          <ImpressionGallery
            images={[
              { src: "/impressies/impressie-11.webp", alt: "Vooraanzicht De Gouden Driehoek" },
              { src: "/impressies/impressie-03.webp", alt: "Impressie zijgevel" },
              { src: "/impressies/impressie-05.webp", alt: "Impressie entree" },
              { src: "/impressies/impressie-07.webp", alt: "Impressie bedrijfsunits" },
              { src: "/impressies/impressie-08.webp", alt: "Impressie gevel" },
              { src: "/impressies/impressie-12.webp", alt: "Impressie omgeving" },
            ]}
          />
        </div>
      </Section>

      {/* Slot-CTA */}
      <Section>
        <div className="reveal flex flex-col items-center gap-6 rounded-3xl border border-line bg-gradient-to-br from-gold-tint to-white px-8 py-14 text-center">
          <span className="tri-marker" aria-hidden />
          <h2 className="max-w-2xl font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Interesse in een unit of kantoor?
          </h2>
          <p className="max-w-xl text-lg text-graphite">
            Laat vrijblijvend je gegevens achter. We denken graag met je mee over
            de mogelijkheden.
          </p>
          <ButtonLink href="/contact" size="lg">
            Toon je interesse
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 text-center transition-colors duration-300 hover:border-gold/40">
      <p className="font-display text-3xl font-extrabold text-gold-dark">{value}</p>
      <p className="mt-1 text-xs font-medium text-graphite">{label}</p>
    </div>
  );
}

function OfferCard({
  href,
  image,
  icon,
  title,
  subtitle,
  from,
  count,
}: {
  href: string;
  image: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  from?: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className="reveal card-lift group relative overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            {icon}
          </span>
          <div>
            <p className="font-display text-xl font-bold leading-none">{title}</p>
            <p className="text-xs text-white/80">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-5">
        <div>
          <p className="text-xs text-mist">
            {count} ruimtes{from ? " · voorverkoop" : ""}
          </p>
          <p className="font-display font-bold text-ink">
            {from ? `vanaf ${from}` : "Prijs op aanvraag"}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition-transform group-hover:translate-x-0.5">
          Bekijk <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
