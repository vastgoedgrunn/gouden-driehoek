import type { Unit } from "@/lib/types";

export type BedrijfsunitType = {
  code: string;
  oppervlakte: string;
  label: string;
  /** Tailwind classes voor het kleurstaal (afgestemd op de plattegrond) */
  swatch: string;
};

export const bedrijfsunitTypes: BedrijfsunitType[] = [
  { code: "A", oppervlakte: "ca. 50 m²", label: "Standaardunit aan de voorzijde", swatch: "bg-pink-300" },
  { code: "B", oppervlakte: "ca. 75 m²", label: "Ruime unit, centraal gelegen", swatch: "bg-emerald-300" },
  { code: "C", oppervlakte: "ca. 43 m²", label: "Hoekunit, evt. uit te breiden", swatch: "bg-orange-200" },
  { code: "D", oppervlakte: "ca. 100 m²", label: "Royale unit met veel ruimte", swatch: "bg-sky-300" },
];

export function countByType(units: Unit[], code: string): number {
  return units.filter((u) => u.nummer.startsWith(code)).length;
}
