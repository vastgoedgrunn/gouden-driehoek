import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendLeadEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const naam = String(body.naam ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!naam || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { error: "Vul minimaal een geldige naam en e-mailadres in." },
        { status: 400 },
      );
    }

    const lead = {
      naam,
      email,
      telefoon: body.telefoon ? String(body.telefoon).trim() : null,
      bedrijfsnaam: body.bedrijfsnaam ? String(body.bedrijfsnaam).trim() : null,
      interesse_type: body.interesse_type || null,
      gewenste_m2: body.gewenste_m2 ? String(body.gewenste_m2).trim() : null,
      koop_huur: body.koop_huur || null,
      bericht: body.bericht ? String(body.bericht).trim() : null,
    };

    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) {
      console.error("lead insert error", error.message);
      return NextResponse.json(
        { error: "Er ging iets mis bij het opslaan. Probeer het later opnieuw." },
        { status: 500 },
      );
    }

    try {
      await sendLeadEmails({
        ...lead,
        telefoon: lead.telefoon ?? undefined,
        bedrijfsnaam: lead.bedrijfsnaam ?? undefined,
        interesse_type: lead.interesse_type ?? undefined,
        gewenste_m2: lead.gewenste_m2 ?? undefined,
        koop_huur: lead.koop_huur ?? undefined,
        bericht: lead.bericht ?? undefined,
      });
    } catch (e) {
      console.error("lead email error", e);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }
}
