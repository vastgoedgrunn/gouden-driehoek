import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-3 flex items-center gap-2",
            align === "center" && "justify-center",
          )}
        >
          <span className="tri-marker" aria-hidden />
          <span className="eyebrow text-gold-dark">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-lg leading-relaxed text-graphite">{intro}</p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}
