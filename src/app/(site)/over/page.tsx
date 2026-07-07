import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { VideoModal } from "@/components/video-modal";
import { ImpressionGallery } from "@/components/impression-gallery";
import { ButtonLink } from "@/components/ui/button";
import { getSiteContent } from "@/lib/data";
import { ArrowRight, Leaf, Zap, Recycle, ThermometerSun } from "lucide-react";

export const metadata: Metadata = {
  title: "Over het project",
  description:
    "De visie achter De Gouden Driehoek: een hoogwaardig, herkenbaar en duurzaam bedrijfsgebouw voor ondernemers in Stadskanaal.",
  alternates: { canonical: "/over" },
};

const planning = [
  { fase: "Fase 1", title: "Voorverkoop", text: "Belangstellenden leggen units en kantoren vast tegen het voorverkooptarief." },
  { fase: "Fase 2", title: "Ontwerp & vergunning", text: "Het definitieve ontwerp en de indeling worden uitgewerkt en vergund." },
  { fase: "Fase 3", title: "Realisatie", text: "De bouw start; kopers worden meegenomen in de voortgang." },
  { fase: "Fase 4", title: "Oplevering", text: "Sleuteloverdracht en ingebruikname van units en kantoren." },
];

export default async function OverPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow="Over het project"
        title="De visie achter De Gouden Driehoek"
        intro={content.project_intro}
        image="/impressies/impressie-03.webp"
        imageAlt="Impressie van De Gouden Driehoek"
        actions={
          <ButtonLink href="/contact">
            Toon je interesse
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      {/* Video */}
      <Section>
        <div className="reveal relative overflow-hidden rounded-3xl">
          <div className="relative aspect-video">
            <Image
              src="/video/impressie-poster.jpg"
              alt="Impressievideo De Gouden Driehoek"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
              <VideoModal label="Bekijk de impressiefilm" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Ambitie" title="Een plek om trots op te zijn" />
            <div className="reveal mt-4 space-y-4 text-graphite">
              <p>
                De Gouden Driehoek is ontworpen als een herkenbaar en
                representatief bedrijfsgebouw: robuuste bedrijfsunits op de
                begane grond en lichte, flexibele kantoorruimte op de
                verdieping.
              </p>
              <p>
                De karakteristieke gouden daklijn maakt het gebouw van veraf
                herkenbaar en geeft ondernemers een adres om trots op te zijn.
              </p>
            </div>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/impressies/impressie-07.webp"
              alt="Impressie van De Gouden Driehoek met de karakteristieke gouden daklijn"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Duurzaamheid */}
      <Section>
        <SectionHeading
          eyebrow="Duurzaamheid"
          title="Toekomstbestendig gebouwd"
          intro="De Gouden Driehoek wordt ontwikkeld als energiezuinige nieuwbouw, gericht op comfort, lage lasten en een lange levensduur. Definitieve specificaties volgen in het ontwerp."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard surface="cream" icon={<ThermometerSun className="h-6 w-6" />} title="Goede isolatie" text="Een hoogwaardige, goed geïsoleerde schil voor comfort en lage energielasten." />
          <FeatureCard surface="cream" icon={<Zap className="h-6 w-6" />} title="Zuinige installaties" text="Energiezuinige, toekomstbestendige technische installaties." />
          <FeatureCard surface="cream" icon={<Leaf className="h-6 w-6" />} title="Daglicht & comfort" text="Volglazen wanden op de verdieping voor maximaal daglicht en een prettig binnenklimaat." />
          <FeatureCard surface="cream" icon={<Recycle className="h-6 w-6" />} title="Klaar voor de toekomst" text="Voorbereid op laadvoorzieningen en duurzame energie op eigen terrein." />
        </div>
      </Section>

      {/* Planning */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Planning"
          title="Van voorverkoop tot oplevering"
          intro="Het project doorloopt vier fasen. Belangstellenden houden we via de nieuwsbrief en persoonlijk op de hoogte van de voortgang."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {planning.map((p, i) => (
            <li key={p.fase} className="reveal card-lift relative rounded-2xl border border-line bg-cream p-6">
              <span className="eyebrow text-gold-dark">{p.fase}</span>
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
        <SectionHeading align="center" eyebrow="Impressies" title="Beeld van het gebouw" />
        <div className="mt-10">
          <ImpressionGallery
            images={[
              { src: "/impressies/impressie-01.webp", alt: "Impressie vooraanzicht De Gouden Driehoek" },
              { src: "/impressies/impressie-04.webp", alt: "Impressie gevel De Gouden Driehoek" },
              { src: "/impressies/impressie-06.webp", alt: "Impressie entree De Gouden Driehoek" },
              { src: "/impressies/impressie-09.webp", alt: "Impressie bedrijfsunits De Gouden Driehoek" },
              { src: "/impressies/impressie-10.webp", alt: "Impressie kantoorruimte De Gouden Driehoek" },
              { src: "/impressies/impressie-13.webp", alt: "Impressie omgeving De Gouden Driehoek" },
            ]}
          />
        </div>
        <div className="reveal mt-12 text-center">
          <ButtonLink href="/contact">
            Toon je interesse
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
