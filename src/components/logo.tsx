import { cn } from "@/lib/cn";

/** Het merkmotief: een gouden driehoek met uitsparing (verwijst naar de daklijn van het gebouw). */
export function TriangleMark({
  className,
  title = "Gouden Driehoek logo",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 44"
      role="img"
      aria-label={title}
      className={cn("h-8 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Buitenste driehoek */}
      <path
        d="M24 2 46 42H2L24 2Z"
        fill="url(#gd-gold)"
      />
      {/* Binnenste uitsparing */}
      <path d="M24 16 36 38H12L24 16Z" fill="var(--color-cream)" />
      <defs>
        <linearGradient id="gd-gold" x1="2" y1="2" x2="46" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A07E3E" />
          <stop offset="0.55" stopColor="#C6A15B" />
          <stop offset="1" stopColor="#DCC187" />
        </linearGradient>
      </defs>
    </svg>
  );
}

import Image from "next/image";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  /** dark = origineel logo (op lichte achtergrond), light = crème/goud-versie (op donkere achtergrond) */
  variant?: "dark" | "light";
}) {
  return (
    <Image
      src={variant === "light" ? "/logo/logo-dark.png" : "/logo/logo.png"}
      alt="De Gouden Driehoek"
      width={360}
      height={126}
      sizes="160px"
      priority
      className={cn("h-11 w-auto sm:h-12", className)}
    />
  );
}
