import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import DownloadButtons from "@/components/DownloadButtons";

export default async function MyGraphicsPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=%2Fgraphics");
  const rows = (await sql()`
    SELECT id, title, created_at FROM graphics
    WHERE user_id = ${user.id}
    ORDER BY created_at DESC
  `) as { id: number; title: string; created_at: string }[];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">My Graphics</h1>
        <span className="text-secondary small">
          {user.credits} credit{user.credits === 1 ? "" : "s"} &middot; 1 credit per download
        </span>
      </div>
      {rows.length === 0 ? (
        <p className="text-secondary">
          Nothing here yet. <Link href="/">Pick a layout</Link> to build your first graphic.
        </p>
      ) : (
        <div className="row g-4">
          {rows.map((g) => (
            <div key={g.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card ig-tile h-100">
                <div className="ig-tile-preview border-bottom">
                  {/* eslint-disable-next-line @next/next/no-img-element -- dynamic PNG endpoint */}
                  <img
                    src={`/api/graphics/${g.id}/preview?w=400`}
                    alt={g.title}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    draggable={false}
                  />
                </div>
                <div className="card-body py-2">
                  <div className="fw-semibold">{g.title}</div>
                  <div className="small text-secondary mb-2">
                    {new Date(g.created_at).toLocaleDateString()}
                  </div>
                  <DownloadButtons graphicId={g.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
