import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

const title = "Carenest Homecare | Compassionate In-Home Care Services";
const description =
  "Carenest Homecare provides comprehensive in-home care services for seniors. Personal care, companion care, respite care, and community outreach. 99% client satisfaction.";

export const metadata: Metadata = {
  metadataBase: new URL("https://carenesthc.com"),
  title: { default: title, template: "%s | Carenest Homecare" },
  description,
  authors: [{ name: "Carenest Homecare" }],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://carenesthc.com/",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Carenest Home Care — Compassionate In-Home Care Services" }],
  },
  twitter: { card: "summary_large_image", site: "@CarenestHomecare", title, description, images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9f7f3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrument.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
