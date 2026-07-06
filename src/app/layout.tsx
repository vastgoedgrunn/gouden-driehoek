import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} ${siteConfig.location} — bedrijfsunits & kantoren`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "bedrijfsunit kopen Stadskanaal",
    "kantoorruimte Stadskanaal",
    "De Gouden Driehoek",
    "bedrijfsunit voorverkoop",
    "nieuwbouw bedrijfspand Groningen",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.location}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.location}`,
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">{children}</body>
    </html>
  );
}
