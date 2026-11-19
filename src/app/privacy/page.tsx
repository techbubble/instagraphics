import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Instagraphic collects, how it is used, and how the Chrome extension and the Google Slides and Docs add-on handle your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-7">
        <h1 className="h3 mb-1 text-center">Privacy Policy</h1>
        <p className="text-secondary text-center small mb-4">
          Instagraphic &middot; www.instagraphic.app &middot; Last updated November 19, 2026
        </p>

        <h2 className="h6 fw-bold">1. What we collect</h2>
        <ul className="text-secondary">
          <li>
            <strong>Email address</strong>, used to sign you in with a one-time code and to
            identify your account.
          </li>
          <li>
            <strong>Graphics you save</strong>, including their text, colors, and fonts, so you
            can download and duplicate them later.
          </li>
          <li>
            <strong>Credit balance and purchase records</strong> (amount, date, credits). Payments
            are processed by Stripe; we never see or store card details.
          </li>
          <li>
            <strong>Usage data</strong>: anonymous, aggregate page statistics from Vercel
            Analytics, and per-layout view counts.
          </li>
        </ul>

        <h2 className="h6 fw-bold">2. How we use it</h2>
        <p className="text-secondary">
          Only to run the service: signing you in, storing and rendering your graphics, applying
          credits, and understanding which layouts are used. We do not sell personal data and do
          not use it for advertising profiles.
        </p>

        <h2 className="h6 fw-bold">3. Cookies</h2>
        <p className="text-secondary">
          One sign-in cookie keeps you logged in. It is marked so it also works when Instagraphic
          is opened inside the Chrome extension or the Slides and Docs add-on. We use the Reddit
          pixel to measure whether our ads lead to sign-ups and purchases.
        </p>

        <h2 className="h6 fw-bold">4. Chrome extension</h2>
        <p className="text-secondary">
          The extension opens www.instagraphic.app in Chrome&apos;s side panel. It stores one
          value on your device, the last Instagraphic page you had open, so the panel reopens
          there. It does not read, collect, or change the content of other websites, your tabs,
          or your browsing history.
        </p>

        <h2 className="h6 fw-bold">5. Google Slides and Google Docs add-on</h2>
        <p className="text-secondary">
          The add-on shows Instagraphic in a sidebar and inserts the graphics you choose into the
          presentation or document you have open. It requests access only to that current file
          (the <code>presentations.currentonly</code> and <code>documents.currentonly</code>{" "}
          scopes) and permission to show the sidebar. It uses this access only to add the image
          you selected. It does not read, store, or transmit the contents of your files, and it
          does not access your other Google files or your Google account information.
        </p>
        <p className="text-secondary">
          Instagraphic&apos;s use and transfer of information received from Google APIs adheres
          to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2 className="h6 fw-bold">6. Sharing</h2>
        <p className="text-secondary">
          We share data only with the providers that run the service: Vercel (hosting and
          analytics), Neon (database), Stripe (payments), and our email provider (sign-in codes).
          We may disclose data if required by law.
        </p>

        <h2 className="h6 fw-bold">7. Retention and deletion</h2>
        <p className="text-secondary">
          Your account and graphics are kept until you ask us to delete them. To delete your
          account and data, email info@instagraphic.app and we will do so within 30 days.
          Purchase records may be kept as required for tax and accounting.
        </p>

        <h2 className="h6 fw-bold">8. Changes and contact</h2>
        <p className="text-secondary mb-5">
          We will post changes on this page. Questions: info@instagraphic.app. See also the{" "}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </div>
    </div>
  );
}
