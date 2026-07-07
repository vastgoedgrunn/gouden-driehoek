import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Moderne formaten eerst — kleinere bestanden, scherpere beelden.
    formats: ["image/avif", "image/webp"],
    // Cache geoptimaliseerde beelden ruim (assets zijn content-hashed).
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
