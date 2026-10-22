import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import DownloadButtons from "@/components/DownloadButtons";
import AnimatedPreview from "@/components/AnimatedPreview";

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
    SELECT id, title, paid_at FROM graphics
    WHERE id = ${graphicId} AND user_id = ${user.id}
  `) as { id: number; title: string; paid_at: string | null }[];
  const graphic = rows[0];
  if (!graphic) notFound();

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="ig-preview border rounded p-2">
          <AnimatedPreview
            src={`/api/graphics/${graphic.id}/preview?w=1000`}
            animSrc={`/api/graphics/${graphic.id}/preview?w=640&anim=1`}
            alt={graphic.title}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <h1 className="h4">{graphic.title}</h1>
        <div className="alert alert-info py-2 small">
          Downloads are cropped to the graphic&apos;s content with a
          transparent background. The SVG plays the animation in browsers;
          the GIF is the animation itself, for slides, email, and social
          posts.
        </div>
        {graphic.paid_at || user.credits > 0 ? (
          <DownloadButtons graphicId={graphic.id} paid={!!graphic.paid_at} size="lg" goToLibrary />
        ) : (
          <Link href="/credits" className="btn btn-warning btn-lg px-4">
            Buy Credits
          </Link>
        )}
      </div>
    </div>
  );
}
