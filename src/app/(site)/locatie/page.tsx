import type { Metadata } from "next";
import { Car, MapPin, ParkingSquare, Navigation, Building2, Zap } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { LocationMapLoader } from "@/components/location-map-loader";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Locatie & bereikbaarheid",
  description:
    "De Gouden Driehoek ligt aan de Kathodeweg op bedrijventerrein Dideldom in Stadskanaal — goed bereikbaar, zichtbaar en met ruime parkeergelegenheid op eigen terrein.",
  alternates: { canonical: "/locatie" },
};

const { address, geo } = siteConfig;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`;

export default function LocatiePage() {
  return (
    <>
      <PageHero
        eyebrow="Locatie & bereikbaarheid"
        title="Aan de Kathodeweg in Stadskanaal"
        intro="Een zichtbare, goed bereikbare plek op bedrijventerrein Dideldom — met ruimte om te ondernemen en dichtbij de belangrijkste verbindingen in de regio."
        image="/impressies/impressie-02.webp"
        imageAlt="De Gouden Driehoek in de omgeving van Stadskanaal"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal">
            <div className="overflow-hidden rounded-2xl border border-line">
              <LocationMapLoader />
            </div>
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-dark">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-bold text-ink">{address.street}</p>
                  <p className="text-sm text-graphite">
                    {address.parcel} · {address.postalCode} {address.city}
                  </p>
                </div>
              </div>
              <ButtonLink
                href={mapsUrl}
                variant="outline"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" />
                Route plannen
              </ButtonLink>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Bereikbaarheid" title="Goed verbonden" />
            <ul className="reveal mt-6 space-y-4">
              <Item icon={<Car className="h-5 w-5" />} title="Met de auto" text="Vlot bereikbaar via de N366 en de doorgaande wegen rond Stadskanaal, met een goede aansluiting op de A37." />
              <Item icon={<ParkingSquare className="h-5 w-5" />} title="Ruim parkeren" text="Volop parkeergelegenheid op eigen terrein, direct bij de units en kantoren." />
              <Item icon={<Zap className="h-5 w-5" />} title="Voorbereid op de toekomst" text="Ruimte voor laadvoorzieningen voor elektrische auto's op eigen terrein." />
              <Item icon={<Building2 className="h-5 w-5" />} title="Bedrijventerrein Dideldom" text="Gelegen tussen gevestigde ondernemers op een representatief en zichtbaar terrein." />
            </ul>
          </div>
        </div>
      </Section>

      {/* Reistijden */}
      <Section className="bg-white">
        <SectionHeading
          align="center"
          eyebrow="In de regio"
          title="Centraal in Oost-Groningen"
          intro="Strategisch gelegen ten opzichte van de omliggende steden en verbindingen."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Travel place="Groningen" time="± 40 min" detail="Via de N366 en A7" />
          <Travel place="Emmen" time="± 30 min" detail="Via de N366 / A37" />
          <Travel place="Veendam" time="± 20 min" detail="Directe verbinding" />
        </div>
        <div className="reveal mt-10 text-center">
          <ButtonLink href="/contact">
            Toon je interesse
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function Item({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-dark">
        {icon}
      </span>
      <div>
        <h3 className="font-display font-bold text-ink">{title}</h3>
        <p className="text-sm text-graphite">{text}</p>
      </div>
    </li>
  );
}

function Travel({ place, time, detail }: { place: string; time: string; detail: string }) {
  return (
    <div className="reveal card-lift rounded-2xl border border-line bg-cream p-6 text-center">
      <p className="font-display text-3xl font-extrabold text-gold-dark">{time}</p>
      <p className="mt-2 font-display text-lg font-bold text-ink">{place}</p>
      <p className="mt-1 text-sm text-graphite">{detail}</p>
    </div>
  );
}
