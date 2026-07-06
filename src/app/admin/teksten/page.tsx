import { getSiteContent } from "@/lib/data";
import { updateContent } from "../actions";

const fields: { key: string; label: string; type?: "text" | "textarea"; help?: string }[] = [
  { key: "hero_kicker", label: "Hero — bovenkopje" },
  { key: "hero_title", label: "Hero — titel" },
  { key: "hero_subtitle", label: "Hero — ondertitel", type: "textarea" },
  { key: "project_intro", label: "Projectintroductie", type: "textarea" },
  { key: "presale_discount", label: "Voorverkoop-korting (%)", help: "Alleen getal, bv. 10" },
  { key: "contact_email", label: "Contact e-mail" },
  { key: "contact_phone", label: "Contact telefoon" },
];

export default async function AdminTekstenPage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Teksten & instellingen</h1>
        <p className="mt-1 text-graphite">Pas de belangrijkste teksten en instellingen van de site aan.</p>
      </div>

      <form action={updateContent} className="max-w-2xl space-y-5 rounded-2xl border border-line bg-white p-6">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">{f.label}</span>
            {f.type === "textarea" ? (
              <textarea
                name={`content__${f.key}`}
                defaultValue={content[f.key] ?? ""}
                rows={3}
                className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold"
              />
            ) : (
              <input
                name={`content__${f.key}`}
                defaultValue={content[f.key] ?? ""}
                className="h-12 w-full rounded-xl border border-line bg-cream px-4 text-sm outline-none focus:ring-2 focus:ring-gold"
              />
            )}
            {f.help ? <span className="mt-1 block text-xs text-mist">{f.help}</span> : null}
          </label>
        ))}
        <button className="h-12 rounded-full bg-gold px-8 font-semibold text-white transition-colors hover:bg-gold-dark">
          Opslaan
        </button>
      </form>
    </div>
  );
}
