"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

export function VideoModal({
  label = "Bekijk de video",
  className,
  variant = "light",
}: {
  label?: string;
  className?: string;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-5 text-sm font-semibold transition-colors",
          variant === "light"
            ? "text-white hover:text-gold-light"
            : "text-ink hover:text-gold-dark",
          className,
        )}
      >
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:scale-105",
            variant === "light"
              ? "bg-white/15 ring-1 ring-white/30 backdrop-blur"
              : "bg-gold text-white",
          )}
        >
          <Play className="h-4 w-4 translate-x-px fill-current" />
        </span>
        {label}
      </button>

      {open ? (
        <div
          className="gd-modal-overlay fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Videospeler"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Video sluiten"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="gd-modal-panel w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              className="aspect-video w-full bg-black"
              src={siteConfig.videoUrl}
              poster="/video/impressie-poster.jpg"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
