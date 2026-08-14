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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tiles;
    return tiles.filter((t) =>
      [t.title, t.category, t.description].some((s) => s.toLowerCase().includes(q))
    );
  }, [tiles, query]);

  const categories = useMemo(
    () => [...new Set(filtered.map((t) => t.category))],
    [filtered]
  );

  return (
    <>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="search"
            className="form-control form-control-lg"
            placeholder="Search layouts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search layouts"
          />
        </div>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-secondary">No layouts match your search.</p>
      )}
      {categories.map((cat) => (
        <section key={cat} className="mb-5">
          <h2 className="h5 border-bottom pb-2 mb-3">{cat}</h2>
          <div className="row g-4">
            {filtered
              .filter((t) => t.category === cat)
              .map((t) => (
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
        </section>
      ))}
    </>
  );
}
