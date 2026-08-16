import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Privacy",
  description: "Terms of service, license, refund policy, and privacy policy for Instagraphic.",
};

export default function TermsPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-7">
        <h1 className="h3 mb-1 text-center">Terms &amp; Privacy</h1>
        <p className="text-secondary text-center small mb-4">
          Instagraphic &middot; www.instagraphic.app &middot; Last updated August 15, 2026
        </p>

        <h2 className="h6 fw-bold">1. The service</h2>
        <p className="text-secondary">
          Instagraphic lets you customize graphic layouts with your own text,
          colors, and fonts, and download the result as SVG or PNG files. By
          using the site you agree to these terms.
        </p>

        <h2 className="h6 fw-bold">2. Accounts</h2>
        <p className="text-secondary">
          Accounts are created automatically when you sign in with a one-time
          code sent to your email address. You are responsible for access to
          that email address. We may suspend accounts that abuse the service.
        </p>

        <h2 className="h6 fw-bold">3. Credits and payments</h2>
        <p className="text-secondary">
          Credits cost $0.99 each and are purchased through Stripe. One credit
          unlocks one saved graphic for unlimited downloads in both formats.
          Credits never expire. All credit purchases are final and
          non-refundable; no refunds, credits, or exchanges are issued for any
          reason.
        </p>

        <h2 className="h6 fw-bold">4. License to downloaded graphics</h2>
        <p className="text-secondary">
          When you unlock a graphic, Instagraphic grants you a perpetual,
          worldwide, non-exclusive license to use, reproduce, modify, and
          display that graphic for personal and commercial purposes, including
          presentations, documents, websites, social media, advertising, and
          print. You may not resell, sublicense, or redistribute the graphics
          or the underlying layouts as templates, design assets, or as part of
          a competing service. The layouts themselves remain the property of
          Instagraphic.
        </p>

        <h2 className="h6 fw-bold">5. Acceptable use</h2>
        <p className="text-secondary">
          Do not use the service to create unlawful, deceptive, or infringing
          content, and do not attempt to circumvent payment, scrape the
          service, or interfere with its operation.
        </p>

        <h2 className="h6 fw-bold">6. Privacy</h2>
        <p className="text-secondary">
          We store your email address, your saved graphics, and your saved
          preferences (colors, fonts, and field text) to operate the service.
          Payments are processed by Stripe; we never see or store your card
          details. Transactional email (sign-in codes) is sent to the address
          you provide. We use Vercel Analytics for anonymous, aggregate usage
          statistics. We do not sell personal data. To delete your account and
          data, email info@instagraphic.app.
        </p>

        <h2 className="h6 fw-bold">7. Disclaimer and liability</h2>
        <p className="text-secondary">
          The service is provided as-is, without warranties of any kind. To the
          maximum extent permitted by law, Instagraphic&apos;s total liability
          for any claim related to the service is limited to the amount you
          paid in the twelve months before the claim.
        </p>

        <h2 className="h6 fw-bold">8. Changes</h2>
        <p className="text-secondary">
          We may update these terms as the service evolves; the current version
          is always at this page. Continued use after changes constitutes
          acceptance.
        </p>

        <h2 className="h6 fw-bold">9. Contact</h2>
        <p className="text-secondary mb-5">
          Instagraphic &middot; info@instagraphic.app
        </p>
      </div>
    </div>
  );
}
