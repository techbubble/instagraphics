// Dynamic calendar renderer: Other 1 names the month ("March 2027",
// "Mar 2027", "2027-03", "3/2027"); each item field is "day, label". The
// grid is laid out for the real month (weekday offset, day count), days
// named in items are highlighted, and a legend lists the labels.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SLOTS = ["primary", "secondary", "tertiary", "quaternary", "accent"];
const LIGHT = new Set(["secondary", "tertiary"]);
const KEYS = ["item1", "item2", "item3", "item4", "item5", "other2", "other3"];

export const CALENDAR_DEFAULTS: Record<string, string> = {
  other1: "March 2027",
  item1: "2, Kickoff",
  item2: "9, Beta",
  item3: "16, Press day",
  item4: "23, Launch",
  item5: "30, Review",
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function parseMonth(input: string): { year: number; month: number } {
  const s = input.trim();
  const now = new Date();
  let m: RegExpMatchArray | null;
  if ((m = s.match(/^(\d{4})[-/.](\d{1,2})$/))) return { year: +m[1], month: Math.min(12, Math.max(1, +m[2])) - 1 };
  if ((m = s.match(/^(\d{1,2})[-/.](\d{4})$/))) return { year: +m[2], month: Math.min(12, Math.max(1, +m[1])) - 1 };
  if ((m = s.match(/^([A-Za-z]+)\.?,?\s*(\d{4})?$/))) {
    const name = m[1].toLowerCase();
    const idx = MONTHS.findIndex((x) => x.toLowerCase().startsWith(name.slice(0, 3)));
    if (idx >= 0 && name.length >= 3) return { year: m[2] ? +m[2] : now.getFullYear(), month: idx };
  }
  if ((m = s.match(/^(\d{4})\s+([A-Za-z]+)$/))) {
    const idx = MONTHS.findIndex((x) => x.toLowerCase().startsWith(m![2].toLowerCase().slice(0, 3)));
    if (idx >= 0) return { year: +m[1], month: idx };
  }
  const d = parseMonth(CALENDAR_DEFAULTS.other1);
  return d;
}

export function buildCalendarSvg(n: number, values: Record<string, string>): string {
  const v = (k: string) => (values[k] ?? "").trim() || CALENDAR_DEFAULTS[k] || "";
  const { year, month } = parseMonth(v("other1"));
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7; // Monday first
  const rows = Math.ceil((offset + days) / 7);

  const marks: { day: number | null; label: string; slot: string }[] = [];
  for (let i = 0; i < n; i++) {
    const raw = v(KEYS[i]);
    if (!raw) continue;
    const m = raw.match(/^\s*(\d{1,2})\s*(?:[,.:;\-–]\s*|\s+)(.*)$/);
    const day = m ? +m[1] : null;
    const label = m ? m[2].trim() : raw;
    marks.push({ day: day && day >= 1 && day <= days ? day : null, label: label || (day ? "" : raw), slot: SLOTS[i % SLOTS.length] });
  }
  const byDay = new Map<number, string>();
  for (const mk of marks) if (mk.day && !byDay.has(mk.day)) byDay.set(mk.day, mk.slot);

  const x0 = 70, cw = 122, ch = rows > 5 ? 76 : 86, y0 = 200, gridW = cw * 7;
  let b = "";
  b += `<rect data-ig-fill="accent" x="${x0 - 10}" y="60" width="${gridW + 20}" height="70" rx="16"/>`;
  b += `<text data-ig-contrast="accent" data-ig-font="primary" x="500" y="108" text-anchor="middle" font-size="34" font-weight="bold" fill="#ffffff">${esc(`${MONTHS[month]} ${year}`)}</text>`;
  ["M", "T", "W", "T", "F", "S", "S"].forEach((d, i) => {
    b += `<text data-ig-font="secondary" x="${x0 + cw * i + cw / 2}" y="${y0 - 20}" text-anchor="middle" font-size="24" font-weight="bold" fill="#6c757d">${d}</text>`;
  });
  for (let d = 1; d <= days; d++) {
    const cell = d - 1 + offset, c = cell % 7, r = Math.floor(cell / 7);
    const x = x0 + c * cw, y = y0 + r * ch;
    const slot = byDay.get(d);
    if (slot) {
      b += `<rect data-ig-fill="${slot}" x="${x + 6}" y="${y + 6}" width="${cw - 12}" height="${ch - 12}" rx="14"/>`;
      b += `<text data-ig-contrast="${slot}" data-ig-font="primary" x="${x + cw / 2}" y="${y + ch / 2 + 12}" text-anchor="middle" font-size="34" font-weight="bold" fill="${LIGHT.has(slot) ? "#212529" : "#ffffff"}">${d}</text>`;
    } else {
      b += `<rect x="${x + 6}" y="${y + 6}" width="${cw - 12}" height="${ch - 12}" rx="14" fill="#f1f3f5"/>`;
      b += `<text data-ig-font="secondary" x="${x + cw / 2}" y="${y + ch / 2 + 9}" text-anchor="middle" font-size="26" fill="#868e96">${d}</text>`;
    }
  }
  // Legend: two columns of "day badge + label" chips.
  const ly = y0 + rows * ch + 40, lw = (gridW - 16) / 2, lh = 60, lg = 16;
  marks.forEach((mk, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (lw + 16), y = ly + row * (lh + lg);
    b += `<rect data-ig-fill="${mk.slot}" x="${x}" y="${y}" width="${lw}" height="${lh}" rx="${lh / 2}"/>`;
    const textX = mk.day ? x + 86 : x + 24;
    if (mk.day) {
      b += `<circle cx="${x + 42}" cy="${y + lh / 2}" r="22" fill="#ffffff" fill-opacity="0.9"/>`;
      b += `<text data-ig-font="secondary" x="${x + 42}" y="${y + lh / 2 + 9}" text-anchor="middle" font-size="24" font-weight="bold" fill="#212529">${mk.day}</text>`;
    }
    b += `<text data-ig-contrast="${mk.slot}" data-ig-font="primary" x="${textX}" y="${y + lh / 2 + 10}" text-anchor="start" font-size="26" font-weight="bold" fill="${LIGHT.has(mk.slot) ? "#212529" : "#ffffff"}">${esc(mk.label)}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">\n${b}\n</svg>`;
}
