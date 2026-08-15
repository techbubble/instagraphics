"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Template } from "@/lib/templates";
import {
  BrandKit,
  FONT_CHOICES,
  Slot,
  renderTemplate,
} from "@/lib/svg-engine";

const SLOTS: Slot[] = ["primary", "secondary", "tertiary"];
const SLOT_LABEL: Record<Slot, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
};

type PrefsPatch = { brand?: BrandKit; values?: Record<string, string> };

export default function Builder({
  templates,
  currentId,
  initialBrand,
  savedValues,
}: {
  templates: Template[];
  currentId: string;
  initialBrand: BrandKit;
  savedValues: Record<string, string>;
}) {
  const router = useRouter();
  const [templateId, setTemplateId] = useState(currentId);
  const [brand, setBrand] = useState<BrandKit>(initialBrand);
  const [values, setValues] = useState<Record<string, string>>(savedValues);
  const [fieldsOpen, setFieldsOpen] = useState(true);
  const [railSort, setRailSort] = useState<"category" | "name">("category");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const template = templates.find((t) => t.id === templateId) ?? templates[0];

  // Effective value for a field: user's saved/typed value, else default.
  const effective = useMemo(() => {
    const out: Record<string, string> = {};
    for (const f of template.fields) out[f.key] = values[f.key] ?? f.default;
    return out;
  }, [template, values]);

  const rendered = useMemo(
    () => renderTemplate(template.svg, brand, effective),
    [template.svg, brand, effective]
  );

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
        : a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
    );
    if (railSort === "name") return [{ category: null as string | null, items: sorted }];
    const groups: { category: string | null; items: Template[] }[] = [];
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
          title: effective.title || template.title,
          svg: rendered,
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h4 mb-0">{template.title}</h1>
          <span className="small text-secondary">{template.description}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          {error && <span className="small text-danger">{error}</span>}
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body py-2">
          <div className="row g-2 align-items-end">
            {SLOTS.map((slot) => (
              <div className="col-6 col-md-2" key={`c-${slot}`}>
                <label className="form-label small fw-bold mb-1">
                  {SLOT_LABEL[slot]} Color
                </label>
                <input
                  type="color"
                  className="form-control form-control-color w-100"
                  value={brand.colors[slot]}
                  onChange={(e) => setColor(slot, e.target.value)}
                  aria-label={`${SLOT_LABEL[slot]} color`}
                />
              </div>
            ))}
            {SLOTS.map((slot) => (
              <div className="col-6 col-md-2" key={`f-${slot}`}>
                <label className="form-label small fw-bold mb-1">
                  {SLOT_LABEL[slot]} Font
                </label>
                <select
                  className="form-select form-select-sm"
                  value={brand.fonts[slot]}
                  onChange={(e) => setFont(slot, e.target.value)}
                  aria-label={`${SLOT_LABEL[slot]} font`}
                  style={{ fontFamily: brand.fonts[slot] }}
                >
                  {FONT_CHOICES.map((f) => (
                    <option key={f} value={f} style={{ fontFamily: f }}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="small text-secondary mt-1">
            Colors, fonts, and text are saved to your account and reused on
            other graphics.
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 align-items-start">
        {fieldsOpen ? (
          <div className="card flex-shrink-0" style={{ width: 300 }}>
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
            <div className="card-body">
              {template.fields.map((f) => (
                <div
                  className={`mb-3 ${f.indent ? "ms-3" : ""}`}
                  key={f.key}
                >
                  <div className="d-flex justify-content-between align-items-baseline">
                    <label className="form-label fw-bold small mb-1" htmlFor={`field-${f.key}`}>
                      {f.label}
                    </label>
                    {f.usage && (
                      <span className="text-secondary" style={{ fontSize: "0.72rem" }}>
                        {f.usage}
                      </span>
                    )}
                  </div>
                  <input
                    id={`field-${f.key}`}
                    className="form-control form-control-sm"
                    value={values[f.key] ?? f.default}
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
            className="btn btn-outline-secondary btn-sm flex-shrink-0"
            onClick={() => setFieldsOpen(true)}
            aria-label="Expand content panel"
          >
            &raquo;
          </button>
        )}

        <div
          className="ig-preview border rounded p-2 bg-white flex-grow-1"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />

        <div className="flex-shrink-0" style={{ width: 120 }}>
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
            </div>
          </div>
          <div className="overflow-auto" style={{ maxHeight: "70vh" }}>
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
                    <div
                      className="ig-tile-preview"
                      dangerouslySetInnerHTML={{
                        __html: renderTemplate(
                          t.svg,
                          brand,
                          Object.fromEntries(
                            t.fields.map((f) => [f.key, values[f.key] ?? f.default])
                          )
                        ),
                      }}
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
