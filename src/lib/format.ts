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
