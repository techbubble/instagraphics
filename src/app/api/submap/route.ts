import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";

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
        maxItems: 8,
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Short thread name, max 14 chars" },
            loop: { type: "boolean", description: "true for the (at most one) closed-circuit line" },
            path: {
              type: "array",
              minItems: 2,
              maxItems: 12,
              items: { type: "array", minItems: 2, maxItems: 2, items: { type: "number" } },
              description: "Ordered waypoints on the 0-100 grid; segments horizontal, vertical or 45 degrees",
            },
            stations: {
              type: "array",
              minItems: 2,
              maxItems: 14,
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

type SubmapLine = {
  name: string;
  loop: boolean;
  path: [number, number][];
  stations: { label: string; detail: string; at: [number, number] }[];
};

function distToSegment(p: [number, number], a: [number, number], b: [number, number]): number {
  const vx = b[0] - a[0], vy = b[1] - a[1];
  const len2 = vx * vx + vy * vy || 1;
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / len2));
  return Math.hypot(p[0] - (a[0] + vx * t), p[1] - (a[1] + vy * t));
}

function validateMap(lines: SubmapLine[]): string[] {
  const issues: string[] = [];
  for (const l of lines) {
    const path = l.loop ? [...l.path, l.path[0]] : l.path;
    for (let i = 0; i < path.length - 1; i++) {
      const dx = path[i + 1][0] - path[i][0];
      const dy = path[i + 1][1] - path[i][1];
      if (Math.abs(dx) > 0.5 && Math.abs(dy) > 0.5 && Math.abs(Math.abs(dx) - Math.abs(dy)) > 1) {
        issues.push(`Line "${l.name}": segment [${path[i]}] -> [${path[i + 1]}] is not horizontal, vertical or 45 degrees.`);
      }
    }
    for (const [x, y] of l.path) {
      if (x < 2 || x > 98 || y < 2 || y > 98) issues.push(`Line "${l.name}": waypoint [${x},${y}] is outside the 6..94 range.`);
    }
    for (const st of l.stations) {
      let best = Infinity;
      for (let i = 0; i < path.length - 1; i++) best = Math.min(best, distToSegment(st.at, path[i], path[i + 1]));
      if (best > 3) issues.push(`Line "${l.name}": station "${st.label}" at [${st.at}] is ${best.toFixed(1)} units off the line's path.`);
    }
  }
  if (lines.length > 8) issues.push(`Map has ${lines.length} lines; maximum is 8. Merge related threads.`);
  for (const l of lines) {
    let plen = 0;
    const path = l.loop ? [...l.path, l.path[0]] : l.path;
    for (let i = 0; i < path.length - 1; i++) plen += Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
    if (plen < 18) issues.push(`Line "${l.name}" is a stub (path length ${plen.toFixed(0)} units). Every line must travel across a meaningful part of the map; merge it into another thread or extend it.`);
    if (l.stations.length < 2) issues.push(`Line "${l.name}" has fewer than 2 stations.`);
    if (!l.loop && l.path.length >= 2) {
      const [x0, y0] = l.path[0];
      const straight = l.path.every(([x, y]) => (x - x0) * (l.path[l.path.length - 1][1] - y0) === (y - y0) * (l.path[l.path.length - 1][0] - x0));
      if (straight) issues.push(`Line "${l.name}" is perfectly straight end to end; every line needs at least one bend.`);
    }
  }
  const byLabel = new Map<string, [number, number][]>();
  for (const l of lines) for (const st of l.stations) {
    const k = st.label.toLowerCase();
    if (!byLabel.has(k)) byLabel.set(k, []);
    byLabel.get(k)!.push(st.at);
  }
  for (const [label, ats] of byLabel) {
    if (ats.length < 2) continue;
    for (let i = 1; i < ats.length; i++) {
      if (Math.hypot(ats[i][0] - ats[0][0], ats[i][1] - ats[0][1]) > 1.5) {
        issues.push(`Junction "${label}" has different coordinates on its lines; they must be identical.`);
        break;
      }
    }
  }
  return issues;
}

export async function POST(req: NextRequest) {
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

  async function generate(messages: unknown[]): Promise<{ lines: SubmapLine[] } | null> {
    const res = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "anthropic/claude-opus-5",
        max_tokens: 8000,
        tools: [{ type: "function", function: { name: TOOL.name, description: TOOL.description, parameters: TOOL.input_schema } }],
        tool_choice: { type: "function", function: { name: TOOL.name } },
        messages,
      }),
    });
    if (!res.ok) {
      console.error("submap analyze failed:", res.status, (await res.text()).slice(0, 500));
      return null;
    }
    const data = await res.json();
    const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) return null;
    try {
      let parsed = JSON.parse(args);
      if (typeof parsed.lines === "string") {
        const inner = JSON.parse(parsed.lines);
        parsed = Array.isArray(inner) ? { lines: inner } : inner;
      }
      if (!Array.isArray(parsed.lines)) return null;
      return parsed as { lines: SubmapLine[] };
    } catch {
      return null;
    }
  }

  const first = await generate([{ role: "user", content }]);
  if (!first) return NextResponse.json({ error: "Analysis failed." }, { status: 502 });
  let result = first;
  const issues = validateMap(result.lines);
  if (issues.length > 0) {
    // One repair round: hand the violations back for a corrected map.
    const repair = await generate([
      { role: "user", content },
      { role: "assistant", content: `Previous map attempt:\n${JSON.stringify(result)}` },
      {
        role: "user",
        content: `Your map has geometry violations:\n- ${issues.slice(0, 20).join("\n- ")}\n\nRegenerate the COMPLETE map fixing every violation while keeping the same content and overall design.`,
      },
    ]);
    if (repair) {
      const remaining = validateMap(repair.lines);
      if (remaining.length === 0 || remaining.length < issues.length) result = repair;
    }
  }
  return NextResponse.json(result);
}
