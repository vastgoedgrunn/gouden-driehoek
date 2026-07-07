export default function Loading() {
  return (
    <div className="container-x py-24" role="status" aria-live="polite">
      <span className="sr-only">Pagina wordt geladen…</span>
      <div className="mx-auto max-w-3xl animate-pulse space-y-6">
        <div className="h-4 w-32 rounded-full bg-line" />
        <div className="h-12 w-3/4 rounded-2xl bg-line" />
        <div className="h-5 w-full rounded-full bg-line/70" />
        <div className="h-5 w-5/6 rounded-full bg-line/70" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="h-40 rounded-2xl bg-line/60" />
          <div className="h-40 rounded-2xl bg-line/60" />
          <div className="h-40 rounded-2xl bg-line/60" />
        </div>
      </div>
    </div>
  );
}
