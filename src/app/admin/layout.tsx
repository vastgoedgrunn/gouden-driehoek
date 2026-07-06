import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";
import { signOut } from "./actions";
import { LogOut } from "lucide-react";

export const metadata: Metadata = {
  title: "Beheer",
  robots: { index: false, follow: false },
};

const adminNav = [
  { href: "/admin", label: "Overzicht" },
  { href: "/admin/units", label: "Units & kantoren" },
  { href: "/admin/leads", label: "Aanmeldingen" },
  { href: "/admin/teksten", label: "Teksten" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login-pagina: geen chrome
  if (!user) {
    return <div className="min-h-[80vh]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin">
              <Logo />
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-sand"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={signOut}>
            <button className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-graphite hover:text-ink">
              <LogOut className="h-4 w-4" />
              Uitloggen
            </button>
          </form>
        </div>
        <nav className="container-x flex items-center gap-1 overflow-x-auto pb-2 md:hidden">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-sand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="container-x py-10">{children}</main>
    </div>
  );
}
