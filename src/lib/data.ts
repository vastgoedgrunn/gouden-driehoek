import { unstable_cache } from "next/cache";
import { createReadClient } from "@/lib/supabase/read";
import type { Unit } from "@/lib/types";

/** Cache-tags waarmee admin-acties de publieke data gericht kunnen verversen. */
export const CACHE_TAGS = { units: "units", content: "site-content" } as const;

// Verversvenster (achtergrond-revalidatie). Admin-mutaties bustten direct via tag.
const REVALIDATE_SECONDS = 300;

// Time-out en retries: Supabase kan bij een "koude" start kortstondig traag zijn
// (Cloudflare 522). We proberen het een paar keer voordat we opgeven.
const QUERY_TIMEOUT_MS = 8000;
const MAX_ATTEMPTS = 3;

// Expliciete kolommen i.p.v. "*": voorspelbare payload, geen onbedoelde velden.
const UNIT_COLUMNS =
  "id,type,nummer,verdieping,oppervlakte_m2,prijs_vanaf,status,beschrijving,plattegrond_url,pos_x,pos_y,pos_w,pos_h,sort_order,created_at";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Voert `fn` uit met een paar retries bij een fout. Belangrijk: wanneer dit
 * uiteindelijk gooit, cachet `unstable_cache` het resultaat NIET — zo bakken we
 * nooit een lege/mislukte fetch in. De aanroeper vangt de fout af met een
 * veilige fallback voor die ene render; de volgende aanvraag probeert opnieuw.
 */
async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS) await sleep(300 * attempt);
    }
  }
  throw lastErr;
}

const fetchUnits = unstable_cache(
  async (): Promise<Unit[]> =>
    withRetry(async () => {
      const supabase = createReadClient();
      const { data, error } = await supabase
        .from("units")
        .select(UNIT_COLUMNS)
        .order("sort_order", { ascending: true })
        .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
      if (error) throw new Error(`units: ${error.message}`);
      // Leeg resultaat behandelen we als transient (tabel is nooit echt leeg),
      // zodat het niet gecachet wordt.
      if (!data || data.length === 0) throw new Error("units: leeg resultaat");
      return data as unknown as Unit[];
    }),
  ["units"],
  { tags: [CACHE_TAGS.units], revalidate: REVALIDATE_SECONDS },
);

export async function getUnits(type?: Unit["type"]): Promise<Unit[]> {
  try {
    const units = await fetchUnits();
    // Filteren in geheugen houdt één gedeelde cache-entry (betere cache-hitrate).
    return type ? units.filter((u) => u.type === type) : units;
  } catch (err) {
    console.error("getUnits error", err instanceof Error ? err.message : err);
    return [];
  }
}

const fetchContent = unstable_cache(
  async (): Promise<Record<string, string>> =>
    withRetry(async () => {
      const supabase = createReadClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value")
        .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
      if (error) throw new Error(`site_content: ${error.message}`);
      if (!data || data.length === 0) throw new Error("site_content: leeg resultaat");
      return Object.fromEntries(data.map((r) => [r.key, r.value]));
    }),
  ["site-content"],
  { tags: [CACHE_TAGS.content], revalidate: REVALIDATE_SECONDS },
);

export async function getSiteContent(): Promise<Record<string, string>> {
  try {
    return await fetchContent();
  } catch (err) {
    console.error("getSiteContent error", err instanceof Error ? err.message : err);
    return {};
  }
}

export { formatPrice, statusLabel } from "@/lib/format";
