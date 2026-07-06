import { getUnits } from "@/lib/data";
import { updateUnit } from "../actions";

export default async function AdminUnitsPage() {
  const units = await getUnits();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Units & kantoren</h1>
        <p className="mt-1 text-graphite">
          Pas status, oppervlakte, prijs en omschrijving aan. Sla per regel op.
        </p>
      </div>

      <div className="space-y-4">
        {units.map((unit) => (
          <form
            key={unit.id}
            action={updateUnit}
            className="grid gap-4 rounded-2xl border border-line bg-white p-5 md:grid-cols-[auto_1fr_1fr_1fr_auto] md:items-end"
          >
            <input type="hidden" name="id" value={unit.id} />
            <div className="md:pb-2">
              <p className="text-xs text-mist">
                {unit.type === "bedrijfsunit" ? "Unit" : "Kantoor"}
              </p>
              <p className="font-display text-xl font-bold text-ink">{unit.nummer}</p>
            </div>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-ink-soft">Status</span>
              <select
                name="status"
                defaultValue={unit.status}
                className="h-11 w-full rounded-lg border border-line bg-cream px-3 text-sm"
              >
                <option value="beschikbaar">Beschikbaar</option>
                <option value="optie">In optie</option>
                <option value="verkocht">Verkocht</option>
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-ink-soft">Oppervlakte (m²)</span>
              <input
                name="oppervlakte_m2"
                defaultValue={String(unit.oppervlakte_m2)}
                className="h-11 w-full rounded-lg border border-line bg-cream px-3 text-sm"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-ink-soft">Prijs vanaf (€)</span>
              <input
                name="prijs_vanaf"
                defaultValue={unit.prijs_vanaf ? String(unit.prijs_vanaf) : ""}
                placeholder="leeg = op aanvraag"
                className="h-11 w-full rounded-lg border border-line bg-cream px-3 text-sm"
              />
            </label>

            <div className="md:col-span-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink-soft">Omschrijving</span>
                <input
                  name="beschrijving"
                  defaultValue={unit.beschrijving ?? ""}
                  className="h-11 w-full rounded-lg border border-line bg-cream px-3 text-sm"
                />
              </label>
            </div>

            <button className="h-11 rounded-full bg-gold px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-dark md:col-start-5 md:row-start-1">
              Opslaan
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
