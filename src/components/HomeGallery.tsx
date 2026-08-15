"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SvgImage from "@/components/SvgImage";

type Tile = {
  id: string;
  title: string;
  category: string;
  description: string;
  itemCount: number;
  preview: string;
};

export default function HomeGallery({ tiles }: { tiles: Tile[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"name" | "category" | "count">("name");

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
    return [...tiles]
      .sort((a, b) =>
        sortBy === "category"
          ? a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
          : sortBy === "count"
            ? a.itemCount - b.itemCount || a.title.localeCompare(b.title)
            : a.title.localeCompare(b.title)
      )
      .filter((t) => {
      if (selected.size > 0 && !selected.has(t.category)) return false;
        if (!q) return true;
        return [t.title, t.category, t.description].some((s) =>
          s.toLowerCase().includes(q)
        );
      });
  }, [tiles, query, selected, sortBy]);

  const catsQuery =
    selected.size > 0 ? `?cats=${encodeURIComponent([...selected].join(","))}` : "";

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
        <span className="vr mx-1" />
        <div className="btn-group btn-group-sm" role="group" aria-label="Sort by">
          <button
            type="button"
            className={`btn ${sortBy === "name" ? "btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setSortBy("name")}
          >
            Name
          </button>
          <button
            type="button"
            className={`btn ${sortBy === "category" ? "btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => setSortBy("category")}
          >
            Category
          </button>
          <button
            type="button"
            className={`btn ${sortBy === "count" ? "btn-secondary" : "btn-outline-secondary"}`}
            title="Sort by number of items"
            onClick={() => setSortBy("count")}
          >
            #
          </button>
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-secondary">No layouts match.</p>
      ) : (
        <div className="row g-4">
          {filtered.map((t) => (
            <div key={t.id} className="col-sm-6 col-md-4 col-lg-3">
              <Link href={`/build/${t.id}${catsQuery}`} className="text-decoration-none">
                <div className="card ig-tile h-100">
                  <div className="ig-tile-preview border-bottom">
                    <SvgImage svg={t.preview} alt={t.title} />
                  </div>
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
