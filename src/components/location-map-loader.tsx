"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/location-map"), {
  ssr: false,
  loading: () => (
    <div role="status" className="h-[420px] w-full animate-pulse bg-sand">
      <span className="sr-only">Kaart wordt geladen…</span>
    </div>
  ),
});

export function LocationMapLoader() {
  return <LocationMap />;
}
