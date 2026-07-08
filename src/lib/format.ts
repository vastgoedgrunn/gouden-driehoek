import type { UnitStatus } from "@/lib/types";

export function formatPrice(value: number | null): string {
  if (value == null) return "Prijs op aanvraag";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Berekent de voorverkoopprijs (normale prijs minus kortingspercentage),
 * afgerond op honderdtallen voor een net bedrag.
 */
export function presalePrice(value: number | null, discountPct = 10): number | null {
  if (value == null) return null;
  const discounted = value * (1 - discountPct / 100);
  return Math.round(discounted / 100) * 100;
}

/**
 * Leest het kortingspercentage veilig uit een (CMS-)waarde.
 * Lege string, null of niet-numerieke waarden vallen terug op de default,
 * zodat er nooit "0%" of "NaN%" op de site verschijnt.
 */
export function parseDiscount(raw: unknown, fallback = 10): number {
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/**
 * Valideert of een ingevoerde waarde een plausibel (echt) telefoonnummer is.
 * Toegestaan: cijfers met optioneel een leidende '+', plus scheidingstekens
 * (spatie, '-', '.', '(', ')', '/'). Na normalisatie moeten er 8–15 cijfers
 * overblijven (E.164-max = 15). Dit vangt onzin en te korte nummers af zonder
 * legitieme (inter)nationale formats te blokkeren.
 */
export function isValidPhone(raw: unknown): boolean {
  const value = String(raw ?? "").trim();
  if (!value) return false;
  // Alleen cijfers, spaties en gangbare telefoon-scheidingstekens toegestaan.
  if (!/^[+()/.\-\s\d]+$/.test(value)) return false;
  const plusCount = (value.match(/\+/g) ?? []).length;
  if (plusCount > 1 || (plusCount === 1 && value.trim()[0] !== "+")) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function statusLabel(status: UnitStatus): string {
  switch (status) {
    case "beschikbaar":
      return "Beschikbaar";
    case "optie":
      return "In optie";
    case "verkocht":
      return "Verkocht";
  }
}
