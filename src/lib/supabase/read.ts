import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Anonieme, cookie-loze Supabase-client voor publieke leesqueries.
 *
 * Bewust géén cookies/sessie: daardoor blijven pagina's die hiermee data
 * ophalen statisch renderbaar (ISR) i.p.v. per request dynamisch. Combineer
 * met `unstable_cache` (zie lib/data.ts) voor caching met revalidatie-tags.
 */
export function createReadClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
