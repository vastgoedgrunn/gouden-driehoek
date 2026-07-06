import type { Metadata } from "next";
import { Car, MapPin, ParkingSquare, Train } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { LocationMapLoader } from "@/components/location-map-loader";

export const metadata: Metadata = {
  title: "Locatie & bereikbaarheid",
  description:
    "De Gouden Driehoek ligt centraal en goed bereikbaar in Stadskanaal, met ruime parkeergelegenheid.",
};

export default function LocatiePage() {
  return (
    <>
      <PageHero
        eyebrow="Locatie & bereikbaarheid"
        title="Centraal in Stadskanaal"
        intro="Een zichtbare, goed bereikbare plek met ruimte om te ondernemen — dichtbij de belangrijkste verbindingen in de regio."
        image="/impressies/impressie-02.webp"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal">
            <LocationMapLoader />
            <p className="mt-3 text-xs text-mist">
              Locatie indicatief weergegeven. Exacte plaats volgt.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Bereikbaarheid" title="Goed verbonden" />
            <ul className="reveal mt-6 space-y-4">
              <Item icon={<Car className="h-5 w-5" />} title="Met de auto" text="Vlot bereikbaar via de doorgaande wegen rond Stadskanaal." />
              <Item icon={<ParkingSquare className="h-5 w-5" />} title="Parkeren" text="Ruime parkeergelegenheid op eigen terrein." />
              <Item icon={<Train className="h-5 w-5" />} title="Openbaar vervoer" text="Goede busverbindingen in de directe omgeving." />
              <Item icon={<MapPin className="h-5 w-5" />} title="Regio" text="Strategisch gelegen in het hart van Oost-Groningen." />
            </ul>
          </div>
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
