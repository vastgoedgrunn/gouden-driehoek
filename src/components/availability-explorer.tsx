"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Unit } from "@/lib/types";
import { statusLabel } from "@/lib/format";
import { PriceTag } from "@/components/price-tag";
import { ButtonLink } from "@/components/ui/button";
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

const chipDot: Record<Unit["status"], string> = {
  beschikbaar: "bg-emerald-500",
  optie: "bg-amber-500",
  verkocht: "bg-zinc-400",
};

function verdiepingLabel(v: number) {
  if (v <= 0) return "Begane grond";
  if (v === 1) return "1e verdieping";
  return `${v}e verdieping`;
}

export function AvailabilityExplorer({
  units,
  discount = 10,
}: {
  units: Unit[];
  discount?: number;
}) {
  const [selected, setSelected] = useState<Unit | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef<(SVGGElement | null)[]>([]);

  const isKantoor = units.some((u) => u.type === "kantoor");
  const shapes: PlanShape[] = isKantoor ? kantoorShapes : bedrijfsunitShapes;
  const context: ContextShape[] = isKantoor ? kantoorContext : bedrijfsunitContext;
  const labelSize = isKantoor ? 1.15 : 1.7;

  const byNummer = useMemo(() => {
    const m = new Map<string, Unit>();
    units.forEach((u) => m.set(u.nummer, u));
    return m;
  }, [units]);

  const drawn = useMemo(
    () => shapes.filter((s) => byNummer.has(s.nummer)),
    [shapes, byNummer],
  );
  const selectedShape = drawn.find((s) => s.nummer === selected?.nummer);

  const counts = useMemo(
    () => ({
      beschikbaar: units.filter((u) => u.status === "beschikbaar").length,
      optie: units.filter((u) => u.status === "optie").length,
      verkocht: units.filter((u) => u.status === "verkocht").length,
    }),
    [units],
  );

  // Roving tabindex: standaard staat de eerste niet-verkochte unit op tabIndex 0.
  const firstNavigable = useMemo(
    () => drawn.findIndex((s) => byNummer.get(s.nummer)!.status !== "verkocht"),
    [drawn, byNummer],
  );
  const [activeIndex, setActiveIndex] = useState<number>(
    firstNavigable === -1 ? 0 : firstNavigable,
  );

  function select(unit: Unit) {
    if (unit.status === "verkocht") return;
    const willDeselect = selected?.nummer === unit.nummer;
    setSelected(willDeselect ? null : unit);
    const idx = drawn.findIndex((s) => s.nummer === unit.nummer);
    if (idx >= 0) setActiveIndex(idx);
    // Op smalle schermen staat het detailpaneel onder de plattegrond → in beeld brengen.
    if (
      !willDeselect &&
      typeof window !== "undefined" &&
      window.innerWidth < 1024
    ) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      );
    }
  }

  function moveFocus(from: number, dir: 1 | -1) {
    const n = drawn.length;
    let i = from;
    for (let step = 0; step < n; step++) {
      i = (i + dir + n) % n;
      if (byNummer.get(drawn[i].nummer)!.status !== "verkocht") {
        setActiveIndex(i);
        unitRefs.current[i]?.focus();
        return;
      }
    }
  }

  const sortedUnits = useMemo(
    () => drawn.map((s) => byNummer.get(s.nummer)!),
    [drawn, byNummer],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* Interactieve plattegrond + unitlijst */}
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
          <defs>
            {/* Zachte gouden gloed rond de geselecteerde unit */}
            <filter id="gd-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="0.55"
                floodColor="#a07e3e"
                floodOpacity="0.5"
              />
            </filter>
          </defs>

          {/* Gebouwomtrek */}
          <polygon
            points={toPoly(buildingOutline)}
            fill="#faf9f6"
            stroke="#1c1d20"
            strokeWidth={0.35}
            strokeLinejoin="round"
          />

          {/* Gedeelde ruimtes / kern (niet selecteerbaar) */}
          {context.map((c, ci) => {
            const [cx, cy] = centroid(c.points);
            const words = c.label ? c.label.split(" ") : [];
            const multiline = c.kind === "shared" && words.length > 1;
            return (
              <g key={ci}>
                <polygon
                  points={toPoly(c.points)}
                  fill={c.kind === "core" ? "#efece4" : "#f6eedc"}
                  stroke="#d8d2c4"
                  strokeWidth={0.15}
                  strokeDasharray={c.kind === "core" ? "0.6 0.5" : undefined}
                />
                {c.label ? (
                  <text
                    x={sx(cx)}
                    y={sy(cy)}
                    fontSize={multiline ? 1.25 : 0.9}
                    fill="#6b6e76"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ pointerEvents: "none" }}
                  >
                    {multiline
                      ? words.map((w, wi) => (
                          <tspan
                            key={wi}
                            x={sx(cx)}
                            dy={wi === 0 ? `${-(words.length - 1) * 0.6}em` : "1.2em"}
                          >
                            {w}
                          </tspan>
                        ))
                      : c.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {/* Units */}
          {drawn.map((s, i) => {
            const unit = byNummer.get(s.nummer)!;
            const [cx, cy] = centroid(s.points);
            const c = fillByStatus[unit.status];
            const disabled = unit.status === "verkocht";
            const isSel = selected?.nummer === s.nummer;
            const isHover = hovered === s.nummer;
            const emphasised = (isHover || isSel) && !disabled;
            return (
              <g
                key={s.nummer}
                ref={(el) => {
                  unitRefs.current[i] = el;
                }}
                className="plan-unit"
                role="button"
                tabIndex={disabled ? -1 : i === activeIndex ? 0 : -1}
                aria-label={`${isKantoor ? "Kantoor" : "Unit"} ${s.nummer}, ${statusLabel(
                  unit.status,
                )}, circa ${unit.oppervlakte_m2} m²`}
                aria-pressed={isSel}
                onClick={() => select(unit)}
                onFocus={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(unit);
                  } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    moveFocus(i, 1);
                  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    moveFocus(i, -1);
                  } else if (e.key === "Escape") {
                    setSelected(null);
                  }
                }}
                onMouseEnter={() => setHovered(s.nummer)}
                onMouseLeave={() => setHovered((h) => (h === s.nummer ? null : h))}
                style={{ cursor: disabled ? "not-allowed" : "pointer" }}
              >
                <title>{`${s.nummer} · ${statusLabel(unit.status)} · ca. ${unit.oppervlakte_m2} m²`}</title>
                <polygon
                  points={toPoly(s.points)}
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth={emphasised ? 0.42 : 0.18}
                  strokeLinejoin="round"
                  style={{
                    transition:
                      "fill 0.2s ease, opacity 0.2s ease, stroke-width 0.2s ease",
                    opacity: emphasised ? 0.85 : 1,
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

          {/* Geselecteerde unit bovenop: gouden rand + zachte gloed + lichte fill */}
          {selectedShape ? (
            <polygon
              key={selectedShape.nummer}
              className="gd-plan-selected"
              points={toPoly(selectedShape.points)}
              fill="#a07e3e"
              fillOpacity={0.1}
              stroke="#a07e3e"
              strokeWidth={0.6}
              strokeLinejoin="round"
              filter="url(#gd-glow)"
              style={{ pointerEvents: "none" }}
            />
          ) : null}

          {/* Straatzijde-indicatie */}
          <text
            x={sx(30)}
            y={sy(0) + 2.6}
            fontSize={1.15}
            fill="#6b6e76"
            textAnchor="middle"
            letterSpacing="0.15"
          >
            STRAATZIJDE · ENTREE
          </text>
        </svg>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 px-1 text-xs text-graphite">
          <Legend cls="bg-emerald-500" text="Beschikbaar" count={counts.beschikbaar} />
          <Legend cls="bg-amber-500" text="In optie" count={counts.optie} />
          <Legend cls="bg-zinc-400" text="Verkocht" count={counts.verkocht} />
        </div>

        {/* Tikbare unitlijst — vooral handig op mobiel */}
        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-2 px-1 text-xs font-medium text-mist">
            Of tik op een {isKantoor ? "kantoor" : "unit"}:
          </p>
          <div className="flex flex-wrap gap-2">
            {sortedUnits.map((unit) => {
              const disabled = unit.status === "verkocht";
              const isSel = selected?.nummer === unit.nummer;
              return (
                <button
                  key={unit.id}
                  type="button"
                  disabled={disabled}
                  aria-pressed={isSel}
                  aria-label={`${isKantoor ? "Kantoor" : "Unit"} ${unit.nummer}, ${statusLabel(unit.status)}, circa ${unit.oppervlakte_m2} m²`}
                  onClick={() => select(unit)}
                  onMouseEnter={() => !disabled && setHovered(unit.nummer)}
                  onMouseLeave={() =>
                    setHovered((h) => (h === unit.nummer ? null : h))
                  }
                  onFocus={() => !disabled && setHovered(unit.nummer)}
                  onBlur={() => setHovered((h) => (h === unit.nummer ? null : h))}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                    disabled
                      ? "cursor-not-allowed border-line bg-sand text-mist line-through"
                      : isSel
                        ? "border-gold bg-gold-tint text-gold-dark shadow-sm"
                        : "border-line bg-white text-ink-soft hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-dark",
                  )}
                >
                  <span className={cn("h-2 w-2 rounded-full", chipDot[unit.status])} aria-hidden />
                  {unit.nummer}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailpaneel */}
      <div
        ref={detailRef}
        className="reveal scroll-mt-24 rounded-2xl border border-line bg-white p-6"
      >
        {selected ? (
          <div key={selected.id} className="gd-modal-panel">
            <p className="eyebrow text-mist">
              {selected.type === "bedrijfsunit" ? "Bedrijfsunit" : "Kantoor"}
            </p>
            <h3 className="mt-1 font-display text-3xl font-extrabold text-ink">
              {selected.type === "bedrijfsunit" ? "Unit " : "Kantoor "}
              {selected.nummer}
            </h3>
            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Status" value={statusLabel(selected.status)} />
              <Row label="Type" value={`Type ${selected.nummer.replace(/[0-9]/g, "")}`} />
              <Row label="Verdieping" value={verdiepingLabel(selected.verdieping)} />
              <Row label="Oppervlakte" value={`circa ${selected.oppervlakte_m2} m²`} />
            </dl>
            <div className="mt-4 border-t border-line pt-4">
              <PriceTag value={selected.prijs_vanaf} discount={discount} size="lg" />
            </div>
            {selected.beschrijving ? (
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                {selected.beschrijving}
              </p>
            ) : null}
            {selected.status !== "verkocht" ? (
              <ButtonLink
                href={`/contact?unit=${encodeURIComponent(selected.nummer)}&type=${selected.type}`}
                size="lg"
                className="mt-6 w-full"
              >
                Interesse in {selected.nummer}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
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
              Klik in de plattegrond of tik op een {isKantoor ? "kantoor" : "unit"} voor
              oppervlakte, prijs en status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Legend({ cls, text, count }: { cls: string; text: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-sm", cls)} aria-hidden />
      {text}
      <span className="font-semibold text-ink-soft">{count}</span>
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
