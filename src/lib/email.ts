import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from =
  process.env.RESEND_FROM_EMAIL ?? "Gouden Driehoek <onboarding@resend.dev>";
const notify = process.env.LEAD_NOTIFICATION_EMAIL ?? "h.schlimback@gmail.com";

const resend = apiKey ? new Resend(apiKey) : null;

type LeadPayload = {
  naam: string;
  email: string;
  telefoon?: string;
  bedrijfsnaam?: string;
  interesse_type?: string;
  gewenste_m2?: string;
  koop_huur?: string;
  bericht?: string;
};

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#8b8e96">${label}</td><td style="padding:4px 0;color:#1c1d20;font-weight:600">${value}</td></tr>`;
}

export async function sendLeadEmails(lead: LeadPayload) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY ontbreekt — mail wordt overgeslagen.");
    return;
  }

  // Notificatie naar de eigenaar
  await resend.emails.send({
    from,
    to: notify,
    replyTo: lead.email,
    subject: `Nieuwe interesse: ${lead.naam}`,
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px">
        <h2 style="color:#1c1d20">Nieuwe aanmelding via de website</h2>
        <table style="border-collapse:collapse;font-size:14px">
          ${row("Naam", lead.naam)}
          ${row("E-mail", lead.email)}
          ${row("Telefoon", lead.telefoon)}
          ${row("Bedrijf", lead.bedrijfsnaam)}
          ${row("Interesse", lead.interesse_type)}
          ${row("Gewenste m²", lead.gewenste_m2)}
          ${row("Koop/huur", lead.koop_huur)}
          ${row("Bericht", lead.bericht)}
        </table>
      </div>`,
  });

  // Bevestiging naar de inschrijver
  await resend.emails.send({
    from,
    to: lead.email,
    subject: "Bedankt voor je interesse in De Gouden Driehoek",
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;color:#1c1d20">
        <h2>Bedankt, ${lead.naam}!</h2>
        <p>We hebben je interesse in <strong>De Gouden Driehoek</strong> in goede orde ontvangen.
        We nemen zo snel mogelijk persoonlijk contact met je op.</p>
        <p style="color:#5b5e66">Met vriendelijke groet,<br/>Team De Gouden Driehoek</p>
      </div>`,
  });
}

export async function sendNewsletterNotice(email: string) {
  if (!resend) return;
  await resend.emails.send({
    from,
    to: notify,
    subject: "Nieuwe aanmelding voor updates",
    html: `<p style="font-family:Inter,Arial,sans-serif">Nieuwe aanmelding voor updates: <strong>${email}</strong></p>`,
  });
}
