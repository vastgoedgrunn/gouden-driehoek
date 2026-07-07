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
  // Locatie: Kathodeweg (bedrijventerrein Dideldom), Stadskanaal
  geo: { lat: 52.976513, lng: 6.961845 },
  address: {
    street: "Kathodeweg",
    parcel: "Perceel OWD00-N-5397",
    postalCode: "9503 EW",
    city: "Stadskanaal",
  },
  contact: {
    email: "info@goudendriehoek.nl",
    phone: "+31 6 43219739",
    phoneHref: "+31643219739",
  },
};

export const navItems = [
  { href: "/bedrijfsunits", label: "Bedrijfsunits" },
  { href: "/kantoren", label: "Kantoren" },
  { href: "/voorverkoop", label: "Voorverkoop" },
  { href: "/locatie", label: "Locatie" },
  { href: "/faq", label: "FAQ" },
  { href: "/over", label: "Over" },
  { href: "/downloads", label: "Downloads" },
];

export type NavItem = (typeof navItems)[number];
