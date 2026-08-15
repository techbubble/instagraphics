"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UNIVERSAL_FIELDS,
  familyDefault,
  familyTitle,
  itemCount,
  type TemplateMeta,
} from "@/lib/templates";
import { BrandKit, ColorSlot, DEFAULT_BRAND, FontSlot } from "@/lib/svg-engine";
import FontSelect from "@/components/FontSelect";
import ColorSelect from "@/components/ColorSelect";

const FONT_SLOTS: FontSlot[] = ["primary", "secondary"];
const COLOR_SLOTS: ColorSlot[] = ["primary", "secondary", "tertiary", "quaternary", "accent"];
const COLOR_LABEL: Record<ColorSlot, string> = {
  primary: "Color 1",
  secondary: "Color 2",
  tertiary: "Color 3",
  quaternary: "Color 4",
  accent: "Accent",
};
const FONT_LABEL: Record<FontSlot, string> = {
  primary: "Primary",
  secondary: "Secondary",
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
  authed,
}: {
  templates: TemplateMeta[];
  currentId: string;
  initialBrand: BrandKit;
  savedValues: Record<string, string>;
  authed: boolean;
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
  const variants = useMemo(
    () =>
      templates
        .filter((t) => t.family === template.family)
        .sort((a, b) => a.items - b.items),
    [templates, template.family]
  );


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
      if (!authed) return;
      pending.current = {
        brand: patch.brand ?? pending.current.brand,
        values: { ...pending.current.values, ...patch.values },
      };
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(flush, 600);
    },
    [flush, authed]
  );
  useEffect(() => flush, [flush]); // flush on unmount

  // Anonymous work lives in localStorage; it becomes account data on sign-in.
  useEffect(() => {
    if (authed) return;
    window.localStorage.setItem("ig-local", JSON.stringify({ brand, values }));
  }, [authed, brand, values]);

  useEffect(() => {
    const raw = window.localStorage.getItem("ig-local");
    if (!raw) return;
    let local: { brand?: BrandKit; values?: Record<string, string> } | null = null;
    try {
      local = JSON.parse(raw);
    } catch {
      return;
    }
    const t = setTimeout(() => {
      if (local?.brand) setBrand(local.brand);
      if (local?.values) setValues((v) => ({ ...v, ...local.values }));
      if (authed) {
        queueSave({ brand: local?.brand, values: local?.values });
        window.localStorage.removeItem("ig-local");
      }
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    window.history.replaceState(null, "", `/publish/${id}${window.location.search}`);
  }

  const railGroups = useMemo(() => {
    const byFamily = new Map<string, TemplateMeta[]>();
    for (const t of templates) {
      const list = byFamily.get(t.family) ?? [];
      list.push(t);
      byFamily.set(t.family, list);
    }
    const defaults = [...byFamily.values()].map((v) => familyDefault(v));
    const sorted = defaults.sort((a, b) =>
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
    if (!authed) {
      router.push(`/login?next=${encodeURIComponent(`/publish/${template.id}`)}`);
      return;
    }
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
        router.push(`/login?next=${encodeURIComponent(`/publish/${template.id}`)}`);
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
      <div
        className="d-flex gap-3 align-items-stretch ig-fullbleed"
        style={side ? { height: side + 64 } : undefined}
      >
        {fieldsOpen ? (
          <div className="flex-shrink-0 d-flex flex-column h-100" style={{ width: 300 }}>
            <div
              className="mb-2 px-2 rounded-2 border border-primary bg-primary-subtle text-primary-emphasis fw-bold small d-flex align-items-center gap-2"
              style={{ height: 56 }}
            >
              {/* Bootstrap Icons "arrow-repeat" */}
              <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0" aria-hidden="true">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
              </svg>
              Content, Color and Font inputs are preserved as you switch graphics.
            </div>
            <div className="card d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
            <div className="card-header d-flex justify-content-between align-items-center py-2">
              <span className="fw-bold">Content</span>
              {variants.length > 1 && (
                <div className="btn-group btn-group-sm" role="group" aria-label="Item count">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      className={`btn py-0 px-2 ${v.id === template.id ? "btn-primary" : "btn-outline-primary"}`}
                      title={`${v.items}-item version`}
                      onClick={() => switchTemplate(v.id)}
                    >
                      {v.items}
                    </button>
                  ))}
                </div>
              )}
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
                      {template.labels[f.key] ?? f.label}
                    </label>
                    <span className="text-secondary" style={{ fontSize: "0.72rem" }}>
                      {template.usage[f.key]}
                    </span>
                  </div>
                  <input
                    id={`field-${f.key}`}
                    className="form-control form-control-sm"
                    value={values[f.key] ?? ""}
                    maxLength={f.maxLength}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                </div>
              ))}

              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <span className="fw-bold small">Colors</span>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => {
                    setBrand((b) => {
                      const next = { ...b, colors: { ...DEFAULT_BRAND.colors } };
                      queueSave({ brand: next });
                      return next;
                    });
                  }}
                >
                  Reset
                </button>
              </div>
              <div className="row g-2 mb-3">
                {COLOR_SLOTS.map((slot) => (
                  <div className="col" key={`c-${slot}`}>
                    <label className="form-label mb-1 text-nowrap" style={{ fontSize: "0.72rem" }}>
                      {COLOR_LABEL[slot]}
                    </label>
                    <ColorSelect
                      value={brand.colors[slot]}
                      onChange={(c) => setColor(slot, c)}
                      ariaLabel={`${COLOR_LABEL[slot]} color`}
                    />
                  </div>
                ))}
              </div>
              <div className="fw-bold small mb-2">Fonts</div>
              {FONT_SLOTS.map((slot) => (
                <div className="mb-2" key={`f-${slot}`}>
                  <label className="form-label small mb-1">{FONT_LABEL[slot]}</label>
                  <FontSelect
                    value={brand.fonts[slot]}
                    onChange={(f) => setFont(slot, f)}
                    ariaLabel={`${FONT_LABEL[slot]} font`}
                  />
                </div>
              ))}
            </div>
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

        <div ref={centerRef} className="flex-grow-1 d-flex flex-column align-items-center">
          <div className="text-center mb-2" style={{ height: 56 }}>
            <h1 className="h4 mb-0">{familyTitle(template)}</h1>
            <span className="small text-secondary">{template.description}</span>
          </div>
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
                disabled={saving || Object.keys(effective).length === 0}
              >
                {!authed ? "Sign In" : saving ? "Saving..." : "Save"}
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
                      t.family === template.family ? "border-primary border-2" : ""
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
