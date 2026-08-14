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
      <body className="bg-white">
        <Navbar />
        <main className="container py-4">{children}</main>
        <footer className="border-top py-4 mt-5">
          <div className="container text-secondary small">
            Instagraphics &middot; Build branded infographics in seconds.
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
