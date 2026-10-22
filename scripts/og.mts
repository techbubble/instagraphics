// Regenerates public/og.png (1200x630 social card): npm run gen:og
import { readFileSync, writeFileSync } from "node:fs";
import { TEMPLATES, templateSvg, displayValues } from "../src/lib/templates";
import { renderTemplate, DEFAULT_BRAND } from "../src/lib/svg-engine";
import { renderPng } from "../src/lib/server-render";

const icon = readFileSync("src/app/icon.svg", "utf8")
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");
const t = TEMPLATES.find((x) => x.id === "subway-map-2")!;
const v = displayValues(t, {});
const sample = renderTemplate(templateSvg(t, v), DEFAULT_BRAND, v)
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" font-family="Roboto">
<rect width="1200" height="630" fill="#ffffff"/>
<svg x="64" y="56" width="84" height="84" viewBox="800 440 800 800">${icon}</svg>
<text x="172" y="118" font-size="46" font-weight="bold" fill="#212529">Instagraphic</text>
<text x="64" y="262" font-size="52" font-weight="bold" fill="#212529">Turn your text into an</text>
<text x="64" y="326" font-size="52" font-weight="bold" fill="#0d6efd">animated graphic</text>
<text x="64" y="390" font-size="52" font-weight="bold" fill="#212529">in seconds.</text>
<text x="64" y="448" font-size="25" fill="#6c757d">Pick a layout, apply your colors and fonts,</text>
<text x="64" y="484" font-size="25" fill="#6c757d">type your content, and download SVG, PNG or GIF.</text>
<text x="64" y="560" font-size="27" font-weight="bold" fill="#0d6efd">$0.99 per graphic - no subscription</text>
<rect x="650" y="60" width="500" height="510" rx="16" fill="#ffffff" stroke="#dee2e6" stroke-width="2"/>
<svg x="660" y="70" width="480" height="490" viewBox="0 0 1000 1000">${sample}</svg>
</svg>`;
writeFileSync("public/og.png", await renderPng(svg, 1200, { checker: false }));
console.log("public/og.png written");
