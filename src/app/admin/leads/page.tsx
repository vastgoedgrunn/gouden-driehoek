import { createClient } from "@/lib/supabase/server";
import { deleteLead } from "../actions";
import { Trash2 } from "lucide-react";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const [{ data: leads }, { data: subs }] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Aanmeldingen</h1>
        <p className="mt-1 text-graphite">Interesse-formulieren en updates-abonnees.</p>
      </div>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-ink">
          Interesse ({leads?.length ?? 0})
        </h2>
        <div className="space-y-3">
          {(leads ?? []).length === 0 ? (
            <p className="rounded-2xl border border-line bg-white p-6 text-sm text-mist">
              Nog geen aanmeldingen.
            </p>
          ) : (
            (leads ?? []).map((l) => (
              <div key={l.id} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold text-ink">{l.naam}</p>
                    <p className="text-sm text-graphite">
                      <a href={`mailto:${l.email}`} className="hover:text-gold-dark">
                        {l.email}
                      </a>
                      {l.telefoon ? ` · ${l.telefoon}` : ""}
                      {l.bedrijfsnaam ? ` · ${l.bedrijfsnaam}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-mist">
                      {new Date(l.created_at).toLocaleString("nl-NL")}
                    </span>
                    <form action={deleteLead}>
                      <input type="hidden" name="id" value={l.id} />
                      <button
                        className="rounded-lg p-2 text-mist transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label="Verwijderen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-graphite">
                  {l.interesse_type ? <span>Interesse: {l.interesse_type}</span> : null}
                  {l.koop_huur ? <span>Voorkeur: {l.koop_huur}</span> : null}
                  {l.gewenste_m2 ? <span>Wens: {l.gewenste_m2}</span> : null}
                </div>
                {l.bericht ? (
                  <p className="mt-3 rounded-lg bg-sand px-4 py-3 text-sm text-ink-soft">
                    {l.bericht}
                  </p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-ink">
          Updates-abonnees ({subs?.length ?? 0})
        </h2>
        <div className="rounded-2xl border border-line bg-white p-5">
          {(subs ?? []).length === 0 ? (
            <p className="text-sm text-mist">Nog geen abonnees.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {(subs ?? []).map((s) => (
                <li key={s.id} className="rounded-full bg-sand px-3 py-1 text-sm text-ink-soft">
                  {s.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
