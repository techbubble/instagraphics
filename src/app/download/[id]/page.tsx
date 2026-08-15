import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import DownloadButtons from "@/components/DownloadButtons";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/login");
  const { id } = await params;
  const graphicId = Number(id);
  if (!Number.isInteger(graphicId)) notFound();
  const rows = (await sql()`
    SELECT id, title, svg FROM graphics
    WHERE id = ${graphicId} AND user_id = ${user.id}
  `) as { id: number; title: string; svg: string }[];
  const graphic = rows[0];
  if (!graphic) notFound();

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div
          className="ig-preview border rounded p-2"
          dangerouslySetInnerHTML={{ __html: graphic.svg }}
        />
      </div>
      <div className="col-lg-4">
        <h1 className="h4">{graphic.title}</h1>
        <p className="text-secondary">
          Each download uses 1 credit. You have{" "}
          <strong>{user.credits}</strong> credit{user.credits === 1 ? "" : "s"}.
        </p>
        {user.credits > 0 ? (
          <DownloadButtons graphicId={graphic.id} size="lg" />
        ) : (
          <div className="alert alert-warning">
            You are out of credits.{" "}
            <Link href="/credits">Buy credits</Link> to download.
          </div>
        )}
        <hr />
        <Link href="/graphics" className="btn btn-outline-secondary btn-sm me-2">
          My Graphics
        </Link>
        <Link href="/" className="btn btn-outline-secondary btn-sm">
          Make another
        </Link>
      </div>
    </div>
  );
}
