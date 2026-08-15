"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UNIVERSAL_FIELDS,
  itemCount,
  type TemplateMeta,
} from "@/lib/templates";
import { BrandKit, Slot } from "@/lib/svg-engine";
import FontSelect from "@/components/FontSelect";

const SLOTS: Slot[] = ["primary", "secondary", "tertiary"];
const SLOT_LABEL: Record<Slot, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
};

type PrefsPatch = { brand?: BrandKit; values?: Record<string, string> };

function HexInput({
  value,
  onCommit,
  ariaLabel,
}: {
  value: string;
  onCommit: (v: string) => void;
  ariaLabel: string;
}) {
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  if (value !== synced) {
    // external change (swatch picker) — adopt it during render
    setSynced(value);
    setDraft(value);
  }
  return (
    <input
      className="form-control form-control-sm font-monospace"
      value={draft}
      maxLength={7}
      spellCheck={false}
      aria-label={ariaLabel}
      onChange={(e) => {
        const v = e.target.value;
        setDraft(v);
        const m = v.trim().match(/^#?([0-9a-fA-F]{6})$/);
        if (m) onCommit(`#${m[1].toLowerCase()}`);
      }}
      onBlur={() => setDraft(value)}
    />
  );
}

function useDebounced<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export default function Builder({
  templates,
  currentId,
  initialBrand,
  savedValues,
}: {
  templates: TemplateMeta[];
  currentId: string;
  initialBrand: BrandKit;
  savedValues: Record<string, string>;
}) {
  const router = useRouter();
  const [templateId, setTemplateId] = useState(currentId);
  const [brand, setBrand] = useState<BrandKit>(initialBrand);
  const [values, setValues] = useState<Record<string, string>>(savedValues);
  const [fieldsOpen, setFieldsOpen] = useState(true);
  const [railSort, setRailSort] = useState<"category" | "name" | "count">("category");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const template = templates.find((t) => t.id === templateId) ?? templates[0];

  // Non-empty values override the template's authored placeholder text.
  const effective = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(values).filter(([, v]) => v.trim() !== "")
      ),
    [values]
  );

  // Live preview: debounced server render (PNG only — SVG stays server-side).
  const renderInput = useMemo(
    () => JSON.stringify({ templateId: template.id, brand, values: effective }),
    [template.id, brand, effective]
  );
  const debouncedInput = useDebounced(renderInput, 400);
  const stale = renderInput !== debouncedInput;
  const renderSeq = useRef(0);
  useEffect(() => {
    const seq = ++renderSeq.current;
    fetch("/api/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: debouncedInput,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const blob = await res.blob();
        if (seq !== renderSeq.current) return;
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      })
      .catch(() => {});
  }, [debouncedInput]);

  // Rail thumbnails re-render only after brand settles.
  const debouncedBrand = useDebounced(brand, 800);
  const brandQuery = useMemo(() => {
    const b = debouncedBrand;
    const p = new URLSearchParams({
      pc: b.colors.primary.slice(1),
      sc: b.colors.secondary.slice(1),
      tc: b.colors.tertiary.slice(1),
      pf: b.fonts.primary,
      sf: b.fonts.secondary,
      tf: b.fonts.tertiary,
    });
    return p.toString();
  }, [debouncedBrand]);

  // Debounced auto-save of brand + changed field values.
  const pending = useRef<PrefsPatch>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flush = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const patch = pending.current;
    pending.current = {};
    if (!patch.brand && !patch.values) return;
    fetch("/api/prefs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
      keepalive: true,
    }).catch(() => {});
  }, []);
  const queueSave = useCallback(
    (patch: PrefsPatch) => {
      pending.current = {
        brand: patch.brand ?? pending.current.brand,
        values: { ...pending.current.values, ...patch.values },
      };
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(flush, 600);
    },
    [flush]
  );
  useEffect(() => flush, [flush]); // flush on unmount

  function setColor(slot: Slot, color: string) {
    setBrand((b) => {
      const next = { ...b, colors: { ...b.colors, [slot]: color } };
      queueSave({ brand: next });
      return next;
    });
  }

  function setFont(slot: Slot, font: string) {
    setBrand((b) => {
      const next = { ...b, fonts: { ...b.fonts, [slot]: font } };
      queueSave({ brand: next });
      return next;
    });
  }

  function setField(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    queueSave({ values: { [key]: value } });
  }

  function switchTemplate(id: string) {
    if (id === templateId) return;
    flush();
    setTemplateId(id);
    window.history.replaceState(null, "", `/build/${id}${window.location.search}`);
  }

  const railGroups = useMemo(() => {
    const sorted = [...templates].sort((a, b) =>
      railSort === "name"
        ? a.title.localeCompare(b.title)
        : railSort === "count"
          ? itemCount(a) - itemCount(b) || a.title.localeCompare(b.title)
          : a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
    );
    if (railSort !== "category") return [{ category: null as string | null, items: sorted }];
    const groups: { category: string | null; items: TemplateMeta[] }[] = [];
    for (const t of sorted) {
      const g = groups[groups.length - 1];
      if (g && g.category === t.category) g.items.push(t);
      else groups.push({ category: t.category, items: [t] });
    }
    return groups;
  }, [templates, railSort]);

  async function save() {
    setSaving(true);
    setError(null);
    flush();
    try {
      const res = await fetch("/api/graphics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          brand,
          values: effective,
        }),
      });
      if (res.status === 401) {
        router.push(`/login?next=${encodeURIComponent(`/build/${template.id}`)}`);
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed.");
      }
      const { id } = await res.json();
      router.push(`/download/${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
      setSaving(false);
    }
  }

  return (
    <>
      <div className="mb-3">
        <h1 className="h4 mb-0">{template.title}</h1>
        <span className="small text-secondary">{template.description}</span>
      </div>

      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="row g-2 align-items-end">
            {SLOTS.map((slot) => (
              <div className="col-6 col-md-2" key={`c-${slot}`}>
                <label className="form-label small fw-bold mb-1">
                  {SLOT_LABEL[slot]} Color
                </label>
                <div className="input-group input-group-sm">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    style={{ maxWidth: 44 }}
                    value={brand.colors[slot]}
                    onChange={(e) => setColor(slot, e.target.value)}
                    aria-label={`${SLOT_LABEL[slot]} color picker`}
                  />
                  <HexInput
                    value={brand.colors[slot]}
                    onCommit={(v) => setColor(slot, v)}
                    ariaLabel={`${SLOT_LABEL[slot]} color hex`}
                  />
                </div>
              </div>
            ))}
            {SLOTS.map((slot) => (
              <div className="col-6 col-md-2" key={`f-${slot}`}>
                <label className="form-label small fw-bold mb-1">
                  {SLOT_LABEL[slot]} Font
                </label>
                <FontSelect
                  value={brand.fonts[slot]}
                  onChange={(f) => setFont(slot, f)}
                  ariaLabel={`${SLOT_LABEL[slot]} font`}
                />
              </div>
            ))}
          </div>
          <div className="small text-secondary mt-1">
            Colors, fonts, and text are saved to your account and reused on
            other graphics.
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 align-items-stretch">
        {fieldsOpen ? (
          <div className="card flex-shrink-0 d-flex flex-column" style={{ width: 300 }}>
            <div className="card-header d-flex justify-content-between align-items-center py-2">
              <span className="fw-bold">Content</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary py-0"
                onClick={() => setFieldsOpen(false)}
                aria-label="Collapse content panel"
              >
                &laquo;
              </button>
            </div>
            <div className="card-body flex-grow-1 overflow-auto">
              {UNIVERSAL_FIELDS.filter((f) => template.usage[f.key]).map((f) => (
                <div className={`mb-3 ${f.indent ? "ms-4" : ""}`} key={f.key}>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <label className="form-label fw-bold small mb-1" htmlFor={`field-${f.key}`}>
                      {f.label}
                    </label>
                    <span className="text-secondary" style={{ fontSize: "0.72rem" }}>
                      {template.usage[f.key]}
                    </span>
                  </div>
                  <input
                    id={`field-${f.key}`}
                    className="form-control form-control-sm"
                    value={values[f.key] ?? ""}
                    placeholder={f.label}
                    maxLength={f.maxLength}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm flex-shrink-0 align-self-start"
            onClick={() => setFieldsOpen(true)}
            aria-label="Expand content panel"
          >
            &raquo;
          </button>
        )}

        <div className="flex-grow-1">
          <div
            className="ig-preview border rounded p-2"
            style={{ opacity: stale ? 0.7 : 1 }}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- blob URL
              <img
                src={previewUrl}
                alt={template.title}
                style={{ width: "100%", height: "auto", display: "block" }}
                draggable={false}
              />
            ) : (
              <div style={{ width: "100%", aspectRatio: "4 / 3" }} />
            )}
          </div>
          <div className="text-center mt-3">
            {error && <div className="small text-danger mb-2">{error}</div>}
            <button
              className="btn btn-ig-save btn-lg px-5"
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 d-flex flex-column" style={{ width: 120 }}>
          <div className="d-flex justify-content-center mb-2">
            <div className="btn-group btn-group-sm" role="group" aria-label="Sort thumbnails">
              <button
                type="button"
                className={`btn py-0 px-1 ${railSort === "category" ? "btn-secondary" : "btn-outline-secondary"}`}
                style={{ fontSize: "0.7rem" }}
                onClick={() => setRailSort("category")}
              >
                Cat
              </button>
              <button
                type="button"
                className={`btn py-0 px-1 ${railSort === "name" ? "btn-secondary" : "btn-outline-secondary"}`}
                style={{ fontSize: "0.7rem" }}
                onClick={() => setRailSort("name")}
              >
                A&ndash;Z
              </button>
              <button
                type="button"
                className={`btn py-0 px-1 ${railSort === "count" ? "btn-secondary" : "btn-outline-secondary"}`}
                style={{ fontSize: "0.7rem" }}
                title="Sort by number of items"
                onClick={() => setRailSort("count")}
              >
                #
              </button>
            </div>
          </div>
          <div className="overflow-auto flex-grow-1" style={{ height: 0, minHeight: 200 }}>
            {railGroups.map((g) => (
              <div key={g.category ?? "all"} className="mb-2">
                {g.category && (
                  <div className="small text-secondary fw-bold" style={{ fontSize: "0.7rem" }}>
                    {g.category}
                  </div>
                )}
                {g.items.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    title={t.title}
                    onClick={() => switchTemplate(t.id)}
                    className={`ig-thumb d-block w-100 p-0 mb-1 border rounded bg-white ${
                      t.id === template.id ? "border-primary border-2" : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- dynamic PNG endpoint */}
                    <img
                      src={`/api/preview/${t.id}?w=220&plain=1&${brandQuery}`}
                      alt={t.title}
                      style={{ width: "100%", height: "auto", display: "block" }}
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
