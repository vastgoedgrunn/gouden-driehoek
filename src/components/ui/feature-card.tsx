import { cn } from "@/lib/cn";

/**
 * Uniforme feature-/USP-kaart met icoon, titel en tekst.
 * Wordt op meerdere pagina's gebruikt (home, bedrijfsunits, kantoren, voorverkoop).
 */
export function FeatureCard({
  icon,
  title,
  text,
  surface = "white",
  className,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  text: React.ReactNode;
  /** Achtergrond van de kaart, afhankelijk van de sectie eronder */
  surface?: "white" | "cream";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal card-lift rounded-2xl border border-line p-6",
        surface === "cream" ? "bg-cream" : "bg-white",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-tint text-gold-dark">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-graphite">{text}</p>
    </div>
  );
}
