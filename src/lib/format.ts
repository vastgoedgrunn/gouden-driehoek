import type { UnitStatus } from "@/lib/types";

export function formatPrice(value: number | null): string {
  if (value == null) return "Prijs op aanvraag";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
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
