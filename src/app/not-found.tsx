import Link from "next/link";
import { TriangleMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <TriangleMark className="h-12 w-auto" />
      <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">
        Pagina niet gevonden
      </h1>
      <p className="mt-3 max-w-md text-graphite">
        Deze pagina bestaat niet (meer). Ga terug naar de homepage om verder te
        kijken.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 font-semibold text-white transition-colors hover:bg-gold-dark"
      >
        Terug naar home
      </Link>
    </div>
  );
}
