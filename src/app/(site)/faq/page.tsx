import type { Metadata } from "next";
import { ChevronDown, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { FaqJsonLd } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op veelgestelde vragen over De Gouden Driehoek in Stadskanaal: voorverkoop, koop of huur, indeling, oplevering en reserveren.",
  alternates: { canonical: "/faq" },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "Wat is de voorverkoop precies?",
    a: "Tijdens de voorverkoop leg je jouw unit of kantoor vast vóór de bouw, tegen het scherpste tarief (10% korting) en met de meeste keuze in plek en indeling. Je bent er zo als eerste bij.",
  },
  {
    q: "Kan ik kopen én huren?",
    a: "De bedrijfsunits worden primair verkocht; voor de kantoorruimte zijn zowel koop als huur bespreekbaar. Geef in het contactformulier aan waar je voorkeur naar uitgaat, dan bespreken we de mogelijkheden.",
  },
  {
    q: "Hoe werkt reserveren?",
    a: "Je toont interesse via het formulier, we plannen een persoonlijk gesprek en bespreken unit, indeling, oppervlakte en prijs. Daarna leg je jouw ruimte vrijblijvend en stapsgewijs vast tegen het voorverkooptarief.",
  },
  {
    q: "Kan ik de indeling zelf bepalen?",
    a: "De kantoorlaag is vrij indeelbaar en volledig af te stemmen op jouw wensen, van één compacte unit tot een volledige vleugel. Ook bedrijfsunits zijn onderling te combineren tot de gewenste maat.",
  },
  {
    q: "Zijn de genoemde prijzen inclusief of exclusief btw?",
    a: "De getoonde bedragen zijn indicatief en exclusief btw en bijkomende kosten, tenzij anders vermeld. In een persoonlijk gesprek ontvang je een volledige, actuele prijsopgave.",
  },
  {
    q: "Wanneer wordt het gebouw opgeleverd?",
    a: "De planning kent vier fasen: voorverkoop, definitief ontwerp & vergunning, realisatie en oplevering. Zodra de exacte opleverdatum bekend is, informeren we belangstellenden persoonlijk en via de nieuwsbrief.",
  },
  {
    q: "Hoe zit het met parkeren?",
    a: "Op eigen terrein is ruime parkeergelegenheid voorzien, direct bij de units en kantoren. De exacte inrichting wordt in het definitieve ontwerp vastgelegd.",
  },
  {
    q: "Hoe duurzaam is het gebouw?",
    a: "De Gouden Driehoek wordt ontwikkeld als hoogwaardige, energiezuinige nieuwbouw met goede isolatie en toekomstbestendige installaties. Concrete duurzaamheidsspecificaties worden in het definitieve ontwerp bevestigd.",
  },
  {
    q: "Kunnen wijzigingen nog voorkomen?",
    a: "Impressies, plattegronden, oppervlaktes en prijzen zijn indicatief; wijzigingen zijn voorbehouden. De definitieve gegevens leggen we vast in de koop-/huurdocumentatie.",
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <PageHero
        eyebrow="Veelgestelde vragen"
        title="Goed om te weten"
        intro="De belangrijkste vragen over de voorverkoop, koop of huur, indeling en oplevering, overzichtelijk op een rij."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Antwoorden op je vragen"
            intro="Staat jouw vraag er niet bij? Neem gerust contact op, we denken graag met je mee."
          />
          <div className="reveal space-y-3">
            {faqs.map((item) => (
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
          </div>
        </div>

        <div className="reveal mt-14 flex flex-col items-center gap-4 rounded-3xl border border-line bg-gradient-to-br from-gold-tint to-white px-8 py-12 text-center">
          <span className="tri-marker" aria-hidden />
          <h2 className="max-w-xl font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Nog een vraag of direct interesse?
          </h2>
          <p className="max-w-lg text-graphite">
            We beantwoorden je vraag graag persoonlijk en denken mee over de beste
            plek en indeling voor jouw organisatie.
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
