import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNewsletterNotice } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json(
        { error: "Vul een geldig e-mailadres in." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    // Duplicate = ook prima
    if (error && !error.message.includes("duplicate")) {
      console.error("newsletter insert error", error.message);
      return NextResponse.json(
        { error: "Er ging iets mis. Probeer het later opnieuw." },
        { status: 500 },
      );
    }

    if (!error) {
      try {
        await sendNewsletterNotice(email);
      } catch (e) {
        console.error("newsletter email error", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }
}
