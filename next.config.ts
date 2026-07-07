import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Alleen WebP: bijna even klein als AVIF, maar ~30x sneller te encoden.
    // AVIF-encoding is zo traag dat het bij het eerste bezoek merkbare
    // vertraging gaf zonder zichtbaar kwaliteitsverschil.
    formats: ["image/webp"],
    // Cache geoptimaliseerde beelden ruim (assets zijn content-hashed).
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
