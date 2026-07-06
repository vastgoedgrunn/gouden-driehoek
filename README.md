# De Gouden Driehoek

Verkoopgerichte website voor **De Gouden Driehoek** in Stadskanaal — bedrijfsunits (begane grond) en kantoorruimte (verdieping), nu in de voorverkoop met 10% korting.

Gebouwd met **Next.js (App Router)**, **Tailwind CSS v4**, **Supabase** en gehost op **Vercel**.

## Functies

- Meeslepende homepage met achtergrondvideo en gouden-driehoek-huisstijl
- Overzicht van bedrijfsunits en kantoren met **interactieve beschikbaarheid** (status, m², vanaf-prijs)
- Voorverkoop-, locatie- (interactieve kaart), over- en downloadpagina's
- Interesseformulier en updates-aanmelding → opgeslagen in Supabase + notificatie- en bevestigingsmail (Resend)
- Afgeschermd **admin-paneel** (`/admin`) om units, prijzen, status, teksten en aanmeldingen te beheren
- Responsive, toegankelijk en SEO-vriendelijk (metadata, sitemap, robots, OG-image)

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul de waarden in
npm run dev
```

Ga naar http://localhost:3000.

## Omgevingsvariabelen

Zie `.env.example`. De belangrijkste:

| Variabele | Omschrijving |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project-URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `RESEND_API_KEY` | API-key voor e-mail via Resend (optioneel; zonder key wordt mail overgeslagen) |
| `RESEND_FROM_EMAIL` | Afzender van de mails |
| `LEAD_NOTIFICATION_EMAIL` | Waar nieuwe aanmeldingen naartoe gaan |
| `NEXT_PUBLIC_SITE_URL` | Basis-URL van de site (voor metadata) |

## Database

Het schema staat in `supabase/migrations/`. Tabellen: `units`, `leads`, `newsletter_subscribers`, `site_content` en `admins`. Row Level Security staat aan; alleen beheerders (rijen in `admins`) kunnen beheeracties uitvoeren.

## Beheer (admin)

- URL: `/admin`
- Login met het beheerdersaccount (Supabase Auth). Wijzig het tijdelijke wachtwoord via het Supabase-dashboard (Authentication → Users).

## Assets

Bronbeelden en -video staan in `source_media/` (niet in git). Verwerkte assets staan in `public/impressies` en `public/video`. Beelden bevatten voorlopig het watermerk van de architect; later te vervangen door schone versies.
