"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { isValidPhone } from "@/lib/format";

const field =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-shadow placeholder:text-mist focus:ring-2 focus:ring-gold";
const labelCls = "mb-1.5 block text-sm font-medium text-ink-soft";

export function LeadForm({
  presetUnit,
  presetType,
  presetArea,
}: {
  presetUnit?: string;
  presetType?: "bedrijfsunit" | "kantoor";
  presetArea?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const naamRef = useRef<HTMLInputElement>(null);
  const telefoonRef = useRef<HTMLInputElement>(null);

  // Bij een deep-link (bv. vanaf een unit) het formulier rustig in beeld
  // brengen en de cursor klaarzetten — behulpzaam, niet opdringerig.
  useEffect(() => {
    if (!presetUnit) return;
    const t = window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      naamRef.current?.focus({ preventScroll: true });
    }, 120);
    return () => window.clearTimeout(t);
  }, [presetUnit]);

  // Toont een nette, native validatiemelding bij een ongeldig telefoonnummer.
  function validatePhone(input: HTMLInputElement | null) {
    if (!input) return;
    const value = input.value.trim();
    if (value && !isValidPhone(value)) {
      input.setCustomValidity("Vul een geldig telefoonnummer in.");
    } else {
      input.setCustomValidity("");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    validatePhone(telefoonRef.current);
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setState("loading");
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
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
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
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
      {presetUnit ? (
        <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-gold-tint px-4 py-3 text-sm">
          <MapPin className="h-4 w-4 shrink-0 text-gold-dark" />
          <span className="text-ink-soft">
            Je toont interesse in <span className="font-semibold text-ink">{presetUnit}</span>
            {presetArea ? ` · circa ${presetArea} m²` : ""}. Vul je gegevens aan, dan
            nemen we contact op.
          </span>
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={labelCls}>
            Naam *
          </label>
          <input ref={naamRef} id="naam" name="naam" required autoComplete="name" className={field} placeholder="Voor- en achternaam" />
        </div>
        <div>
          <label htmlFor="bedrijfsnaam" className={labelCls}>
            Bedrijfsnaam
          </label>
          <input id="bedrijfsnaam" name="bedrijfsnaam" autoComplete="organization" className={field} placeholder="Optioneel" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            E-mail *
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="jouw@email.nl" />
        </div>
        <div>
          <label htmlFor="telefoon" className={labelCls}>
            Telefoon *
          </label>
          <input
            ref={telefoonRef}
            id="telefoon"
            name="telefoon"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className={field}
            placeholder="06 12345678"
            onInput={(e) => validatePhone(e.currentTarget)}
            onBlur={(e) => validatePhone(e.currentTarget)}
          />
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
          defaultValue={presetArea ? `circa ${presetArea} m²` : ""}
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
