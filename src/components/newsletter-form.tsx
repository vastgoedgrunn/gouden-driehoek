"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p
        className={`inline-flex items-center gap-2 text-sm font-semibold ${
          dark ? "text-gold-light" : "text-emerald-700"
        }`}
      >
        <Check className="h-4 w-4" /> Bedankt! Je ontvangt voortaan updates.
      </p>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jouw@email.nl"
          aria-label="E-mailadres voor updates"
          className={`h-12 flex-1 rounded-full px-5 text-sm outline-none ring-1 transition-shadow focus:ring-2 ${
            dark
              ? "bg-white/10 text-white ring-white/20 placeholder:text-white/50 focus:ring-gold-light"
              : "bg-white text-ink ring-line placeholder:text-mist focus:ring-gold"
          }`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-busy={state === "loading"}
          className="h-12 rounded-full bg-gold px-6 text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md disabled:translate-y-0 disabled:opacity-60"
        >
          {state === "loading" ? "Bezig…" : "Houd mij op de hoogte"}
        </button>
      </form>
      {state === "error" ? (
        <p
          role="alert"
          className={`mt-2 text-sm ${dark ? "text-gold-light" : "text-red-700"}`}
        >
          Er ging iets mis. Controleer je e-mailadres en probeer het opnieuw.
        </p>
      ) : null}
    </div>
  );
}
