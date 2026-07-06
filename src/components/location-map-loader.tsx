"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("@/components/location-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full animate-pulse rounded-2xl bg-sand" />
  ),
});

export function LocationMapLoader() {
  return <LocationMap />;
}
