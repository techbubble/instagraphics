import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Instagraphic credits, licensing, downloads, and accounts.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Instagraphic?",
    a: "Instagraphic turns your text into a professional graphic in seconds. Pick a layout, type your content, apply your brand colors and fonts with a live preview, and download the finished graphic.",
  },
  {
    q: "Why should I use Instagraphic?",
    a: "Time. You could build the same diagram in Canva, PowerPoint, or an AI image tool - but you'll spend ten minutes or more fiddling with alignment, colors, and export settings, and AI tools can't give you a clean, editable vector. On Instagraphic you type your text, your saved brand colors and fonts apply themselves, and within seconds you're dropping a crisp, editable SVG into your document. If you value your time, it isn't close.",
  },
  {
    q: "What does a credit do, and what does it cost?",
    a: "Credits cost $0.99 each. One credit unlocks one saved graphic permanently: after the first download you can re-download that graphic in either SVG or PNG format, as many times as you like, at no extra cost. Credits never expire.",
  },
  {
    q: "Can I use the graphics commercially?",
    a: "Yes. Every downloaded graphic comes with a license for personal and commercial use - presentations, documents, websites, social media, ads, and print. The only thing you may not do is resell or redistribute the graphics or layouts as templates. See the Terms for details.",
  },
  {
    q: "What exactly do I download?",
    a: "Two formats: an SVG (crisp vector at any size, with editable text) and a PNG with a transparent background. Both are cropped to the graphic's content, ready to drop into any document.",
  },
  {
    q: "Do I need an account to try it?",
    a: "No. You can customize any layout without signing in - your colors, fonts, and text are kept in your browser. An account (free) is only needed when you save a graphic, and your in-progress work carries over when you sign in.",
  },
  {
    q: "Why is there no password?",
    a: "Signing in works with a 6-digit code emailed to you. There is no password to create, remember, or leak.",
  },
  {
    q: "Why do previews have a checkered background and watermark?",
    a: "On-screen previews are marked so they are visibly not production files. The files you download are clean: no watermark, no checkerboard, transparent background.",
  },
  {
    q: "What is the refund policy?",
    a: "All credit purchases are final and non-refundable. No refunds, credits, or exchanges are issued.",
  },
];

export default function FaqPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-7">
        <h1 className="h3 mb-4 text-center">Frequently Asked Questions</h1>
        {FAQS.map((f) => (
          <div key={f.q} className="mb-4">
            <h2 className="h6 fw-bold">{f.q}</h2>
            <p className="text-secondary mb-0">{f.a}</p>
          </div>
        ))}
        <p className="text-secondary small mt-5">
          More detail in the <Link href="/terms">Terms &amp; Privacy</Link>.
          Questions? Email <a href="mailto:info@instagraphic.app">info@instagraphic.app</a>.
        </p>
      </div>
    </div>
  );
}
