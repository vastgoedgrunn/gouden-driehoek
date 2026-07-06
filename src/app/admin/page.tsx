import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Building2, Inbox, Mail, FileText, ArrowRight } from "lucide-react";

export default async function AdminOverview() {
  const supabase = await createClient();

  const [{ count: unitsTotal }, { data: units }, { data: leads }, { count: newsCount }] =
    await Promise.all([
      supabase.from("units").select("*", { count: "exact", head: true }),
      supabase.from("units").select("status"),
      supabase.from("leads").select("id, naam, email, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    ]);

  const beschikbaar = (units ?? []).filter((u) => u.status === "beschikbaar").length;

  const { count: leadsCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Overzicht</h1>
        <p className="mt-1 text-graphite">Beheer het aanbod, de teksten en de aanmeldingen.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Building2 className="h-5 w-5" />} value={`${beschikbaar}/${unitsTotal ?? 0}`} label="Beschikbaar / totaal" />
        <StatCard icon={<Inbox className="h-5 w-5" />} value={`${leadsCount ?? 0}`} label="Aanmeldingen" />
        <StatCard icon={<Mail className="h-5 w-5" />} value={`${newsCount ?? 0}`} label="Updates-abonnees" />
        <StatCard icon={<FileText className="h-5 w-5" />} value="Teksten" label="Beheer content" href="/admin/teksten" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Laatste aanmeldingen</h2>
            <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark">
              Alle <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-line">
            {(leads ?? []).length === 0 ? (
              <li className="py-3 text-sm text-mist">Nog geen aanmeldingen.</li>
            ) : (
              (leads ?? []).map((l) => (
                <li key={l.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{l.naam}</p>
                    <p className="text-xs text-mist">{l.email}</p>
                  </div>
                  <span className="text-xs text-mist">
                    {new Date(l.created_at).toLocaleDateString("nl-NL")}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-lg font-bold text-ink">Snel beheren</h2>
          <div className="mt-4 space-y-2">
            <QuickLink href="/admin/units" label="Units & kantoren bijwerken" />
            <QuickLink href="/admin/teksten" label="Teksten & prijzen aanpassen" />
            <QuickLink href="/admin/leads" label="Aanmeldingen bekijken" />
          </div>
          <p className="mt-6 text-xs text-mist">
            Wijzigingen zijn direct zichtbaar op de website.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  href?: string;
}) {
  const inner = (
    <div className="rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-tint text-gold-dark">
        {icon}
      </div>
      <p className="mt-4 font-display text-2xl font-extrabold text-ink">{value}</p>
      <p className="text-xs text-graphite">{label}</p>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl bg-sand px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-tint"
    >
      {label}
      <ArrowRight className="h-4 w-4 text-gold-dark" />
    </Link>
  );
}
