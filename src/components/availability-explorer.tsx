"use client";

import Link from "next/link";
import { useState } from "react";
import type { Unit } from "@/lib/types";
import { formatPrice, statusLabel } from "@/lib/format";
import { cn } from "@/lib/cn";

const blockStyle: Record<Unit["status"], string> = {
  beschikbaar:
    "bg-emerald-500/15 border-emerald-500/50 hover:bg-emerald-500/25 text-emerald-900",
  optie: "bg-amber-500/15 border-amber-500/50 hover:bg-amber-500/25 text-amber-900",
  verkocht:
    "bg-zinc-200/70 border-zinc-300 text-zinc-400 cursor-not-allowed",
};

function Floor({
  label,
  sub,
  units,
  onSelect,
  selected,
}: {
  label: string;
  sub: string;
  units: Unit[];
  onSelect: (u: Unit) => void;
  selected: Unit | null;
}) {
  const totalM2 = units.reduce((s, u) => s + Number(u.oppervlakte_m2), 0);
  return (
    <div className="reveal">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="font-display text-lg font-bold text-ink">{label}</h3>
        <span className="text-xs text-mist">{sub}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-white p-1.5">
        {units.map((u) => {
          const flex = Math.max(0.6, Number(u.oppervlakte_m2) / (totalM2 / units.length));
          const isSel = selected?.id === u.id;
          const disabled = u.status === "verkocht";
          return (
            <button
              key={u.id}
              type="button"
              style={{ flexGrow: flex }}
              onClick={() => !disabled && onSelect(u)}
              aria-label={`${label} ${u.nummer} — ${statusLabel(u.status)}, circa ${u.oppervlakte_m2} m²`}
              className={cn(
                "flex min-h-16 min-w-[64px] flex-col items-center justify-center rounded-lg border px-1 py-2 text-center transition-all",
                blockStyle[u.status],
                isSel && "ring-2 ring-gold ring-offset-1",
              )}
            >
              <span className="text-sm font-bold">{u.nummer}</span>
              <span className="text-[0.65rem] font-medium opacity-80">
                {u.oppervlakte_m2} m&sup2;
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityExplorer({ units }: { units: Unit[] }) {
  const [selected, setSelected] = useState<Unit | null>(null);
  const kantoren = units.filter((u) => u.type === "kantoor");
  const bedrijfsunits = units.filter((u) => u.type === "bedrijfsunit");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-5">
        {kantoren.length > 0 ? (
          <Floor
            label="Verdieping — kantoren"
            sub="vrij indeelbaar"
            units={kantoren}
            onSelect={setSelected}
            selected={selected}
          />
        ) : null}
        <Floor
          label="Begane grond — bedrijfsunits"
          sub="met overheaddeur"
          units={bedrijfsunits}
          onSelect={setSelected}
          selected={selected}
        />

        <div className="flex flex-wrap gap-4 pt-1 text-xs text-graphite">
          <Legend cls="bg-emerald-500" text="Beschikbaar" />
          <Legend cls="bg-amber-500" text="In optie" />
          <Legend cls="bg-zinc-400" text="Verkocht" />
        </div>
      </div>

      {/* Detailpaneel */}
      <div className="reveal rounded-2xl border border-line bg-white p-6">
        {selected ? (
          <div>
            <p className="eyebrow text-mist">
              {selected.type === "bedrijfsunit" ? "Bedrijfsunit" : "Kantoor"}
            </p>
            <h3 className="mt-1 font-display text-3xl font-extrabold text-ink">
              {selected.type === "bedrijfsunit" ? "Unit " : ""}
              {selected.nummer}
            </h3>
            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Status" value={statusLabel(selected.status)} />
              <Row label="Oppervlakte" value={`circa ${selected.oppervlakte_m2} m²`} />
              <Row label="Koopsom vanaf" value={formatPrice(selected.prijs_vanaf)} />
            </dl>
            {selected.beschrijving ? (
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                {selected.beschrijving}
              </p>
            ) : null}
            {selected.status !== "verkocht" ? (
              <Link
                href={`/contact?unit=${encodeURIComponent(selected.nummer)}`}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-gold px-6 font-semibold text-white transition-colors hover:bg-gold-dark"
              >
                Interesse in {selected.nummer}
              </Link>
            ) : (
              <p className="mt-6 rounded-lg bg-sand px-4 py-3 text-center text-sm text-mist">
                Deze ruimte is verkocht.
              </p>
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-56 flex-col items-center justify-center text-center">
            <span className="tri-marker mb-3" aria-hidden />
            <p className="font-display text-lg font-bold text-ink">
              Selecteer een ruimte
            </p>
            <p className="mt-1 text-sm text-graphite">
              Klik op een unit of kantoor om oppervlakte, prijs en status te
              zien.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Legend({ cls, text }: { cls: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-sm", cls)} aria-hidden />
      {text}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2">
      <dt className="text-graphite">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}
