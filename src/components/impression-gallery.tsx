"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type GalleryImage = { src: string; alt: string };

export function ImpressionGallery({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3",
          className,
        )}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "reveal group relative aspect-[4/3] overflow-hidden rounded-xl bg-sand",
              i === 0 && "col-span-2 row-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Sluiten"
            onClick={close}
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Vorige"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Volgende"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
