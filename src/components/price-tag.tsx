import { formatPrice, presalePrice } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Prijsweergave met voorverkoop-korting: toont de voorverkoopprijs
 * prominent met de normale prijs doorgestreept ernaast.
 */
export function PriceTag({
  value,
  discount = 10,
  align = "left",
  size = "md",
  className,
}: {
  value: number | null;
  discount?: number;
  align?: "left" | "right";
  size?: "md" | "lg";
  className?: string;
}) {
  const alignCls = align === "right" ? "items-end text-right" : "items-start text-left";

  if (value == null) {
    return (
      <div className={cn("flex flex-col", alignCls, className)}>
        <span className="text-xs text-mist">Prijs</span>
        <span className="font-display font-bold text-ink">Op aanvraag</span>
      </div>
    );
  }

  const pre = presalePrice(value, discount);

  return (
    <div className={cn("flex flex-col", alignCls, className)}>
      <span className="inline-flex items-center gap-1.5 text-xs text-mist">
        Voorverkoop vanaf
        {discount > 0 ? (
          <span className="rounded-full bg-gold-tint px-1.5 py-0.5 text-[0.65rem] font-bold text-gold-dark">
            −{discount}%
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "font-display font-extrabold text-ink",
          size === "lg" ? "text-2xl" : "text-xl",
        )}
      >
        {formatPrice(pre)}
      </span>
      {discount > 0 ? (
        <span className="text-sm text-mist line-through decoration-mist/60">
          {formatPrice(value)}
        </span>
      ) : null}
    </div>
  );
}
