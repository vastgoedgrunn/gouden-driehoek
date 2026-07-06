import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { UnitCard } from "@/components/unit-card";
import { AvailabilityExplorer } from "@/components/availability-explorer";
import { ButtonLink } from "@/components/ui/button";
import { getUnits } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Bedrijfsunits",
  description:
    "Robuuste bedrijfsunits met overheaddeur op de begane grond van De Gouden Driehoek in Stadskanaal. Bekijk oppervlaktes, prijzen en beschikbaarheid.",
};

export default async function BedrijfsunitsPage() {
  const all = await getUnits();
  const units = all.filter((u) => u.type === "bedrijfsunit");

  return (
    <>
      <PageHero
        eyebrow="Begane grond"
        title="Bedrijfsunits"
        intro="Representatieve, flexibel te gebruiken bedrijfsunits met eigen entree en overheaddeur — ideaal voor werkplaats, opslag, showroom of een combinatie."
        image="/impressies/impressie-08.webp"
      />

      <Section>
        <SectionHeading
          eyebrow="Beschikbaarheid"
          title="Kies je unit"
          intro="Klik op een unit voor de details. Oppervlaktes zijn indicatief."
        />
        <div className="mt-10">
          <AvailabilityExplorer units={units} />
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading title="Alle bedrijfsunits" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
        <div className="reveal mt-12 flex flex-col items-center gap-4 rounded-2xl bg-gold-tint px-8 py-10 text-center">
          <h3 className="font-display text-2xl font-bold text-ink">
            Vragen over een unit?
          </h3>
          <p className="max-w-lg text-graphite">
            We denken graag met je mee over de mogelijkheden en indeling.
          </p>
          <ButtonLink href="/contact">
            Neem contact op
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
