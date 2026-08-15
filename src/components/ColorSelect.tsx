"use client";

import { useEffect, useRef, useState } from "react";

// Swatch button opening a hex-first popover (the native color input's
// default pane is OS-controlled and can't be forced to hex).
export default function ColorSelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: string;
  onChange: (color: string) => void;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [synced, setSynced] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  if (value !== synced) {
    setSynced(value);
    setDraft(value);
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className="position-relative" ref={ref}>
      <button
        type="button"
        className="form-control form-control-color w-100"
        style={{ backgroundColor: value }}
        title={value}
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div
          className="dropdown-menu show p-2 shadow-sm"
          style={{ minWidth: 170, zIndex: 1050 }}
        >
          <input
            className="form-control form-control-sm font-monospace mb-2"
            value={draft}
            maxLength={7}
            spellCheck={false}
            autoFocus
            aria-label={`${ariaLabel} hex`}
            onChange={(e) => {
              const v = e.target.value;
              setDraft(v);
              const m = v.trim().match(/^#?([0-9a-fA-F]{6})$/);
              if (m) onChange(`#${m[1].toLowerCase()}`);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") setOpen(false);
            }}
          />
          <input
            type="color"
            className="form-control form-control-color w-100"
            value={value}
            aria-label={`${ariaLabel} visual picker`}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
