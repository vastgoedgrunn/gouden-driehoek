import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealProvider } from "@/components/reveal-provider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RevealProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </RevealProvider>
  );
}
