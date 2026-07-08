import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { PlanViewer } from "@/components/plan-viewer";
import { AvailabilityExplorer } from "@/components/availability-explorer";
import { FeatureCard } from "@/components/ui/feature-card";
import { ButtonLink } from "@/components/ui/button";
import { getUnits, getSiteContent } from "@/lib/data";
import { parseDiscount } from "@/lib/format";
import { kantoorTypes, countByType, gezamenlijkeRuimteGebruik } from "@/lib/kantoren";
import {
  ArrowRight,
  LayoutGrid,
  Ruler,
  Sun,
  Users,
  MessageSquare,
  DoorOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kantoren",
  description:
    "20 kantoorunits (type A t/m F, ca. 13,5 tot 67 m²) en een grote gezamenlijke ruimte op de verdieping van De Gouden Driehoek in Stadskanaal. Meerdere kantoren zijn in overleg te combineren tot één grotere ruimte.",
  alternates: { canonical: "/kantoren" },
};

export default async function KantorenPage() {
  const [all, content] = await Promise.all([getUnits(), getSiteContent()]);
  const discount = parseDiscount(content.presale_discount);
  const kantoren = all.filter((u) => u.type === "kantoor");
  const totaalM2 = kantoren.reduce((s, u) => s + Number(u.oppervlakte_m2), 0);

  return (
    <>
      <PageHero
        eyebrow="Verdieping · kantoren te combineren"
        title="Kantoren"
        intro="Op de verdieping komt representatieve kantoorruimte vol daglicht, met volledig glazen scheidingswanden en een ruime gezamenlijke ruimte. De ruimtes liggen vast zoals op de plattegrond, maar in overleg kun je meerdere kantoren afnemen en die koppelen tot één grotere ruimte."
        image="/impressies/impressie-05.webp"
        imageAlt="Impressie van de kantoorruimte van De Gouden Driehoek"
        actions={
          <>
            <ButtonLink href="/contact">
              Toon je interesse
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#indeling" variant="ghostLight">
              Ontdek de indeling
            </ButtonLink>
          </>
        }
      />

      {/* Kerncijfers */}
      <Section>
        <h2 className="sr-only">In het kort</h2>
        <div className="reveal-stagger grid gap-6 sm:grid-cols-3">
          <FeatureCard icon={<LayoutGrid className="h-6 w-6" />} title={`${kantoren.length} kantoorunits`} text="Zes typen (A t/m F) van compact tot royaal, te combineren tot de gewenste maat." />
          <FeatureCard icon={<Ruler className="h-6 w-6" />} title={`± ${totaalM2} m² kantoorruimte`} text="Naast de kantoren een grote gezamenlijke ruimte voor gedeeld gebruik." />
          <FeatureCard icon={<Sun className="h-6 w-6" />} title="Volglazen wanden" text="Maximaal daglicht en een open, representatieve uitstraling." />
        </div>
      </Section>

      {/* Plattegrond */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Plattegrond 1e verdieping"
          title="De indeling in beeld"
          intro="De indeling van de verdieping (schaal 1:200). De ruimtes liggen vast zoals hieronder; in overleg kun je meerdere kantoren combineren tot één grotere ruimte."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <PlanViewer
            src="/plattegronden/kantoorverdieping.webp"
            alt="Plattegrond 1e verdieping De Gouden Driehoek met kantoortypen A t/m F en gezamenlijke ruimte"
            caption="1e verdieping · schaal 1:200 · kantoren in overleg te combineren"
            width={1817}
            height={866}
          />
          <div className="reveal space-y-3">
            <h3 className="font-display text-lg font-bold text-ink">Kantoortypen</h3>
            <ul className="space-y-2">
              {kantoorTypes.map((t) => {
                const n = countByType(kantoren, t.code);
                return (
                  <li
                    key={t.code}
                    className="flex items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3"
                  >
                    <span className={`h-5 w-5 shrink-0 rounded ${t.swatch}`} aria-hidden />
                    <span className="flex-1">
                      <span className="font-semibold text-ink">Type {t.code}</span>{" "}
                      <span className="text-sm text-graphite">· {t.oppervlakte}</span>
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

      {/* Interactieve plattegrond */}
      <Section id="indeling" className="scroll-mt-20">
        <SectionHeading
          eyebrow="Kies je kantoor"
          title="Ontdek de indeling"
          intro="Klik in de plattegrond of tik op een kantoor voor de oppervlakte en het type. Meerdere kantoren zijn in overleg te combineren; prijzen op aanvraag."
        />
        <div className="mt-10">
          <AvailabilityExplorer units={kantoren} discount={discount} />
        </div>
      </Section>

      {/* Gezamenlijke ruimte */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Gezamenlijke ruimte"
          title="Meer dan alleen een kantoor"
          intro="Centraal op de verdieping ligt een grote gezamenlijke ruimte die huurders samen kunnen gebruiken en invullen. Enkele mogelijkheden:"
        />
        <div className="reveal mt-8 flex flex-wrap gap-2.5">
          {gezamenlijkeRuimteGebruik.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink-soft"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="reveal-stagger mt-10 grid gap-6 sm:grid-cols-3">
          <FeatureCard icon={<Users className="h-6 w-6" />} title="Ontmoeten" text="Een plek om te netwerken, samen te werken en te ontspannen." />
          <FeatureCard icon={<MessageSquare className="h-6 w-6" />} title="2 spreekruimtes" text="Aparte ruimtes voor overleg en vertrouwelijke gesprekken." />
          <FeatureCard icon={<DoorOpen className="h-6 w-6" />} title="Voorzieningen" text="Toiletten, berging en technische voorzieningen op de verdieping." />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="reveal flex flex-col items-center gap-4 rounded-2xl bg-gold-tint px-8 py-10 text-center">
          <h3 className="font-display text-2xl font-bold text-ink">
            Welke maat past bij jouw organisatie?
          </h3>
          <p className="max-w-lg text-graphite">
            Kies één kantoor of combineer er in overleg meerdere tot één grotere
            ruimte. Zo stemmen we de oppervlakte samen met je af.
          </p>
          <ButtonLink href="/contact">
            Bespreek de mogelijkheden
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
