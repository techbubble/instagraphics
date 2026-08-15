"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UNIVERSAL_FIELDS,
  itemCount,
  type TemplateMeta,
} from "@/lib/templates";
import { BrandKit, ColorSlot, FontSlot } from "@/lib/svg-engine";
import FontSelect from "@/components/FontSelect";
import ColorSelect from "@/components/ColorSelect";

const FONT_SLOTS: FontSlot[] = ["primary", "secondary"];
const COLOR_SLOTS: ColorSlot[] = ["primary", "secondary", "tertiary", "accent"];
const SLOT_LABEL: Record<ColorSlot, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  accent: "Accent",
};

type PrefsPatch = { brand?: BrandKit; values?: Record<string, string> };

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
  const [side, setSide] = useState<number | null>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // The square graphic area dictates the row height; side panels scroll.
  useEffect(() => {
    const el = centerRef.current;
    if (!el) return;
    const measure = () =>
      setSide(Math.min(el.clientWidth, window.innerHeight - 200));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [fieldsOpen]);

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
    () =>
      JSON.stringify({ templateId: template.id, brand, values: effective }),
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

  function setColor(slot: ColorSlot, color: string) {
    setBrand((b) => {
      const next = { ...b, colors: { ...b.colors, [slot]: color } };
      queueSave({ brand: next });
      return next;
    });
  }

  function setFont(slot: FontSlot, font: string) {
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

      <div
        className="d-flex gap-3 align-items-stretch ig-fullbleed"
        style={side ? { height: side } : undefined}
      >
        {fieldsOpen ? (
          <div className="card flex-shrink-0 d-flex flex-column h-100" style={{ width: 300 }}>
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
                <div className="mb-3" key={f.key}>
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

              <div className="fw-bold small mb-2">Colors</div>
              <div className="row g-2 mb-3">
                {COLOR_SLOTS.map((slot) => (
                  <div className="col-3" key={`c-${slot}`}>
                    <label className="form-label mb-1" style={{ fontSize: "0.8rem" }}>
                      {SLOT_LABEL[slot]}
                    </label>
                    <ColorSelect
                      value={brand.colors[slot]}
                      onChange={(c) => setColor(slot, c)}
                      ariaLabel={`${SLOT_LABEL[slot]} color`}
                    />
                  </div>
                ))}
              </div>
              <div className="fw-bold small mb-2">Fonts</div>
              {FONT_SLOTS.map((slot) => (
                <div className="mb-2" key={`f-${slot}`}>
                  <label className="form-label small mb-1">{SLOT_LABEL[slot]}</label>
                  <FontSelect
                    value={brand.fonts[slot]}
                    onChange={(f) => setFont(slot, f)}
                    ariaLabel={`${SLOT_LABEL[slot]} font`}
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

        <div ref={centerRef} className="flex-grow-1 d-flex justify-content-center">
          <div
            className="ig-preview border rounded position-relative overflow-hidden"
            style={{
              width: side ?? "100%",
              height: side ?? "auto",
              opacity: stale ? 0.7 : 1,
            }}
          >
            {previewUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- blob URL
              <img
                src={previewUrl}
                alt={template.title}
                style={{ width: "100%", height: "100%", display: "block" }}
                draggable={false}
              />
            )}
            <div className="position-absolute bottom-0 end-0 m-3 text-end">
              {error && (
                <div className="small text-danger bg-white rounded px-2 py-1 mb-2">
                  {error}
                </div>
              )}
              <button
                className="btn btn-ig-save btn-lg px-5 shadow"
                onClick={save}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 d-flex flex-column h-100" style={{ width: 120 }}>
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
                      src={`/api/preview/${t.id}?w=220&plain=1&v=${t.rev}`}
                      alt={t.title}
                      style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain", display: "block" }}
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
