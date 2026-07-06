import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { UnitCard } from "@/components/unit-card";
import { AvailabilityExplorer } from "@/components/availability-explorer";
import { PlanViewer } from "@/components/plan-viewer";
import { ButtonLink } from "@/components/ui/button";
import { getUnits } from "@/lib/data";
import { bedrijfsunitTypes, countByType } from "@/lib/bedrijfsunits";
import { ArrowRight, DoorOpen, Layers, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Bedrijfsunits",
  description:
    "12 bedrijfsunits (type A t/m D, ca. 43–100 m²) met overheaddeur op de begane grond van De Gouden Driehoek in Stadskanaal. Bekijk plattegrond, prijzen en beschikbaarheid.",
};

export default async function BedrijfsunitsPage() {
  const all = await getUnits();
  const units = all.filter((u) => u.type === "bedrijfsunit");
  const totaalM2 = units.reduce((s, u) => s + Number(u.oppervlakte_m2), 0);

  return (
    <>
      <PageHero
        eyebrow="Begane grond"
        title="Bedrijfsunits"
        intro="Robuuste, representatieve bedrijfsunits met eigen entree en overheaddeur — ideaal voor werkplaats, opslag, showroom of een combinatie. Units zijn onderling te combineren tot de gewenste maat."
        image="/impressies/impressie-08.webp"
      />

      {/* Kerncijfers */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          <Feature icon={<Layers className="h-6 w-6" />} title={`${units.length} bedrijfsunits`} text="Vier typen (A t/m D) van compact tot royaal, te combineren tot de gewenste maat." />
          <Feature icon={<Ruler className="h-6 w-6" />} title={`± ${totaalM2} m² totaal`} text="Van ca. 43 m² tot ca. 100 m² per unit, met vrije hoogte." />
          <Feature icon={<DoorOpen className="h-6 w-6" />} title="Eigen overheaddeur" text="Elke unit heeft een eigen entree en overheaddeur voor laden en lossen." />
        </div>
      </Section>

      {/* Plattegrond */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Plattegrond begane grond"
          title="De indeling in beeld"
          intro="Voorlopige indeling (schaal 1:200). Hoekunits (type C) kunnen eventueel worden uitgebreid met aangrenzende ruimte; wijzigingen voorbehouden."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <PlanViewer
            src="/plattegronden/begane-grond.webp"
            alt="Plattegrond begane grond De Gouden Driehoek met bedrijfsunits type A t/m D"
            caption="Begane grond · schaal 1:200 · centrale ingang met bordestrap naar de verdieping"
          />
          <div className="reveal space-y-3">
            <h3 className="font-display text-lg font-bold text-ink">Unittypen</h3>
            <ul className="space-y-2">
              {bedrijfsunitTypes.map((t) => {
                const n = countByType(units, t.code);
                return (
                  <li
                    key={t.code}
                    className="flex items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3"
                  >
                    <span className={`h-5 w-5 shrink-0 rounded ${t.swatch}`} aria-hidden />
                    <span className="flex-1">
                      <span className="font-semibold text-ink">Type {t.code}</span>{" "}
                      <span className="text-sm text-graphite">— {t.oppervlakte}</span>
                      <span className="block text-xs text-mist">{t.label}</span>
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-sm font-bold text-gold-dark ring-1 ring-line">
                      {n}×
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* Beschikbaarheid */}
      <Section>
        <SectionHeading
          eyebrow="Beschikbaarheid"
          title="Kies je unit"
          intro="Klik op een unit voor oppervlakte, prijs en status. Oppervlaktes en prijzen zijn indicatief."
        />
        <div className="mt-10">
          <AvailabilityExplorer units={units} />
        </div>
      </Section>

      {/* Alle units */}
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
            We denken graag met je mee over de mogelijkheden, indeling en het
            combineren van units.
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

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="reveal rounded-2xl border border-line bg-white p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-tint text-gold-dark">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-graphite">{text}</p>
    </div>
  );
}
