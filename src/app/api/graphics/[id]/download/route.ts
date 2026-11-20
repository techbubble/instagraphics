import { NextRequest, NextResponse } from "next/server";
import { sessionUserId } from "@/lib/auth";
import { toAnimatedSvg } from "@/lib/animate";
import { cropToContent, renderGif } from "@/lib/server-render";
import { unlockGraphic } from "@/lib/unlock";

// First download of a graphic charges 1 credit and unlocks it; after that
// the owner can download it in any format, any number of times, for free.
// SVG responses are JSON carrying the animated (SMIL) vector; GIF
// responses are the encoded animation itself.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const uid = await sessionUserId();
  if (uid == null) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
  const { id } = await params;
  const graphicId = Number(id);
  if (!Number.isInteger(graphicId)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  let format = "svg";
  try {
    const body = await req.json();
    if (body.format === "png" || body.format === "gif") format = body.format;
  } catch {
    // default to svg
  }

  const graphic = await unlockGraphic(uid, graphicId, format);
  if (graphic === "not_found") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (graphic === "insufficient_credits") {
    return NextResponse.json({ error: "insufficient_credits" }, { status: 402 });
  }

  const cropped = await cropToContent(graphic.svg);
  if (format === "gif") {
    try {
      const gif = await renderGif(cropped, 800, { checker: false, transparent: true });
      return new NextResponse(new Uint8Array(gif), {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "private, no-store",
          "X-Title": encodeURIComponent(graphic.title),
        },
      });
    } catch {
      return NextResponse.json({ error: "Render failed" }, { status: 500 });
    }
  }
  return NextResponse.json({
    svg: format === "svg" ? toAnimatedSvg(cropped) : cropped,
    title: graphic.title,
  });
}
