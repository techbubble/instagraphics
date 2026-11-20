import { NextRequest, NextResponse } from "next/server";
import { addonUserId } from "@/lib/addon";
import { cropToContent, renderGif, renderPng } from "@/lib/server-render";
import { unlockGraphic } from "@/lib/unlock";

// Image for the add-on to insert into the open deck or doc. Charges the
// first-download credit like the site's Download buttons. PNG is rendered
// here (the site renders it in the browser) with a transparent background.
export async function POST(req: NextRequest) {
  const uid = await addonUserId(req);
  if (uid == null) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let graphicId = NaN;
  let format = "png";
  try {
    const body = await req.json();
    graphicId = Number(body.id);
    if (body.format === "gif") format = "gif";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!Number.isInteger(graphicId)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const graphic = await unlockGraphic(uid, graphicId, format);
  if (graphic === "not_found") return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (graphic === "insufficient_credits") {
    return NextResponse.json({ error: "insufficient_credits" }, { status: 402 });
  }

  try {
    const cropped = await cropToContent(graphic.svg);
    const bytes =
      format === "gif"
        ? await renderGif(cropped, 800, { checker: false, transparent: true })
        : await renderPng(cropped, 1600, { checker: false });
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": format === "gif" ? "image/gif" : "image/png",
        "Cache-Control": "private, no-store",
        "X-Title": encodeURIComponent(graphic.title),
      },
    });
  } catch {
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }
}
