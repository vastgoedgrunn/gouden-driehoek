"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Unit } from "@/lib/types";
import { formatPrice, statusLabel } from "@/lib/format";
import { cn } from "@/lib/cn";
import {
  bedrijfsunitShapes,
  bedrijfsunitContext,
  kantoorShapes,
  kantoorContext,
  buildingOutline,
  centroid,
  type PlanShape,
  type ContextShape,
  type Pt,
} from "@/lib/plan-geometry";

/* SVG-projectie: plan (m) → viewBox. Voorzijde onder, achterzijde boven. */
const PAD_X = 2.5;
const PAD_T = 2.5;
const PAD_B = 4;
const VW = 60 + PAD_X * 2;
const VH = 20 + PAD_T + PAD_B;
const sx = (x: number) => x + PAD_X;
const sy = (y: number) => 20 - y + PAD_T;
const toPoly = (pts: Pt[]) => pts.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ");

const fillByStatus: Record<Unit["status"], { fill: string; stroke: string; text: string }> = {
  beschikbaar: { fill: "#d1fae5", stroke: "#059669", text: "#065f46" },
  optie: { fill: "#fef3c7", stroke: "#d97706", text: "#92400e" },
  verkocht: { fill: "#e9eaec", stroke: "#c2c5cb", text: "#a2a5ac" },
};

export function AvailabilityExplorer({ units }: { units: Unit[] }) {
  const [selected, setSelected] = useState<Unit | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const isKantoor = units.some((u) => u.type === "kantoor");
  const shapes: PlanShape[] = isKantoor ? kantoorShapes : bedrijfsunitShapes;
  const context: ContextShape[] = isKantoor ? kantoorContext : bedrijfsunitContext;
  const labelSize = isKantoor ? 1.15 : 1.7;

  const byNummer = useMemo(() => {
    const m = new Map<string, Unit>();
    units.forEach((u) => m.set(u.nummer, u));
    return m;
  }, [units]);

  const drawn = shapes.filter((s) => byNummer.has(s.nummer));
  const selectedShape = drawn.find((s) => s.nummer === selected?.nummer);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* Interactieve plattegrond */}
      <div className="reveal rounded-2xl border border-line bg-white p-3 sm:p-4">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="h-auto w-full select-none"
          role="group"
          aria-label={
            isKantoor
              ? "Interactieve plattegrond kantoren, 1e verdieping"
              : "Interactieve plattegrond bedrijfsunits, begane grond"
          }
        >
          {/* Gebouwomtrek */}
          <polygon
            points={toPoly(buildingOutline)}
            fill="#faf9f6"
            stroke="#1c1d20"
            strokeWidth={0.35}
            strokeLinejoin="round"
          />

          {/* Gedeelde ruimtes / kern (niet selecteerbaar) */}
          {context.map((c) => {
            const [cx, cy] = centroid(c.points);
            return (
              <g key={c.label}>
                <polygon
                  points={toPoly(c.points)}
                  fill={c.kind === "core" ? "#efece4" : "#f6eedc"}
                  stroke="#d8d2c4"
                  strokeWidth={0.15}
                  strokeDasharray={c.kind === "core" ? "0.6 0.5" : undefined}
                />
                <text
                  x={sx(cx)}
                  y={sy(cy)}
                  fontSize={c.kind === "shared" ? 1.25 : 0.95}
                  fill="#8b8e96"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ pointerEvents: "none" }}
                >
                  {c.kind === "shared" ? (
                    <>
                      <tspan x={sx(cx)} dy="-0.5">Gezamenlijke</tspan>
                      <tspan x={sx(cx)} dy="1.5">ruimte</tspan>
                    </>
                  ) : (
                    c.label
                  )}
                </text>
              </g>
            );
          })}

          {/* Units */}
          {drawn.map((s) => {
            const unit = byNummer.get(s.nummer)!;
            const [cx, cy] = centroid(s.points);
            const c = fillByStatus[unit.status];
            const disabled = unit.status === "verkocht";
            const isSel = selected?.nummer === s.nummer;
            const isHover = hovered === s.nummer;
            return (
              <g
                key={s.nummer}
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-label={`${isKantoor ? "Kantoor" : "Unit"} ${s.nummer} — ${statusLabel(
                  unit.status,
                )}, circa ${unit.oppervlakte_m2} m²`}
                aria-pressed={isSel}
                onClick={() => !disabled && setSelected(unit)}
                onKeyDown={(e) => {
                  if (!disabled && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setSelected(unit);
                  }
                }}
                onMouseEnter={() => setHovered(s.nummer)}
                onMouseLeave={() => setHovered((h) => (h === s.nummer ? null : h))}
                style={{ cursor: disabled ? "not-allowed" : "pointer", outline: "none" }}
              >
                <title>{`${s.nummer} · ${statusLabel(unit.status)} · ca. ${unit.oppervlakte_m2} m²`}</title>
                <polygon
                  points={toPoly(s.points)}
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth={0.18}
                  strokeLinejoin="round"
                  style={{
                    transition: "fill 0.18s ease, opacity 0.18s ease",
                    opacity: isHover && !disabled ? 0.75 : 1,
                  }}
                />
                <text
                  x={sx(cx)}
                  y={sy(cy)}
                  fontSize={labelSize}
                  fontWeight={700}
                  fill={c.text}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ pointerEvents: "none" }}
                >
                  {s.nummer}
                </text>
              </g>
            );
          })}

          {/* Geselecteerde unit bovenop (gouden rand) */}
          {selectedShape ? (
            <polygon
              points={toPoly(selectedShape.points)}
              fill="none"
              stroke="#a07e3e"
              strokeWidth={0.6}
              strokeLinejoin="round"
              style={{ pointerEvents: "none" }}
            />
          ) : null}

          {/* Straatzijde-indicatie */}
          <text
            x={sx(30)}
            y={sy(0) + 2.6}
            fontSize={1.15}
            fill="#8b8e96"
            textAnchor="middle"
            letterSpacing="0.15"
          >
            STRAATZIJDE · ENTREE
          </text>
        </svg>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 px-1 text-xs text-graphite">
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
              {selected.type === "bedrijfsunit" ? "Unit " : "Kantoor "}
              {selected.nummer}
            </h3>
            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Status" value={statusLabel(selected.status)} />
              <Row label="Oppervlakte" value={`circa ${selected.oppervlakte_m2} m²`} />
              <Row
                label={selected.prijs_vanaf ? "Koopsom vanaf" : "Prijs"}
                value={formatPrice(selected.prijs_vanaf)}
              />
            </dl>
            {selected.beschrijving ? (
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                {selected.beschrijving}
              </p>
            ) : null}
            {selected.status !== "verkocht" ? (
              <Link
                href={`/contact?unit=${encodeURIComponent(
                  `${selected.type === "kantoor" ? "kantoor" : "unit"} ${selected.nummer}`,
                )}`}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-gold px-6 font-semibold text-white transition-all hover:bg-gold-dark hover:shadow-md"
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
              Klik in de plattegrond op een {isKantoor ? "kantoor" : "unit"} voor
              oppervlakte, prijs en status.
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
