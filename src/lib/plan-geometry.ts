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
/* ------------------------------------------------------------------ */

export const kantoorShapes: PlanShape[] = [
  // Voorste rij (straatzijde), y 0 → 7
  { nummer: "C1", type: "C", points: [[0, 0], [16, 0], [16, 7], [7, 7]] },
  { nummer: "A1", type: "A", points: [[16, 0], [20, 0], [20, 7], [16, 7]] },
  { nummer: "A2", type: "A", points: [[20, 0], [24, 0], [24, 7], [20, 7]] },
  { nummer: "A3", type: "A", points: [[24, 0], [28, 0], [28, 7], [24, 7]] },
  { nummer: "A4", type: "A", points: [[32, 0], [36, 0], [36, 7], [32, 7]] },
  { nummer: "A5", type: "A", points: [[36, 0], [40, 0], [40, 7], [36, 7]] },
  { nummer: "A6", type: "A", points: [[40, 0], [44, 0], [44, 7], [40, 7]] },
  { nummer: "C2", type: "C", points: [[44, 0], [60, 0], [53, 7], [44, 7]] },
  // Middenzone, y 7 → 13.5 (naast de gezamenlijke ruimte)
  { nummer: "E1", type: "E", points: [[7, 7], [15, 7], [15, 13.5], [13.5, 13.5]] },
  { nummer: "D1", type: "D", points: [[15, 7], [20, 7], [20, 13.5], [15, 13.5]] },
  { nummer: "D2", type: "D", points: [[40, 7], [45, 7], [45, 13.5], [40, 13.5]] },
  { nummer: "E2", type: "E", points: [[45, 7], [53, 7], [46.5, 13.5], [45, 13.5]] },
  // Achterste rij, y 13.5 → 20
  { nummer: "F1", type: "F", points: [[13.5, 13.5], [21, 13.5], [21, 20], [20, 20]] },
  { nummer: "B1", type: "B", points: [[21, 13.5], [24, 13.5], [24, 20], [21, 20]] },
  { nummer: "B2", type: "B", points: [[24, 13.5], [27, 13.5], [27, 20], [24, 20]] },
  { nummer: "B3", type: "B", points: [[27, 13.5], [30, 13.5], [30, 20], [27, 20]] },
  { nummer: "B4", type: "B", points: [[30, 13.5], [33, 13.5], [33, 20], [30, 20]] },
  { nummer: "B5", type: "B", points: [[33, 13.5], [36, 13.5], [36, 20], [33, 20]] },
  { nummer: "B6", type: "B", points: [[36, 13.5], [39, 13.5], [39, 20], [36, 20]] },
  { nummer: "F2", type: "F", points: [[39, 13.5], [46.5, 13.5], [40, 20], [39, 20]] },
];

export const kantoorContext: ContextShape[] = [
  { kind: "core", label: "Trap", points: [[28, 0], [32, 0], [32, 7], [28, 7]] },
  { kind: "shared", label: "Gezamenlijke ruimte", points: [[20, 7], [40, 7], [40, 13.5], [20, 13.5]] },
];

/** Zwaartepunt van een polygoon (voor labelplaatsing). */
export function centroid(points: Pt[]): Pt {
  const n = points.length;
  const sx = points.reduce((s, p) => s + p[0], 0);
  const sy = points.reduce((s, p) => s + p[1], 0);
  return [sx / n, sy / n];
}
