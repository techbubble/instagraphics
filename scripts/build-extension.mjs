// Builds the Chrome extension into extension/dist.
//   node scripts/build-extension.mjs            -> production (www.instagraphic.app) + zip
//   node scripts/build-extension.mjs --dev 3002 -> points at http://localhost:<port>
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const args = process.argv.slice(2);
const devIdx = args.indexOf("--dev");
const dev = devIdx !== -1;
const base = dev ? `http://localhost:${args[devIdx + 1] || "3000"}` : "https://www.instagraphic.app";

const src = "extension/src";
const out = "extension/dist";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(src, out, { recursive: true });

for (const f of ["manifest.json", "popup.js"]) {
  const p = join(out, f);
  writeFileSync(p, readFileSync(p, "utf8").replaceAll("__BASE__", base));
}
if (dev) {
  const p = join(out, "manifest.json");
  const m = JSON.parse(readFileSync(p, "utf8"));
  m.name += " (dev)";
  writeFileSync(p, JSON.stringify(m, null, 2) + "\n");
}

const svg = readFileSync("src/app/icon.svg");
mkdirSync(join(out, "icons"), { recursive: true });
for (const size of [16, 32, 48, 128]) {
  const png = new Resvg(svg, { fitTo: { mode: "width", value: size } }).render().asPng();
  writeFileSync(join(out, "icons", `${size}.png`), png);
}

if (!dev) {
  const version = JSON.parse(readFileSync(join(out, "manifest.json"), "utf8")).version;
  const zip = `extension/instagraphic-extension-${version}.zip`;
  rmSync(zip, { force: true });
  execFileSync("zip", ["-qr", join("..", "..", zip), ...readdirSync(out)], { cwd: out });
  console.log(`Built ${out} and ${zip} for ${base}`);
} else {
  console.log(`Built ${out} for ${base}`);
}
