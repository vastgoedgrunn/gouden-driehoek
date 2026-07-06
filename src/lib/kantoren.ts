import type { Unit } from "@/lib/types";

export type KantoorType = {
  code: string;
  oppervlakte: string;
  label: string;
  /** Tailwind classes voor het kleurstaal (afgestemd op de plattegrond) */
  swatch: string;
};

export const kantoorTypes: KantoorType[] = [
  { code: "A", oppervlakte: "ca. 26 m²", label: "Aan de voorgevel", swatch: "bg-pink-300" },
  { code: "B", oppervlakte: "ca. 13,5 m²", label: "Compact, centraal gelegen", swatch: "bg-emerald-200" },
  { code: "C", oppervlakte: "ca. 67 m²", label: "Royale hoekunit", swatch: "bg-sky-200" },
  { code: "D", oppervlakte: "ca. 15 m²", label: "Efficiënte unit", swatch: "bg-orange-200" },
  { code: "E", oppervlakte: "ca. 22 m²", label: "Nabij de gezamenlijke ruimte", swatch: "bg-yellow-200" },
  { code: "F", oppervlakte: "ca. 20 m²", label: "In de kopgevel", swatch: "bg-slate-300" },
];

export function countByType(units: Unit[], code: string): number {
  return units.filter((u) => u.nummer.startsWith(code)).length;
}

/** Mogelijke invullingen van de gezamenlijke ruimte (uit het ontwerpvoorstel). */
export const gezamenlijkeRuimteGebruik = [
  "Vergaderruimtes voor formeel en informeel overleg",
  "Loungegedeelte met comfortabele zitplekken",
  "Flexibele werkplekken / hot-desking",
  "Koffie- en theefaciliteiten",
  "Lunchruimte met kitchenette",
  "Presentatie- en trainingsruimte",
  "Creatieve hoek met whiteboards",
  "Spel- en ontspanningsruimte",
  "Lees- en bibliotheekhoek",
  "Geluidsdichte telefonie-/videocabines",
  "Groen en planten voor een prettige sfeer",
  "Fitness- en yogaruimte",
  "Evenementen- en netwerkruimte",
  "Stilte- en meditatieruimte",
  "Expositieruimte voor kunst",
  "Technologiehoek (3D-printer, VR)",
];
