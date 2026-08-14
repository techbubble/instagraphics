"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Template } from "@/lib/templates";
import { defaultValues } from "@/lib/templates";
import {
  BrandKit,
  DEFAULT_BRAND,
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

export default function Builder({ template }: { template: Template }) {
  const router = useRouter();
  const [brand, setBrand] = useState<BrandKit>(DEFAULT_BRAND);
  const [values, setValues] = useState<Record<string, string>>(() =>
    defaultValues(template)
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const rendered = useMemo(
    () => renderTemplate(template.svg, brand, values),
    [template.svg, brand, values]
  );

  function setColor(slot: Slot, color: string) {
    setBrand((b) => ({ ...b, colors: { ...b.colors, [slot]: color } }));
  }

  function setFont(slot: Slot, font: string) {
    setBrand((b) => ({ ...b, fonts: { ...b.fonts, [slot]: font } }));
  }

  function onLogoChange(file: File | null) {
    if (!file) {
      setBrand((b) => ({ ...b, logo: null }));
      return;
    }
    if (file.size > 512 * 1024) {
      setError("Logo must be under 512 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setBrand((b) => ({ ...b, logo: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/graphics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          title: values.title || template.title,
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
      <h1 className="h3 mb-1">{template.title}</h1>
      <p className="text-secondary">{template.description}</p>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            {SLOTS.map((slot) => (
              <div className="col-6 col-md-2" key={`c-${slot}`}>
                <label className="form-label small mb-1">{SLOT_LABEL[slot]} Color</label>
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
                <label className="form-label small mb-1">{SLOT_LABEL[slot]} Font</label>
                <select
                  className="form-select"
                  value={brand.fonts[slot]}
                  onChange={(e) => setFont(slot, e.target.value)}
                  aria-label={`${SLOT_LABEL[slot]} font`}
                >
                  {FONT_CHOICES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="row g-3 mt-1 align-items-end">
            <div className="col-md-4">
              <label className="form-label small mb-1">Logo (PNG/JPG/SVG, optional)</label>
              <input
                ref={logoInputRef}
                type="file"
                className="form-control"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={(e) => onLogoChange(e.target.files?.[0] ?? null)}
              />
            </div>
            {brand.logo && (
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    if (logoInputRef.current) logoInputRef.current.value = "";
                    onLogoChange(null);
                  }}
                >
                  Remove logo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          {template.fields.map((f) => (
            <div className="mb-3" key={f.key}>
              <label className="form-label" htmlFor={`field-${f.key}`}>
                {f.label}
              </label>
              <input
                id={`field-${f.key}`}
                className="form-control"
                value={values[f.key] ?? ""}
                maxLength={f.maxLength}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: e.target.value }))
                }
              />
            </div>
          ))}
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={save}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="col-lg-8">
          <div
            className="ig-preview border rounded p-2 bg-white"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        </div>
      </div>
    </>
  );
}
