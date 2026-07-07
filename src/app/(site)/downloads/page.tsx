import type { Metadata } from "next";
import { Download, FileText, Clock, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download het ontwerpvoorstel en documentatie van De Gouden Driehoek in Stadskanaal.",
  alternates: { canonical: "/downloads" },
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
    title: "Plattegrond begane grond (bedrijfsunits)",
    description: "Voorlopige indeling van de begane grond met de unittypen A t/m D (schaal 1:200).",
    href: "/plattegronden/begane-grond.webp",
    available: true,
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
          <h2 className="sr-only">Beschikbare documenten</h2>
          {files.map((file) => (
            <div
              key={file.title}
              className="reveal card-lift flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
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
                  aria-label={`Download ${file.title} (opent in nieuw tabblad)`}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-md"
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

          <div className="reveal mt-8 flex flex-col items-center gap-4 rounded-3xl border border-line bg-gradient-to-br from-gold-tint to-white px-8 py-12 text-center">
            <span className="tri-marker" aria-hidden />
            <h2 className="max-w-xl font-display text-2xl font-extrabold text-ink">
              Documentatie op maat nodig?
            </h2>
            <p className="max-w-lg text-graphite">
              Wil je een prijsopgave, specifieke plattegrond of de verkoopbrochure
              zodra die beschikbaar is? Laat je gegevens achter.
            </p>
            <ButtonLink href="/contact" size="lg">
              Toon je interesse
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
