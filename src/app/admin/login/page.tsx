"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Inloggen mislukt. Controleer je gegevens.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-ink">Beheer</h1>
          <p className="mt-1 text-sm text-graphite">Log in om het aanbod te beheren.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-soft">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl border border-line bg-cream px-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-soft">
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-line bg-cream px-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            {error ? (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-full bg-gold font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
            >
              {loading ? "Bezig…" : "Inloggen"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
