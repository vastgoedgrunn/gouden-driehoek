"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  // Achtergrondvideo alleen op grotere schermen en zonder reduced-motion.
  // Op mobiel tonen we een posterbeeld (bespaart data/batterij); de film is
  // altijd te bekijken via de play-knop.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowVideo(wide.matches && !reduced.matches);
    update();
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-ink text-white sm:min-h-[92svh]">
      {/* Posterbeeld als basis (en als enige beeld op mobiel) */}
      <Image
        src="/video/impressie-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />

      {showVideo ? (
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
      ) : null}

      {/* Overlay voor leesbaarheid */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent"
        aria-hidden
      />

      <div className="container-x relative z-10 py-24 sm:py-28">
        <div className="max-w-2xl">
          {discount > 0 ? (
            <span
              className="gd-rise mb-6 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-white shadow-lg"
              style={{ "--rise-delay": "0ms" } as React.CSSProperties}
            >
              <span className="tri-marker" style={{ borderBottomColor: "#fff" }} aria-hidden />
              Voorverkoop &middot; {discount}% korting
            </span>
          ) : null}

          <p
            className="gd-rise eyebrow text-gold-light"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            {kicker}
          </p>
          <h1
            className="gd-rise mt-3 font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ "--rise-delay": "160ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          <p
            className="gd-rise mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl"
            style={{ "--rise-delay": "260ms" } as React.CSSProperties}
          >
            {subtitle}
          </p>

          <div
            className="gd-rise mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            style={{ "--rise-delay": "360ms" } as React.CSSProperties}
          >
            <ButtonLink href="/contact" size="lg">
              Toon je interesse
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/bedrijfsunits" size="lg" variant="ghostLight">
              Bekijk het aanbod
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
