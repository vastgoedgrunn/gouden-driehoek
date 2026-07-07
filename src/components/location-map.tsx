"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { siteConfig } from "@/lib/site";

const goldMarker = divIcon({
  className: "gd-marker",
  html: `<div style="filter:drop-shadow(0 4px 6px rgba(0,0,0,.3))">
    <svg width="34" height="42" viewBox="0 0 34 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 42C17 42 3 24 3 15A14 14 0 0 1 31 15C31 24 17 42 17 42Z" fill="#1c1d20"/>
      <path d="M17 8 26 24H8L17 8Z" fill="#C6A15B"/>
    </svg>
  </div>`,
  iconSize: [34, 42],
  iconAnchor: [17, 42],
  popupAnchor: [0, -38],
});

export default function LocationMap() {
  const { lat, lng } = siteConfig.geo;
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      aria-label={`Kaart met de locatie van ${siteConfig.name} aan de ${siteConfig.address.street} in ${siteConfig.address.city}`}
      className="h-[420px] w-full"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={goldMarker}>
        <Popup>
          <strong>{siteConfig.name}</strong>
          <br />
          {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
          {siteConfig.address.city}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
