import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://instagraphics.vercel.app";
const DESCRIPTION =
  "Build branded infographics in seconds. Pick a layout, apply your colors and fonts, type your content, and download as SVG or PNG.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Instagraphics",
    template: "%s | Instagraphics",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Instagraphics",
    description: DESCRIPTION,
    url: "/",
    siteName: "Instagraphics",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Instagraphics - build branded infographics in seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagraphics",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout, loads app-wide */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;700&family=Nunito:wght@400;700&family=Open+Sans:wght@400;700&family=Oswald:wght@400;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;700&family=Raleway:wght@400;700&family=Roboto:wght@400;700&display=swap"
        />
      </head>
      <body className="bg-white">
        <Navbar />
        <main className="container py-4">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
