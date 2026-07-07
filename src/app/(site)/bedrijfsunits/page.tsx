import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { UnitCard } from "@/components/unit-card";
import { AvailabilityExplorer } from "@/components/availability-explorer";
import { FeatureCard } from "@/components/ui/feature-card";
import { PlanViewer } from "@/components/plan-viewer";
import { ButtonLink } from "@/components/ui/button";
import { getUnits, getSiteContent } from "@/lib/data";
import { parseDiscount } from "@/lib/format";
import { bedrijfsunitTypes, countByType } from "@/lib/bedrijfsunits";
import { ArrowRight, DoorOpen, Layers, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Bedrijfsunits",
  description:
    "12 bedrijfsunits (type A t/m D, ca. 43–100 m²) met overheaddeur op de begane grond van De Gouden Driehoek in Stadskanaal. Bekijk plattegrond, prijzen en beschikbaarheid.",
  alternates: { canonical: "/bedrijfsunits" },
};

export default async function BedrijfsunitsPage() {
  const [all, content] = await Promise.all([getUnits(), getSiteContent()]);
  const discount = parseDiscount(content.presale_discount);
  const units = all.filter((u) => u.type === "bedrijfsunit");
  const totaalM2 = units.reduce((s, u) => s + Number(u.oppervlakte_m2), 0);

  return (
    <>
      <PageHero
        eyebrow="Begane grond"
        title="Bedrijfsunits"
        intro="Robuuste, representatieve bedrijfsunits met eigen entree en overheaddeur — ideaal voor werkplaats, opslag, showroom of een combinatie. Units zijn onderling te combineren tot de gewenste maat."
        image="/impressies/impressie-08.webp"
        imageAlt="Impressie van de bedrijfsunits van De Gouden Driehoek"
        actions={
          <>
            <ButtonLink href="/contact">
              Toon je interesse
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#beschikbaarheid" variant="ghostLight">
              Bekijk beschikbaarheid
            </ButtonLink>
          </>
        }
      />

      {/* Kerncijfers */}
      <Section>
        <h2 className="sr-only">In het kort</h2>
        <div className="reveal-stagger grid gap-6 sm:grid-cols-3">
          <FeatureCard icon={<Layers className="h-6 w-6" />} title={`${units.length} bedrijfsunits`} text="Vier typen (A t/m D) van compact tot royaal, te combineren tot de gewenste maat." />
          <FeatureCard icon={<Ruler className="h-6 w-6" />} title={`± ${totaalM2} m² totaal`} text="Van ca. 43 m² tot ca. 100 m² per unit, met vrije hoogte." />
          <FeatureCard icon={<DoorOpen className="h-6 w-6" />} title="Eigen overheaddeur" text="Elke unit heeft een eigen entree en overheaddeur voor laden en lossen." />
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
      <Section id="beschikbaarheid" className="scroll-mt-20">
        <SectionHeading
          eyebrow="Beschikbaarheid"
          title="Kies je unit"
          intro="Klik op een unit voor oppervlakte, prijs en status. Oppervlaktes en prijzen zijn indicatief."
        />
        <div className="mt-10">
          <AvailabilityExplorer units={units} discount={discount} />
        </div>
      </Section>

      {/* Alle units */}
      <Section className="bg-white">
        <SectionHeading title="Alle bedrijfsunits" />
        <div className="reveal-stagger mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} discount={discount} />
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
