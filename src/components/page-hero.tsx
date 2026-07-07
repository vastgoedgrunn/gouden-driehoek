import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  actions,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink text-white">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </>
      ) : (
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
      )}
      <div className="container-x relative py-20 sm:py-28">
        <div className="max-w-2xl">
          {eyebrow ? (
            <div
              className="gd-rise mb-3 flex items-center gap-2"
              style={{ "--rise-delay": "0ms" } as React.CSSProperties}
            >
              <span className="tri-marker" aria-hidden />
              <span className="eyebrow text-gold-light">{eyebrow}</span>
            </div>
          ) : null}
          <h1
            className="text-display gd-rise-solid font-display text-[2.5rem] font-extrabold sm:text-5xl"
            style={{ "--rise-delay": "90ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          {intro ? (
            <p
              className="gd-rise mt-5 max-w-[58ch] text-lg leading-relaxed text-white/80"
              style={{ "--rise-delay": "190ms" } as React.CSSProperties}
            >
              {intro}
            </p>
          ) : null}
          {actions ? (
            <div
              className="gd-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--rise-delay": "290ms" } as React.CSSProperties}
            >
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
