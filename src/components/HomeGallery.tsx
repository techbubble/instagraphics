"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tile = {
  saves: number;
  family: string;
  title: string;
  category: string;
  description: string;
  keywords: string;
  defaultId: string;
  rev: string;
  itemCount: number;
  variants: { id: string; items: number }[];
};

export default function HomeGallery({ tiles }: { tiles: Tile[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(tiles.map((t) => t.category))].sort(),
    [tiles]
  );

  function toggle(cat: string) {
    setSelected((prev) => (prev === cat ? null : cat));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...tiles]
      .sort((a, b) => b.saves - a.saves || a.title.localeCompare(b.title))
      .filter((t) => {
        if (selected && t.category !== selected) return false;
        if (!q) return true;
        return [t.title, t.category, t.description, t.keywords].some((s) =>
          s.toLowerCase().includes(q)
        );
      });
  }, [tiles, query, selected]);

  const catsQuery = selected ? `?cats=${encodeURIComponent(selected)}` : "";

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
          className={`btn btn-sm rounded-pill ${selected === null ? "btn-primary" : "btn-outline-primary"}`}
          aria-pressed={selected === null}
          onClick={() => setSelected(null)}
        >
          All
        </button>
        {categories.map((cat) => {
          const active = selected === cat;
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
                    {t.variants.length > 1 ? (
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
                    ) : (
                      <Link
                        href={`/about/${t.defaultId}`}
                        className="text-primary"
                        title={`About ${t.title}`}
                        aria-label={`About ${t.title}`}
                      >
                        {/* Bootstrap Icons "info-circle-fill" */}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          style={{ verticalAlign: "-0.125em" }}
                          aria-hidden="true"
                        >
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 2 0" />
                        </svg>
                      </Link>
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
