"use client";

import Link from "next/link";
import { useState } from "react";
import type { GalleryItem } from "@/content/laws";
import type { Category } from "@/content/laws/types";
import { CATEGORIES, categoryStyle } from "@/lib/categories";
import LawArt from "./LawArt";

type Status = "all" | "found" | "todo";

const STATUSES: { key: Status; label: string }[] = [
  { key: "all", label: "All" },
  { key: "found", label: "Discovered" },
  { key: "todo", label: "Still to find" },
];

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [status, setStatus] = useState<Status>("all");
  const [category, setCategory] = useState<Category | null>(null);

  const visible = items.filter((l) => {
    const found = l.day !== null;
    if (status === "found" && !found) return false;
    if (status === "todo" && found) return false;
    return category === null || l.category === category;
  });

  return (
    <div className="stack">
      <div className="filters rise d2">
        <div className="group" role="group" aria-label="Status">
          {STATUSES.map(({ key, label }) => (
            <button key={key} className="f" aria-pressed={status === key} onClick={() => setStatus(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="group" role="group" aria-label="Category">
          {CATEGORIES.map((c) => (
            <button key={c} className="f" aria-pressed={category === c} onClick={() => setCategory(category === c ? null : c)}>
              <span className="sq" style={categoryStyle(c)} />
              {c}
            </button>
          ))}
        </div>
      </div>

      {visible.length ? (
        <div className="grid rise d3">
          {visible.map((l) =>
            l.day === null ? (
              <div key={l.slug} className="lcard todo" style={categoryStyle(l.category)} aria-disabled="true">
                <div className="art"><LawArt slug={l.slug} /></div>
                <div className="cap"><h3>{l.name}</h3><span>Not yet</span></div>
              </div>
            ) : (
              <Link key={l.slug} href={`/laws/${l.slug}`} className="lcard" style={categoryStyle(l.category)}>
                <div className="art"><LawArt slug={l.slug} /></div>
                <div className="cap"><h3>{l.name}</h3><span>Day {l.day}</span></div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div className="empty">
          {status === "found" && category === null
            ? "No laws discovered yet. Your first one will show up here."
            : "Nothing here yet. Try another filter."}
        </div>
      )}
    </div>
  );
}
