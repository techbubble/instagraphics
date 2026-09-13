import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

// Analyzes an uploaded document into the submap structure. All content
// and geometry instructions live in subwaymap.md at the repo root.

const TOOL = {
  name: "submap",
  description: "Report the document distilled into a subway map: lines with octilinear paths, stations with coordinates, junction stations shared between lines.",
  input_schema: {
    type: "object",
    properties: {
      lines: {
        type: "array",
        minItems: 2,
        maxItems: 6,
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Short thread name, max 14 chars" },
            loop: { type: "boolean", description: "true for the (at most one) closed-circuit line" },
            path: {
              type: "array",
              minItems: 2,
              maxItems: 8,
              items: { type: "array", minItems: 2, maxItems: 2, items: { type: "number" } },
              description: "Ordered waypoints on the 0-100 grid; segments horizontal, vertical or 45 degrees",
            },
            stations: {
              type: "array",
              minItems: 3,
              maxItems: 7,
              items: {
                type: "object",
                properties: {
                  label: { type: "string", description: "Station label, 1-3 words, max 20 chars" },
                  detail: { type: "string", description: "1-2 sentences for the popup, quoting the document" },
                  at: { type: "array", minItems: 2, maxItems: 2, items: { type: "number" }, description: "Grid coordinates, must lie on this line's path" },
                },
                required: ["label", "detail", "at"],
              },
            },
          },
          required: ["name", "loop", "path", "stations"],
        },
      },
    },
    required: ["lines"],
  },
};

const PROMPT = readFileSync(join(process.cwd(), "subwaymap.md"), "utf8");

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in to analyze documents." }, { status: 401 });
  const key = process.env.AI_GATEWAY_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "No AI API key configured on the server." },
      { status: 503 }
    );
  }
  let body: { text?: string; pdfBase64?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Vercel AI Gateway, OpenAI-compatible chat completions.
  const content: unknown[] = [];
  if (body.pdfBase64 && typeof body.pdfBase64 === "string" && body.pdfBase64.length < 8_000_000) {
    content.push({
      type: "file",
      file: { filename: "document.pdf", file_data: `data:application/pdf;base64,${body.pdfBase64}` },
    });
  } else if (body.text && typeof body.text === "string") {
    content.push({ type: "text", text: `<document>\n${body.text.slice(0, 60_000)}\n</document>` });
  } else {
    return NextResponse.json({ error: "No document provided." }, { status: 400 });
  }
  content.push({ type: "text", text: PROMPT });

  const res = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-sonnet-5",
      max_tokens: 3000,
      tools: [{ type: "function", function: { name: TOOL.name, description: TOOL.description, parameters: TOOL.input_schema } }],
      tool_choice: { type: "function", function: { name: TOOL.name } },
      messages: [{ role: "user", content }],
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error("submap analyze failed:", res.status, detail.slice(0, 500));
    return NextResponse.json({ error: "Analysis failed." }, { status: 502 });
  }
  const data = await res.json();
  const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  if (!args) {
    return NextResponse.json({ error: "Analysis returned no structure." }, { status: 502 });
  }
  try {
    let parsed = JSON.parse(args);
    // Some models double-encode: { lines: "<json string>" }.
    if (typeof parsed.lines === "string") {
      const inner = JSON.parse(parsed.lines);
      parsed = Array.isArray(inner) ? { lines: inner } : inner;
    }
    if (!Array.isArray(parsed.lines)) throw new Error("no lines array");
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Analysis returned malformed structure." }, { status: 502 });
  }
}
