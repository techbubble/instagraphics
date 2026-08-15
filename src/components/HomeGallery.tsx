"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tile = {
  family: string;
  title: string;
  category: string;
  description: string;
  defaultId: string;
  rev: string;
  itemCount: number;
  variants: { id: string; items: number }[];
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
          className={`btn btn-sm rounded-pill ${selected.size === 0 ? "btn-primary" : "btn-outline-primary"}`}
          aria-pressed={selected.size === 0}
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
            <div key={t.family} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card ig-tile h-100">
                <Link href={`/publish/${t.defaultId}${catsQuery}`} aria-label={`Customize ${t.title}`}>
                  <div className="ig-tile-preview border-bottom">
                    {/* eslint-disable-next-line @next/next/no-img-element -- dynamic PNG endpoint */}
                    <img
                      src={`/api/preview/${t.defaultId}?w=400&plain=1&v=${t.rev}`}
                      alt={t.title}
                      loading="lazy"
                      style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain", display: "block" }}
                      draggable={false}
                    />
                  </div>
                </Link>
                <div className="card-body py-2 bg-light rounded-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold text-dark">{t.title}</span>
                    {t.variants.length > 1 && (
                      <span className="d-flex gap-1">
                        {t.variants.map((v) => (
                          <Link
                            key={v.id}
                            href={`/publish/${v.id}${catsQuery}`}
                            className="badge rounded-pill text-bg-primary text-decoration-none"
                            title={`${v.items}-item version`}
                          >
                            {v.items}
                          </Link>
                        ))}
                      </span>
                    )}
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
