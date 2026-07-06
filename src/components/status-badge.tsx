import type { UnitStatus } from "@/lib/types";
import { statusLabel } from "@/lib/format";
import { cn } from "@/lib/cn";

const styles: Record<UnitStatus, string> = {
  beschikbaar: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  optie: "bg-amber-50 text-amber-700 ring-amber-600/20",
  verkocht: "bg-zinc-100 text-zinc-500 ring-zinc-500/20",
};

const dot: Record<UnitStatus, string> = {
  beschikbaar: "bg-emerald-500",
  optie: "bg-amber-500",
  verkocht: "bg-zinc-400",
};

export function StatusBadge({
  status,
  className,
}: {
  status: UnitStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        styles[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[status])} aria-hidden />
      {statusLabel(status)}
    </span>
  );
}
