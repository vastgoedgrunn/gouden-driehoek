import Link from "next/link";
import { ArrowRight, Maximize2 } from "lucide-react";
import type { Unit } from "@/lib/types";
import { PriceTag } from "@/components/price-tag";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/cn";

export function UnitCard({ unit, discount = 10 }: { unit: Unit; discount?: number }) {
  const sold = unit.status === "verkocht";
  return (
    <div
      className={cn(
        "reveal group relative flex flex-col rounded-2xl border border-line bg-white p-5",
        sold ? "opacity-75" : "card-lift",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="eyebrow text-mist">
            {unit.type === "bedrijfsunit" ? "Bedrijfsunit" : "Kantoor"}
          </p>
          <h3 className="mt-1 font-display text-2xl font-extrabold text-ink">
            {unit.type === "bedrijfsunit" ? "Unit" : ""} {unit.nummer}
          </h3>
        </div>
        <StatusBadge status={unit.status} />
      </div>

      <div className="mt-4 flex items-center gap-2 text-graphite">
        <Maximize2 className="h-4 w-4 text-gold-dark" />
        <span className="text-sm font-medium">
          circa {unit.oppervlakte_m2} m&sup2;
        </span>
      </div>

      {unit.beschrijving ? (
        <p className="mt-3 text-sm leading-relaxed text-graphite">
          {unit.beschrijving}
        </p>
      ) : null}

      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <PriceTag value={unit.prijs_vanaf} discount={discount} />
        {!sold ? (
          <Link
            href={`/contact?unit=${encodeURIComponent(unit.nummer)}&type=${unit.type}`}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-gold-dark transition-colors hover:text-ink"
          >
            Interesse
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span className="text-sm font-medium text-mist">Verkocht</span>
        )}
      </div>
    </div>
  );
}
