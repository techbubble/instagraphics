import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Instagraphics",
  description: "Build branded infographics in seconds.",
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
        <footer className="border-top py-4 mt-5">
          <div className="container-fluid px-3 text-secondary small">
            Instagraphics &middot; Build branded infographics in seconds.
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
