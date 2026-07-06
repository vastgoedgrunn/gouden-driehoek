"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { VideoModal } from "@/components/video-modal";
import { siteConfig } from "@/lib/site";

export function Hero({
  kicker,
  title,
  subtitle,
  discount,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  discount: number;
}) {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-ink text-white">
      {/* Achtergrondvideo (muted, loop) met poster-fallback */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/impressie-poster.jpg"
        aria-hidden
      >
        <source src={siteConfig.videoUrl} type="video/mp4" />
      </video>

      {/* Overlay voor leesbaarheid */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent"
        aria-hidden
      />

      <div className="container-x relative z-10 py-28">
        <div className="max-w-2xl">
          {discount > 0 ? (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-white shadow-lg">
              <span className="tri-marker" style={{ borderBottomColor: "#fff" }} aria-hidden />
              Voorverkoop &middot; {discount}% korting
            </span>
          ) : null}

          <p className="eyebrow text-gold-light">{kicker}</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {subtitle}
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/bedrijfsunits" size="lg">
              Bekijk het aanbod
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <VideoModal label="Bekijk de film" />
          </div>
        </div>
      </div>

      {/* Onderrand-accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        aria-hidden
      />
    </section>
  );
}
