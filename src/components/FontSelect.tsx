"use client";

import { useEffect, useRef, useState } from "react";
import { GOOGLE_FONTS, SYSTEM_FONTS } from "@/lib/svg-engine";

// Custom dropdown so every font name renders in its own face (native
// <option> elements ignore per-option fonts in most browsers).
export default function FontSelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: string;
  onChange: (font: string) => void;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const groups: [string, string[]][] = [
    ["Classic", SYSTEM_FONTS],
    ["Google Fonts", GOOGLE_FONTS],
  ];

  return (
    <div className="position-relative" ref={ref}>
      <button
        type="button"
        className="form-select form-select-sm text-start"
        style={{ fontFamily: value }}
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {value}
      </button>
      {open && (
        <div
          className="dropdown-menu show w-100 overflow-auto shadow-sm"
          style={{ maxHeight: 280, zIndex: 1050 }}
        >
          {groups.map(([label, fonts]) => (
            <div key={label}>
              <h6 className="dropdown-header py-1">{label}</h6>
              {fonts.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`dropdown-item py-1 ${f === value ? "active" : ""}`}
                  style={{ fontFamily: f }}
                  onClick={() => {
                    onChange(f);
                    setOpen(false);
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
