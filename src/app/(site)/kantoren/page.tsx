import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { PlanViewer } from "@/components/plan-viewer";
import { ButtonLink } from "@/components/ui/button";
import { getUnits } from "@/lib/data";
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
    "20 kantoorunits (type A t/m F, ca. 13,5–67 m²) en een grote gezamenlijke ruimte op de verdieping van De Gouden Driehoek in Stadskanaal. Vrij indeelbaar.",
};

export default async function KantorenPage() {
  const all = await getUnits();
  const kantoren = all.filter((u) => u.type === "kantoor");
  const totaalM2 = kantoren.reduce((s, u) => s + Number(u.oppervlakte_m2), 0);

  return (
    <>
      <PageHero
        eyebrow="Verdieping · vrij indeelbaar"
        title="Kantoren"
        intro="Op de verdieping komt representatieve kantoorruimte vol daglicht, met volledig glazen scheidingswanden en een ruime gezamenlijke ruimte. De indeling is flexibel en nog nader te bepalen."
        image="/impressies/impressie-05.webp"
      />

      {/* Kerncijfers */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          <Feature icon={<LayoutGrid className="h-6 w-6" />} title={`${kantoren.length} kantoorunits`} text="Zes typen (A t/m F) van compact tot royaal, te combineren tot de gewenste maat." />
          <Feature icon={<Ruler className="h-6 w-6" />} title={`± ${totaalM2} m² verhuurbaar`} text="Naast de kantoren een grote gezamenlijke ruimte voor gedeeld gebruik." />
          <Feature icon={<Sun className="h-6 w-6" />} title="Volglazen wanden" text="Maximaal daglicht en een open, representatieve uitstraling." />
        </div>
      </Section>

      {/* Plattegrond */}
      <Section className="bg-white">
        <SectionHeading
          eyebrow="Plattegrond 1e verdieping"
          title="De indeling in beeld"
          intro="Voorlopige indeling (schaal 1:200). De indeling is nog nader te bepalen en volledig af te stemmen op jouw wensen."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <PlanViewer
            src="/plattegronden/kantoorverdieping.webp"
            alt="Plattegrond 1e verdieping De Gouden Driehoek met kantoortypen A t/m F en gezamenlijke ruimte"
            caption="1e verdieping · schaal 1:200 · indeling nader te bepalen"
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

      {/* Gezamenlijke ruimte */}
      <Section>
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
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Feature icon={<Users className="h-6 w-6" />} title="Ontmoeten" text="Een plek om te netwerken, samen te werken en te ontspannen." />
          <Feature icon={<MessageSquare className="h-6 w-6" />} title="2 spreekruimtes" text="Aparte ruimtes voor overleg en vertrouwelijke gesprekken." />
          <Feature icon={<DoorOpen className="h-6 w-6" />} title="Voorzieningen" text="Toiletten, berging en technische voorzieningen op de verdieping." />
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-white">
        <div className="reveal flex flex-col items-center gap-4 rounded-2xl bg-gold-tint px-8 py-10 text-center">
          <h3 className="font-display text-2xl font-bold text-ink">
            Welke maat past bij jouw organisatie?
          </h3>
          <p className="max-w-lg text-graphite">
            De verdieping is vrij indeelbaar. Van één compacte unit tot een
            volledige vleugel — we stemmen de indeling en oppervlakte samen met je
            af.
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
