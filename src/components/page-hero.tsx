import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ink text-white">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
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
            <div className="mb-3 flex items-center gap-2">
              <span className="tri-marker" aria-hidden />
              <span className="eyebrow text-gold-light">{eyebrow}</span>
            </div>
          ) : null}
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 text-lg leading-relaxed text-white/80">{intro}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
