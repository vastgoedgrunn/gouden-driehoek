import type { Metadata } from "next";
import { Download, FileText, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download het ontwerpvoorstel en documentatie van De Gouden Driehoek in Stadskanaal.",
};

const files = [
  {
    title: "Ontwerpvoorstel De Gouden Driehoek",
    description: "Het volledige ontwerpvoorstel met impressies en plattegronden (PDF).",
    href: "/downloads/ontwerpvoorstel-gouden-driehoek.pdf",
    available: true,
  },
  {
    title: "Verkoopbrochure",
    description: "Uitgebreide brochure met units, kantoren en prijzen.",
    href: "#",
    available: false,
  },
  {
    title: "Plattegrond kantoorverdieping",
    description: "Voorlopige indeling van de 1e verdieping met de kantoortypen A t/m F (schaal 1:200).",
    href: "/plattegronden/kantoorverdieping.webp",
    available: true,
  },
  {
    title: "Plattegronden bedrijfsunits",
    description: "Gedetailleerde plattegronden van de bedrijfsunits op de begane grond.",
    href: "#",
    available: false,
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Downloads"
        title="Documentatie"
        intro="Bekijk en download de beschikbare documentatie. Meer documenten volgen tijdens de voorverkoop."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          {files.map((file) => (
            <div
              key={file.title}
              className="reveal flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-tint text-gold-dark">
                  <FileText className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {file.title}
                  </h3>
                  <p className="mt-1 text-sm text-graphite">{file.description}</p>
                </div>
              </div>
              {file.available ? (
                <a
                  href={file.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              ) : (
                <span className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-sand px-6 text-sm font-semibold text-mist">
                  <Clock className="h-4 w-4" />
                  Binnenkort
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
