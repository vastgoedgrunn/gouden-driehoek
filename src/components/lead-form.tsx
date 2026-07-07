"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const field =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-shadow placeholder:text-mist focus:ring-2 focus:ring-gold";
const labelCls = "mb-1.5 block text-sm font-medium text-ink-soft";

export function LeadForm({
  presetUnit,
  presetType,
}: {
  presetUnit?: string;
  presetType?: "bedrijfsunit" | "kantoor";
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("done");
        form.reset();
      } else {
        const j = await res.json().catch(() => ({}));
        setMessage(j.error ?? "Er ging iets mis.");
        setState("error");
      }
    } catch {
      setMessage("Er ging iets mis. Probeer het later opnieuw.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">
          Bedankt voor je interesse!
        </h3>
        <p className="mt-2 text-graphite">
          We hebben je aanmelding ontvangen en nemen snel contact met je op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={labelCls}>
            Naam *
          </label>
          <input id="naam" name="naam" required className={field} placeholder="Voor- en achternaam" />
        </div>
        <div>
          <label htmlFor="bedrijfsnaam" className={labelCls}>
            Bedrijfsnaam
          </label>
          <input id="bedrijfsnaam" name="bedrijfsnaam" className={field} placeholder="Optioneel" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            E-mail *
          </label>
          <input id="email" name="email" type="email" required className={field} placeholder="jouw@email.nl" />
        </div>
        <div>
          <label htmlFor="telefoon" className={labelCls}>
            Telefoon
          </label>
          <input id="telefoon" name="telefoon" className={field} placeholder="06 …" />
        </div>
        <div>
          <label htmlFor="interesse_type" className={labelCls}>
            Interesse in
          </label>
          <select
            id="interesse_type"
            name="interesse_type"
            defaultValue={presetType ?? ""}
            className={field}
          >
            <option value="">Maak een keuze</option>
            <option value="bedrijfsunit">Bedrijfsunit</option>
            <option value="kantoor">Kantoorruimte</option>
            <option value="beide">Beide</option>
          </select>
        </div>
        <div>
          <label htmlFor="koop_huur" className={labelCls}>
            Koop of huur
          </label>
          <select id="koop_huur" name="koop_huur" defaultValue="" className={field}>
            <option value="">Maak een keuze</option>
            <option value="koop">Koop</option>
            <option value="huur">Huur</option>
            <option value="onbekend">Weet ik nog niet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="gewenste_m2" className={labelCls}>
          Gewenste oppervlakte / budget
        </label>
        <input
          id="gewenste_m2"
          name="gewenste_m2"
          className={field}
          placeholder="Bijv. circa 100 m² of budgetindicatie"
        />
      </div>

      <div>
        <label htmlFor="bericht" className={labelCls}>
          Bericht
        </label>
        <textarea
          id="bericht"
          name="bericht"
          rows={4}
          defaultValue={presetUnit ? `Ik heb interesse in ${presetUnit}.` : ""}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-shadow placeholder:text-mist focus:ring-2 focus:ring-gold"
          placeholder="Vertel ons waar je naar op zoek bent…"
        />
      </div>

      {state === "error" ? (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading"}
        aria-busy={state === "loading"}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gold px-8 font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? "Versturen…" : "Verstuur mijn interesse"}
      </button>
      <p className="text-xs text-mist">
        We gebruiken je gegevens uitsluitend om contact met je op te nemen over
        De Gouden Driehoek.
      </p>
    </form>
  );
}
