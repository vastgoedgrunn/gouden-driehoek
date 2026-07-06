export const siteConfig = {
  name: "De Gouden Driehoek",
  shortName: "Gouden Driehoek",
  location: "Stadskanaal",
  tagline: "Bedrijfsunits & kantoren om trots op te zijn",
  description:
    "De Gouden Driehoek in Stadskanaal: hoogwaardige nieuwbouw met bedrijfsunits op de begane grond en kantoorruimte op de verdieping. Nu in de voorverkoop met 10% korting.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Impressievideo (gehost op Supabase Storage)
  videoUrl:
    "https://iorkbxpucsfscihdymbr.supabase.co/storage/v1/object/public/media/video/impressie.mp4",
  presaleDiscount: 10,
  // Benaderende locatie Stadskanaal (later te verfijnen)
  geo: { lat: 52.9917, lng: 6.9522 },
  contact: {
    email: "info@goudendriehoek.nl",
    phone: "",
  },
};

export const navItems = [
  { href: "/bedrijfsunits", label: "Bedrijfsunits" },
  { href: "/kantoren", label: "Kantoren" },
  { href: "/voorverkoop", label: "Voorverkoop" },
  { href: "/locatie", label: "Locatie" },
  { href: "/over", label: "Over het project" },
  { href: "/downloads", label: "Downloads" },
];

export type NavItem = (typeof navItems)[number];
