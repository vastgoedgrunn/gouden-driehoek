"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { useModal } from "@/lib/use-modal";

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
  const overlayRef = useModal(open, () => setOpen(false));

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
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
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
          ref={overlayRef}
          tabIndex={-1}
          className="gd-modal-overlay fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 outline-none backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Vergrote weergave: ${alt}`}
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Sluiten"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="gd-modal-panel relative h-[88vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill sizes="95vw" className="object-contain" priority />
          </div>
        </div>
      ) : null}
    </>
  );
}
