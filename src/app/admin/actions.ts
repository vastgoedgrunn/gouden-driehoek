"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UnitStatus } from "@/lib/types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

export async function updateUnit(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as UnitStatus;
  const prijsRaw = String(formData.get("prijs_vanaf") ?? "").replace(/[^0-9]/g, "");
  const m2Raw = String(formData.get("oppervlakte_m2") ?? "").replace(/[^0-9.]/g, "");
  const beschrijving = String(formData.get("beschrijving") ?? "");

  const { error } = await supabase
    .from("units")
    .update({
      status,
      prijs_vanaf: prijsRaw ? Number(prijsRaw) : null,
      oppervlakte_m2: m2Raw ? Number(m2Raw) : 0,
      beschrijving,
    })
    .eq("id", id);

  if (error) console.error("updateUnit", error.message);
  revalidatePath("/admin/units");
  revalidatePath("/bedrijfsunits");
  revalidatePath("/kantoren");
  revalidatePath("/");
}

export async function updateContent(formData: FormData) {
  const supabase = await requireAdmin();
  const entries = Array.from(formData.entries()).filter(([k]) => k.startsWith("content__"));
  for (const [key, value] of entries) {
    const realKey = key.replace("content__", "");
    await supabase
      .from("site_content")
      .upsert({ key: realKey, value: String(value), updated_at: new Date().toISOString() });
  }
  revalidatePath("/admin/teksten");
  revalidatePath("/");
}

export async function deleteLead(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id"));
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
