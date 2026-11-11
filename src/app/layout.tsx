import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
// Accent serif is only used for short italic words — skip preloading so it never competes with the LCP image.
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument", display: "swap", preload: false });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const description = "Compassionate in-home care across Cook, Lake & DuPage counties: senior, personal, companion, 24-hour, Alzheimer's and dementia care.";

/** Site-wide defaults; every public page overrides title, description, canonical and Open Graph via `pageMetadata`. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Carenest Homecare | In-Home Senior Care in Chicago, IL", template: `%s | ${SITE.name}` },
  description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Carenest Home Care — Compassionate In-Home Care Services" }],
  },
  twitter: { card: "summary_large_image", site: "@CarenestHomecare", images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9f7f3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrument.variable}`}>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
        <JsonLd data={localBusinessJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
