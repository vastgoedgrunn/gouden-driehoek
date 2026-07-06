"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

export function PlanViewer({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <figure className="reveal overflow-hidden rounded-2xl border border-line bg-white">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full"
          aria-label="Plattegrond vergroten"
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1150}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
            Vergroten
          </span>
        </button>
        {caption ? (
          <figcaption className="border-t border-line px-4 py-3 text-xs text-mist">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Sluiten"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative h-[88vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill sizes="95vw" className="object-contain" priority />
          </div>
        </div>
      ) : null}
    </>
  );
}
