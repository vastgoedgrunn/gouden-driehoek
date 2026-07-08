import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { LeadForm } from "@/components/lead-form";
import { getSiteContent, getUnits } from "@/lib/data";
import { parseDiscount } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & interesse",
  description:
    "Toon je interesse in een bedrijfsunit of kantoor in De Gouden Driehoek. Laat je gegevens achter, we nemen snel contact op.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ unit?: string; type?: string }>;
}) {
  const { unit, type } = await searchParams;
  const presetType =
    type === "kantoor" ? "kantoor" : type === "bedrijfsunit" ? "bedrijfsunit" : undefined;

  // Zoek de unit op om context (oppervlakte, geldigheid) te bepalen.
  const [content, units] = await Promise.all([getSiteContent(), unit ? getUnits() : Promise.resolve([])]);
  const matchedUnit = unit
    ? units.find((u) => u.nummer.toLowerCase() === unit.toLowerCase())
    : undefined;
  const kindLabel = (matchedUnit?.type ?? type) === "kantoor" ? "Kantoor" : "Unit";
  const presetUnit = unit ? `${kindLabel} ${unit}` : undefined;
  const presetArea = matchedUnit ? String(matchedUnit.oppervlakte_m2) : undefined;

  const email = content.contact_email || siteConfig.contact.email;
  const phone = content.contact_phone || siteConfig.contact.phone;
  const phoneHref = (content.contact_phone || siteConfig.contact.phoneHref).replace(/\s/g, "");

  return (
    <>
      <PageHero
        eyebrow="Contact & interesse"
        title="Laat van je horen"
        intro="Interesse in een unit of kantoor, of gewoon een vraag? Vul het formulier in, dan nemen we zo snel mogelijk persoonlijk contact met je op."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="reveal rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">
              Toon je interesse
            </h2>
            <p className="mt-1 text-sm text-graphite">
              Velden met * zijn verplicht.
            </p>
            <div className="mt-6">
              <LeadForm
                key={`${presetUnit ?? ""}-${presetType ?? ""}`}
                presetUnit={presetUnit}
                presetType={presetType}
                presetArea={presetArea}
              />
            </div>
          </div>

          <aside className="reveal space-y-6">
            <div className="rounded-2xl bg-ink p-6 text-white">
              <h3 className="font-display text-lg font-bold">Direct contact</h3>
              <ul className="mt-4 space-y-4 text-sm">
                {email ? (
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gold-light" />
                    <a href={`mailto:${email}`} className="hover:text-gold-light">
                      {email}
                    </a>
                  </li>
                ) : null}
                {phone ? (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold-light" />
                    <a href={`tel:${phoneHref}`} className="hover:text-gold-light">
                      {phone}
                    </a>
                  </li>
                ) : null}
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-gold-tint p-6">
              <h3 className="font-display text-lg font-bold text-ink">
                Waarom nu?
              </h3>
              <p className="mt-2 text-sm text-graphite">
                Tijdens de voorverkoop profiteer je van{" "}
                {parseDiscount(content.presale_discount)}% korting en heb je de
                meeste keuze in units en combinaties.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
