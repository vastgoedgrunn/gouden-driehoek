import { unstable_cache } from "next/cache";
import { createReadClient } from "@/lib/supabase/read";
import type { Unit } from "@/lib/types";

/** Cache-tags waarmee admin-acties de publieke data gericht kunnen verversen. */
export const CACHE_TAGS = { units: "units", content: "site-content" } as const;

// Verversvenster (achtergrond-revalidatie). Admin-mutaties bustten direct via tag.
const REVALIDATE_SECONDS = 300;

// Expliciete kolommen i.p.v. "*": voorspelbare payload, geen onbedoelde velden.
const UNIT_COLUMNS =
  "id,type,nummer,verdieping,oppervlakte_m2,prijs_vanaf,status,beschrijving,plattegrond_url,pos_x,pos_y,pos_w,pos_h,sort_order,created_at";

const fetchUnits = unstable_cache(
  async (): Promise<Unit[]> => {
    const supabase = createReadClient();
    const { data, error } = await supabase
      .from("units")
      .select(UNIT_COLUMNS)
      .order("sort_order", { ascending: true });
    if (error) {
      console.error("getUnits error", error.message);
      return [];
    }
    return (data ?? []) as unknown as Unit[];
  },
  ["units"],
  { tags: [CACHE_TAGS.units], revalidate: REVALIDATE_SECONDS },
);

export async function getUnits(type?: Unit["type"]): Promise<Unit[]> {
  const units = await fetchUnits();
  // Filteren in geheugen houdt één gedeelde cache-entry (betere cache-hitrate).
  return type ? units.filter((u) => u.type === type) : units;
}

const fetchContent = unstable_cache(
  async (): Promise<Record<string, string>> => {
    const supabase = createReadClient();
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error) {
      console.error("getSiteContent error", error.message);
      return {};
    }
    return Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  },
  ["site-content"],
  { tags: [CACHE_TAGS.content], revalidate: REVALIDATE_SECONDS },
);

export async function getSiteContent(): Promise<Record<string, string>> {
  return fetchContent();
}

export { formatPrice, statusLabel } from "@/lib/format";
