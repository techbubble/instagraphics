"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tile = {
  id: string;
  title: string;
  category: string;
  description: string;
  itemCount: number;
  rev: string;
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
              <div className="card ig-tile h-100">
                <Link href={`/publish/${t.id}${catsQuery}`} aria-label={`Customize ${t.title}`}>
                  <div className="ig-tile-preview border-bottom">
                    {/* eslint-disable-next-line @next/next/no-img-element -- dynamic PNG endpoint */}
                    <img
                      src={`/api/preview/${t.id}?w=400&plain=1&v=${t.rev}`}
                      alt={t.title}
                      loading="lazy"
                      style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain", display: "block" }}
                      draggable={false}
                    />
                  </div>
                </Link>
                <div className="card-body py-2">
                  <div className="fw-semibold text-dark">
                    {t.title}{" "}
                    <Link
                      href={`/about/${t.id}`}
                      className="text-secondary align-text-top"
                      title={`About ${t.title}`}
                      aria-label={`About ${t.title}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                    </Link>
                  </div>
                  <div className="small text-secondary">{t.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
