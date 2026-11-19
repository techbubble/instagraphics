import type { Metadata } from "next";
import Link from "next/link";
import HeroDemo, { type HeroScene } from "@/components/HeroDemo";
import { CATEGORIES, TEMPLATES, getTemplate, templateSvg } from "@/lib/templates";
import { renderTemplate, type BrandKit } from "@/lib/svg-engine";
import { timeline, toAnimatedSvg } from "@/lib/animate";
import { cropToContent } from "@/lib/server-render";
import { CHROME_WEB_STORE_URL, STORES_LIVE, WORKSPACE_MARKETPLACE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "About",
  description:
    "Type your text, pick a layout, and get an animated graphic in your brand colors. 229 layouts, SVG, PNG and GIF downloads, $0.20 per graphic with no subscription.",
  alternates: { canonical: "/about" },
};

const LINES = ["Pick a layout", "Type your text", "Add your brand", "Download"];

const SCENES: { id: string; layout: string; font: string; colors: string[] }[] = [
  { id: "process-arrow-4", layout: "Process Arrows", font: "Roboto", colors: ["#0d6efd", "#3be8bd", "#ffc107", "#f55151", "#495057"] },
  { id: "roadmap-4", layout: "Roadmap", font: "Poppins", colors: ["#6f42c1", "#20c997", "#fd7e14", "#e83e8c", "#343a40"] },
  { id: "staircase-4", layout: "Staircase", font: "Montserrat", colors: ["#0b7285", "#66d9e8", "#fcc419", "#ff6b6b", "#1b2a41"] },
  { id: "cycle-4", layout: "Cycle", font: "Nunito", colors: ["#2b8a3e", "#94d82d", "#fab005", "#f76707", "#212529"] },
  { id: "funnel-4", layout: "Funnel", font: "Raleway", colors: ["#c2255c", "#f783ac", "#ffa94d", "#845ef7", "#2d1b2e"] },
  { id: "pyramid-4", layout: "Pyramid", font: "Oswald", colors: ["#1864ab", "#4dabf7", "#ffe066", "#ff8787", "#0b2545"] },
];

async function buildScenes(): Promise<HeroScene[]> {
  const values = Object.fromEntries(LINES.map((l, i) => [`item${i + 1}`, l]));
  const scenes = await Promise.all(SCENES.map(async (s) => {
    const t = getTemplate(s.id);
    if (!t) return null;
    const [primary, secondary, tertiary, quaternary, accent] = s.colors;
    const brand: BrandKit = {
      colors: { primary, secondary, tertiary, quaternary, accent },
      fonts: { primary: s.font, secondary: s.font },
    };
    const svg = await cropToContent(renderTemplate(templateSvg(t, values), brand, values), 0.04);
    const { active, rest } = timeline(svg);
    const ms = Math.max(3600, Math.round((active + rest) * 1000));
    return { layout: s.layout, font: s.font, colors: s.colors, svg: toAnimatedSvg(svg), ms };
  }));
  return scenes.filter((s): s is HeroScene => s !== null);
}

const STEPS = [
  {
    title: "Pick a layout",
    text: `Browse ${TEMPLATES.length} layouts across ${CATEGORIES.length} categories: process flows, timelines, cycles, Venn diagrams, SWOT, org trees, subway maps and world maps.`,
    icon: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  },
  {
    title: "Type your text",
    text: "Fill in a few short fields. The preview updates as you type, and your text follows you when you switch layouts.",
    icon: "M4 6h16M4 12h10M4 18h13",
  },
  {
    title: "Apply your brand",
    text: "Set your colors and fonts once. Every layout picks them up automatically, so your graphics match your deck.",
    icon: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-.9-.7-1.4-.7-2.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4.2-4-7.6-9-7.6zM7.5 12a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm3-4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm4.5 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z",
  },
  {
    title: "Download",
    text: "Get an editable SVG that animates in the browser, a transparent PNG, and an animated GIF for slides, email and social.",
    icon: "M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14",
  },
];

function Icon({ d }: { d: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function StoreButton({ href, label, sub, icon, dark }: { href: string; label: string; sub: string; icon: string; dark?: boolean }) {
  return (
    <a href={href} className={`ig-store-btn ${dark ? "ig-store-btn-dark" : ""}`}>
      <Icon d={icon} />
      <span className="text-start lh-sm">
        <span className="d-block small opacity-75">{sub}</span>
        <span className="d-block fw-semibold">{label}</span>
      </span>
    </a>
  );
}

const PUZZLE = "M10 3a2 2 0 0 1 4 0v2h4a1 1 0 0 1 1 1v4h-2a2 2 0 0 0 0 4h2v4a1 1 0 0 1-1 1h-4v-2a2 2 0 0 0-4 0v2H6a1 1 0 0 1-1-1v-4h2a2 2 0 0 0 0-4H5V6a1 1 0 0 1 1-1h4z";
const SLIDES = "M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM7 8h10v7H7z";

export default async function AboutPage() {
  const scenes = await buildScenes();
  const soon = STORES_LIVE ? null : <span className="badge rounded-pill text-bg-warning ms-2">Coming soon</span>;

  return (
    <>
      <section className="ig-hero ig-fullbleed">
        <div className="ig-blob ig-blob-1" />
        <div className="ig-blob ig-blob-2" />
        <div className="ig-blob ig-blob-3" />
        <div className="ig-hero-grid" />
        <div className="container position-relative py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="ig-eyebrow mb-3">{TEMPLATES.length} layouts. Your brand. Zero design time.</div>
              <h1 className="ig-hero-title mb-3">
                Type your words. Get an <span className="ig-grad-text">animated graphic</span> in seconds.
              </h1>
              <p className="ig-hero-sub mb-4">
                Instagraphic turns a few lines of text into an animated diagram in your colors and fonts,
                ready for slides, docs and social.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link href="/" className="btn btn-light btn-lg fw-semibold px-4">
                  Start building free
                </Link>
                <a href="#pricing" className="btn btn-outline-light btn-lg px-4">
                  $0.20 per graphic
                </a>
              </div>
              <div className="d-flex flex-wrap gap-2">
                <StoreButton href={CHROME_WEB_STORE_URL} sub="Add to" label="Chrome" icon={PUZZLE} dark />
                <StoreButton href={WORKSPACE_MARKETPLACE_URL} sub="Get it for" label="Google Slides & Docs" icon={SLIDES} dark />
              </div>
            </div>
            <div className="col-lg-7">
              <HeroDemo lines={LINES} scenes={scenes} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="text-center mb-5">
          <div className="text-primary fw-semibold text-uppercase small mb-2">How it works</div>
          <h2 className="h1 fw-bold">From blank page to finished graphic in four steps</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: 560 }}>
            No canvas, no alignment, no export settings. You only write the words.
          </p>
        </div>
        <div className="row g-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="col-sm-6 col-lg-3">
              <div className="ig-step h-100">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="ig-step-icon"><Icon d={s.icon} /></span>
                  <span className="ig-step-num">0{i + 1}</span>
                </div>
                <h3 className="h5 fw-bold">{s.title}</h3>
                <p className="text-secondary mb-0">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="ig-pricing ig-fullbleed py-5">
        <div className="container py-3">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="text-primary fw-semibold text-uppercase small mb-2">Pricing</div>
              <h2 className="h1 fw-bold mb-3">Pay per graphic. No subscription.</h2>
              <p className="text-secondary fs-5 mb-4">
                Every new account gets <strong className="text-dark">5 free credits</strong>. After that,
                credits are $0.20 each, sold in $1 packs of 5. One credit unlocks one graphic forever.
              </p>
              <ul className="ig-checks mb-4">
                <li>All three formats: SVG, PNG and animated GIF</li>
                <li>Unlimited re-downloads of every unlocked graphic</li>
                <li>Credits never expire</li>
                <li>Commercial use included: decks, docs, websites, ads and print</li>
                <li>Try any layout without an account</li>
              </ul>
              <Link href="/" className="btn btn-primary btn-lg px-4">
                Make your first graphic free
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="ig-price-card">
                <div className="ig-price-tag">
                  <span className="ig-price-amt">$0.20</span>
                  <span className="ig-price-unit">per graphic</span>
                </div>
                <div className="text-secondary mb-4">5 free on signup</div>
                <div className="row g-2 text-center">
                  {[
                    [1, 5],
                    [5, 25],
                    [20, 100],
                  ].map(([usd, n]) => (
                    <div key={usd} className="col-4">
                      <div className="ig-pack">
                        <div className="fs-4 fw-bold">${usd}</div>
                        <div className="small text-secondary">{n} graphics</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="py-5">
        <div className="text-center mb-5">
          <div className="text-primary fw-semibold text-uppercase small mb-2">Where you work</div>
          <h2 className="h1 fw-bold">Use it in your browser and in Google Slides</h2>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="ig-app-card h-100">
              <span className="ig-step-icon mb-3"><Icon d={PUZZLE} /></span>
              <h3 className="h5 fw-bold">Chrome extension{soon}</h3>
              <p className="text-secondary">
                Open Instagraphic from your toolbar on any page, build a graphic in a small popup, and
                download it without switching tabs.
              </p>
              <StoreButton href={CHROME_WEB_STORE_URL} sub="Available in the" label="Chrome Web Store" icon={PUZZLE} />
            </div>
          </div>
          <div className="col-md-6 col-lg-5">
            <div className="ig-app-card h-100">
              <span className="ig-step-icon mb-3"><Icon d={SLIDES} /></span>
              <h3 className="h5 fw-bold">Google Workspace add-on{soon}</h3>
              <p className="text-secondary">
                Build graphics in a sidebar inside Google Slides and Docs and insert them straight into
                your slide or document.
              </p>
              <StoreButton href={WORKSPACE_MARKETPLACE_URL} sub="Available in the" label="Workspace Marketplace" icon={SLIDES} />
            </div>
          </div>
        </div>
      </section>

      <section className="ig-cta ig-fullbleed text-center py-5 mb-n4">
        <div className="container py-4 position-relative">
          <h2 className="h1 fw-bold text-white mb-3">Your next graphic is a few words away.</h2>
          <p className="ig-hero-sub mb-4">Start with 5 free graphics. No credit card required.</p>
          <Link href="/" className="btn btn-light btn-lg fw-semibold px-5">
            Start building
          </Link>
        </div>
      </section>
    </>
  );
}
