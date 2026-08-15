import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import BuyCredits from "@/components/BuyCredits";

export default async function CreditsPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=%2Fcredits");
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <h1 className="h3 mb-3">Buy Credits</h1>
        <p className="text-secondary">
          Credits are $0.99 each. 1 credit = 1 download (SVG or PNG). You
          currently have <strong>{user.credits}</strong> credit
          {user.credits === 1 ? "" : "s"}.
        </p>
        <div className="alert alert-warning border-warning fw-bold text-center" role="alert">
          All credit purchases are final. No refunds for any reason.
        </div>
        <BuyCredits />
      </div>
    </div>
  );
}
