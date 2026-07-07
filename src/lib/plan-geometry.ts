/**
 * Exacte geometrie van De Gouden Driehoek, afgeleid uit de architectplattegronden
 * (schaal 1:200). Het gebouw is een gelijkbenig trapezium:
 *   - voorzijde (straatzijde): 60 m breed  (y = 0)
 *   - achterzijde:             20 m breed  (y = 20)
 *   - diepte:                  20 m
 *   - zijgevels onder 45° (vandaar de "driehoek")
 *
 * Coördinaten in meters. x: 0 (links) → 60 (rechts). y: 0 (voorzijde) → 20 (achterzijde).
 * De linker schuine gevel volgt x = y, de rechter x = 60 − y.
 */

export type Pt = [number, number];
export type PlanShape = { nummer: string; type: string; points: Pt[] };
export type ContextShape = { label: string; points: Pt[]; kind: "core" | "shared" };

export const PLAN_WIDTH = 60;
export const PLAN_DEPTH = 20;

/** Omtrek van het gebouw (voorzijde breed, achterzijde smal). */
export const buildingOutline: Pt[] = [
  [0, 0],
  [60, 0],
  [40, 20],
  [20, 20],
];

/* ------------------------------------------------------------------ */
/* Begane grond — bedrijfsunits (12): A 6× · B 2× · C 2× · D 2×        */
/* ------------------------------------------------------------------ */

export const bedrijfsunitShapes: PlanShape[] = [
  // Voorste rij (straatzijde), y 0 → 10
  { nummer: "C1", type: "C", points: [[0, 0], [11, 0], [11, 10], [10, 10]] },
  { nummer: "A1", type: "A", points: [[11, 0], [16, 0], [16, 10], [11, 10]] },
  { nummer: "A2", type: "A", points: [[16, 0], [21, 0], [21, 10], [16, 10]] },
  { nummer: "A3", type: "A", points: [[21, 0], [26, 0], [26, 10], [21, 10]] },
  { nummer: "A4", type: "A", points: [[34, 0], [39, 0], [39, 10], [34, 10]] },
  { nummer: "A5", type: "A", points: [[39, 0], [44, 0], [44, 10], [39, 10]] },
  { nummer: "A6", type: "A", points: [[44, 0], [49, 0], [49, 10], [44, 10]] },
  { nummer: "C2", type: "C", points: [[49, 0], [60, 0], [50, 10], [49, 10]] },
  // Achterste rij, y 10 → 20
  { nummer: "D1", type: "D", points: [[10, 10], [24, 10], [24, 20], [20, 20]] },
  { nummer: "B1", type: "B", points: [[24, 10], [30, 10], [30, 20], [24, 20]] },
  { nummer: "B2", type: "B", points: [[30, 10], [36, 10], [36, 20], [30, 20]] },
  { nummer: "D2", type: "D", points: [[36, 10], [50, 10], [40, 20], [36, 20]] },
];

export const bedrijfsunitContext: ContextShape[] = [
  { kind: "core", label: "Centrale entree", points: [[26, 0], [34, 0], [34, 10], [26, 10]] },
];

/* ------------------------------------------------------------------ */
/* 1e verdieping — kantoren (20): A 6× · B 6× · C 2× · D 2× · E 2× · F 2× */
/*                                                                       */
/* Coördinaten zijn NAGEMETEN uit de architectplattegrond (1:200) via    */
/* pixel-kalibratie (B=3000mm, A=4000mm → ~58,5 mm/px) en geprojecteerd  */
/* op de gedeelde 60×20-box. Gemeten oppervlaktes komen overeen met de    */
/* legenda: C≈67 · A≈26 · B≈13,5 · E≈22 · D≈15 · F≈20 m².                 */
/* Langs beide schuine gevels, voor→achter: C → D → E → F.               */
/* ------------------------------------------------------------------ */

export const kantoorShapes: PlanShape[] = [
  // Voorrij (straatzijde): grote C-hoeken + 6× A rond de centrale trap/vide
  { nummer: "C1", type: "C", points: [[0, 0], [12.75, 0], [12.75, 8.07], [8.06, 8.07]] },
  { nummer: "A1", type: "A", points: [[12.75, 6.51], [16.89, 6.51], [16.89, 0], [12.75, 0]] },
  { nummer: "A2", type: "A", points: [[16.89, 6.51], [20.92, 6.51], [20.92, 0], [16.89, 0]] },
  { nummer: "A3", type: "A", points: [[20.92, 6.51], [25.01, 6.51], [25.01, 0], [20.92, 0]] },
  { nummer: "A4", type: "A", points: [[34.99, 6.51], [39.14, 6.51], [39.14, 0], [34.99, 0]] },
  { nummer: "A5", type: "A", points: [[39.14, 6.51], [43.23, 6.51], [43.23, 0], [39.14, 0]] },
  { nummer: "A6", type: "A", points: [[43.23, 6.51], [47.25, 6.51], [47.25, 0], [43.23, 0]] },
  { nummer: "C2", type: "C", points: [[60, 0], [47.25, 0], [47.25, 8.07], [51.94, 8.07]] },
  // D langs de schuine gevels (voorste helft middenband, bij C)
  { nummer: "D1", type: "D", points: [[10.82, 10.84], [14.85, 10.84], [14.85, 8.07], [8.06, 8.07]] },
  { nummer: "D2", type: "D", points: [[49.18, 10.84], [45.15, 10.84], [45.15, 8.07], [51.94, 8.07]] },
  // E langs de schuine gevels (achterste helft middenband, bij F)
  { nummer: "E1", type: "E", points: [[14.91, 14.94], [18.4, 14.94], [18.4, 10.84], [10.82, 10.84]] },
  { nummer: "E2", type: "E", points: [[45.09, 14.94], [41.6, 14.94], [41.6, 10.84], [49.18, 10.84]] },
  // Achterrij (kopgevel): F-kophoeken + 6× B
  { nummer: "F1", type: "F", points: [[19.96, 20], [20.74, 20], [20.74, 14.94], [14.91, 14.94]] },
  { nummer: "B1", type: "B", points: [[20.74, 20], [23.81, 20], [23.81, 15.36], [20.74, 15.36]] },
  { nummer: "B2", type: "B", points: [[23.81, 20], [26.93, 20], [26.93, 15.36], [23.81, 15.36]] },
  { nummer: "B3", type: "B", points: [[26.93, 20], [30, 20], [30, 15.36], [26.93, 15.36]] },
  { nummer: "B4", type: "B", points: [[30, 20], [33.13, 20], [33.13, 15.36], [30, 15.36]] },
  { nummer: "B5", type: "B", points: [[33.13, 20], [36.19, 20], [36.19, 15.36], [33.13, 15.36]] },
  { nummer: "B6", type: "B", points: [[36.19, 20], [39.26, 20], [39.26, 15.36], [36.19, 15.36]] },
  { nummer: "F2", type: "F", points: [[40.04, 20], [39.26, 20], [39.26, 14.94], [45.09, 14.94]] },
];

export const kantoorContext: ContextShape[] = [
  // Neutrale voorzieningenzones (voorportaal, wc's, kast, hal) — geen label
  { kind: "core", label: "", points: [[14.85, 14.94], [18.46, 14.94], [18.46, 8.07], [14.85, 8.07]] },
  { kind: "core", label: "", points: [[41.54, 14.94], [45.15, 14.94], [45.15, 8.07], [41.54, 8.07]] },
  // Trap/vide in de centrale kern aan de voorzijde
  { kind: "core", label: "Trap", points: [[25.01, 6.51], [34.99, 6.51], [34.99, 0], [25.01, 0]] },
  // Twee spreekruimtes die de gezamenlijke ruimte flankeren
  { kind: "shared", label: "Spreekruimte", points: [[18.46, 13.13], [24.11, 13.13], [24.11, 8.07], [18.46, 8.07]] },
  { kind: "shared", label: "Spreekruimte", points: [[35.89, 13.13], [41.54, 13.13], [41.54, 8.07], [35.89, 8.07]] },
  // Centrale gezamenlijke ruimte
  { kind: "shared", label: "Gezamenlijke ruimte", points: [[24.11, 14.94], [35.89, 14.94], [35.89, 6.51], [24.11, 6.51]] },
];

/** Zwaartepunt van een polygoon (voor labelplaatsing). */
export function centroid(points: Pt[]): Pt {
  const n = points.length;
  const sx = points.reduce((s, p) => s + p[0], 0);
  const sy = points.reduce((s, p) => s + p[1], 0);
  return [sx / n, sy / n];
}
