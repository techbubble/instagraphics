"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tile = {
  id: string;
  title: string;
  category: string;
  description: string;
  preview: string;
};

export default function HomeGallery({ tiles }: { tiles: Tile[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => [...new Set(tiles.map((t) => t.category))].sort(),
    [tiles]
  );

  function toggle(cat: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tiles.filter((t) => {
      if (selected.size > 0 && !selected.has(t.category)) return false;
      if (!q) return true;
      return [t.title, t.category, t.description].some((s) =>
        s.toLowerCase().includes(q)
      );
    });
  }, [tiles, query, selected]);

  const allActive = selected.size === 0;

  return (
    <>
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Search layouts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search layouts"
          />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        <button
          type="button"
          className={`btn btn-sm rounded-pill ${allActive ? "btn-primary" : "btn-outline-primary"}`}
          aria-pressed={allActive}
          onClick={() => setSelected(new Set())}
        >
          All
        </button>
        {categories.map((cat) => {
          const active = selected.has(cat);
          return (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm rounded-pill ${active ? "btn-primary" : "btn-outline-primary"}`}
              aria-pressed={active}
              onClick={() => toggle(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-secondary">No layouts match.</p>
      ) : (
        <div className="row g-4">
          {filtered.map((t) => (
            <div key={t.id} className="col-sm-6 col-md-4 col-lg-3">
              <Link href={`/build/${t.id}`} className="text-decoration-none">
                <div className="card ig-tile h-100">
                  <div
                    className="ig-tile-preview border-bottom"
                    dangerouslySetInnerHTML={{ __html: t.preview }}
                  />
                  <div className="card-body py-2">
                    <div className="fw-semibold text-dark">{t.title}</div>
                    <div className="small text-secondary">{t.description}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
