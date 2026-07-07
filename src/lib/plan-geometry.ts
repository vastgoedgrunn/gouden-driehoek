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
/* Indeling exact volgens de architectplattegrond. Langs beide schuine  */
/* gevels, van voor (straatzijde) naar achter (kopgevel): C → D → E → F. */
/* Voorrij: C-hoek · A A A · trap/vide · A A A · C-hoek.                 */
/* Achterrij: F-kophoek · B B B B B B · F-kophoek.                       */
/* Dieptebanden: A-voorrij 0–6 · brede middenband 6–15.5 · B-rij 15.5–20 */
/* ------------------------------------------------------------------ */

export const kantoorShapes: PlanShape[] = [
  // Voorrij (straatzijde), y 0 → 6: grote C-hoeken + 6× A rond de centrale kern
  { nummer: "C1", type: "C", points: [[0, 0], [14, 0], [14, 6], [6, 6]] },
  { nummer: "A1", type: "A", points: [[14, 0], [18, 0], [18, 6], [14, 6]] },
  { nummer: "A2", type: "A", points: [[18, 0], [22, 0], [22, 6], [18, 6]] },
  { nummer: "A3", type: "A", points: [[22, 0], [26, 0], [26, 6], [22, 6]] },
  { nummer: "A4", type: "A", points: [[34, 0], [38, 0], [38, 6], [34, 6]] },
  { nummer: "A5", type: "A", points: [[38, 0], [42, 0], [42, 6], [38, 6]] },
  { nummer: "A6", type: "A", points: [[42, 0], [46, 0], [46, 6], [42, 6]] },
  { nummer: "C2", type: "C", points: [[46, 0], [60, 0], [54, 6], [46, 6]] },
  // Middenband, voorste helft (y 6 → 10.5): D langs de schuine gevels (bij C)
  { nummer: "D1", type: "D", points: [[6, 6], [12, 6], [12, 10.5], [10.5, 10.5]] },
  { nummer: "D2", type: "D", points: [[48, 6], [54, 6], [49.5, 10.5], [48, 10.5]] },
  // Middenband, achterste helft (y 10.5 → 15.5): E langs de schuine gevels (bij F)
  { nummer: "E1", type: "E", points: [[10.5, 10.5], [17.5, 10.5], [17.5, 15.5], [15.5, 15.5]] },
  { nummer: "E2", type: "E", points: [[42.5, 10.5], [49.5, 10.5], [44.5, 15.5], [42.5, 15.5]] },
  // Achterrij (kopgevel), y 15.5 → 20: F-kophoeken + 6× B
  { nummer: "F1", type: "F", points: [[15.5, 15.5], [21, 15.5], [21, 20], [20, 20]] },
  { nummer: "B1", type: "B", points: [[21, 15.5], [24, 15.5], [24, 20], [21, 20]] },
  { nummer: "B2", type: "B", points: [[24, 15.5], [27, 15.5], [27, 20], [24, 20]] },
  { nummer: "B3", type: "B", points: [[27, 15.5], [30, 15.5], [30, 20], [27, 20]] },
  { nummer: "B4", type: "B", points: [[30, 15.5], [33, 15.5], [33, 20], [30, 20]] },
  { nummer: "B5", type: "B", points: [[33, 15.5], [36, 15.5], [36, 20], [33, 20]] },
  { nummer: "B6", type: "B", points: [[36, 15.5], [39, 15.5], [39, 20], [36, 20]] },
  { nummer: "F2", type: "F", points: [[39, 15.5], [44.5, 15.5], [40, 20], [39, 20]] },
];

export const kantoorContext: ContextShape[] = [
  // Neutrale voorzieningenzones (voorportaal, wc's, kast, hal) — geen label
  { kind: "core", label: "", points: [[12, 6], [24, 6], [24, 10.5], [12, 10.5]] },
  { kind: "core", label: "", points: [[36, 6], [48, 6], [48, 10.5], [36, 10.5]] },
  // Trap/vide in de centrale kern aan de voorzijde
  { kind: "core", label: "Trap", points: [[26, 0], [34, 0], [34, 6], [26, 6]] },
  // Twee spreekruimtes die de gezamenlijke ruimte flankeren
  { kind: "shared", label: "Spreekruimte", points: [[17.5, 10.5], [24, 10.5], [24, 15.5], [17.5, 15.5]] },
  { kind: "shared", label: "Spreekruimte", points: [[36, 10.5], [42.5, 10.5], [42.5, 15.5], [36, 15.5]] },
  // Centrale gezamenlijke ruimte
  { kind: "shared", label: "Gezamenlijke ruimte", points: [[24, 6], [36, 6], [36, 15.5], [24, 15.5]] },
];

/** Zwaartepunt van een polygoon (voor labelplaatsing). */
export function centroid(points: Pt[]): Pt {
  const n = points.length;
  const sx = points.reduce((s, p) => s + p[0], 0);
  const sy = points.reduce((s, p) => s + p[1], 0);
  return [sx / n, sy / n];
}
