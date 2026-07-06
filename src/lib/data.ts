import { createClient } from "@/lib/supabase/server";
import type { Unit } from "@/lib/types";

export async function getUnits(type?: Unit["type"]): Promise<Unit[]> {
  const supabase = await createClient();
  let query = supabase.from("units").select("*").order("sort_order", { ascending: true });
  if (type) query = query.eq("type", type);
  const { data, error } = await query;
  if (error) {
    console.error("getUnits error", error.message);
    return [];
  }
  return (data ?? []) as Unit[];
}

export async function getSiteContent(): Promise<Record<string, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) {
    console.error("getSiteContent error", error.message);
    return {};
  }
  return Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
}

export { formatPrice, statusLabel } from "@/lib/format";
