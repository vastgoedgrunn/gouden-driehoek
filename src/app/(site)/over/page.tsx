import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { VideoModal } from "@/components/video-modal";
import { ImpressionGallery } from "@/components/impression-gallery";
import { ButtonLink } from "@/components/ui/button";
import { getSiteContent } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Over het project",
  description:
    "De visie achter De Gouden Driehoek: een hoogwaardig, herkenbaar bedrijfsgebouw voor ondernemers in Stadskanaal.",
};

export default async function OverPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow="Over het project"
        title="De visie achter De Gouden Driehoek"
        intro={content.project_intro}
        image="/impressies/impressie-03.webp"
      />

      {/* Video */}
      <Section>
        <div className="reveal relative overflow-hidden rounded-3xl">
          <div className="relative aspect-video">
            <Image
              src="/video/impressie-poster.jpg"
              alt="Impressievideo De Gouden Driehoek"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
              <VideoModal label="Bekijk de impressiefilm" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Ambitie" title="Een plek om trots op te zijn" />
            <div className="reveal mt-4 space-y-4 text-graphite">
              <p>
                De Gouden Driehoek is ontworpen als een herkenbaar en
                representatief bedrijfsgebouw: robuuste bedrijfsunits op de
                begane grond en lichte, flexibele kantoorruimte op de
                verdieping.
              </p>
              <p>
                De karakteristieke gouden daklijn maakt het gebouw van veraf
                herkenbaar en geeft ondernemers een adres om trots op te zijn.
              </p>
            </div>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/impressies/impressie-07.webp"
              alt="Impressie van De Gouden Driehoek"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading align="center" eyebrow="Impressies" title="Beeld van het gebouw" />
        <div className="mt-10">
          <ImpressionGallery
            images={[
              { src: "/impressies/impressie-01.webp", alt: "Impressie 1" },
              { src: "/impressies/impressie-04.webp", alt: "Impressie 4" },
              { src: "/impressies/impressie-06.webp", alt: "Impressie 6" },
              { src: "/impressies/impressie-09.webp", alt: "Impressie 9" },
              { src: "/impressies/impressie-10.webp", alt: "Impressie 10" },
              { src: "/impressies/impressie-13.webp", alt: "Impressie 13" },
            ]}
          />
        </div>
        <div className="reveal mt-12 text-center">
          <ButtonLink href="/contact">
            Interesse in het project?
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
