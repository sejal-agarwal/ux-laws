"use client";

import { useState } from "react";

// Two pairs of headphones. "Aurora" is the better product on paper; "Bolt" is the one everyone bought.
const PRODUCTS = [
  { name: "Aurora", price: 79, specs: ["30 hr battery", "Noise cancelling", "Multipoint Bluetooth"], rating: "4.9", reviews: "14 ratings", crowd: null },
  { name: "Bolt", price: 89, specs: ["12 hr battery", "No noise cancelling", "Single device"], rating: "4.6", reviews: "12,480 ratings", crowd: "8,300 bought this month", best: true },
];

function Headphones() {
  return (
    <svg className="bw-img" viewBox="0 0 120 90" role="img" aria-label="Headphones">
      <path className="bw-band" d="M24 58 V50 a36 36 0 0 1 72 0 V58" />
      <rect className="bw-cup" x="14" y="52" width="22" height="30" rx="9" />
      <rect className="bw-cup" x="84" y="52" width="22" height="30" rx="9" />
    </svg>
  );
}

/** Two products where the plainer one has the crowd behind it. Toggle the crowd signals off to compare on specs alone. */
export default function BandwagonDemo() {
  const [showCrowd, setShowCrowd] = useState(true);
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="bw">
      <div className="tiers-grid bw-grid">
        {PRODUCTS.map((p) => (
          <div key={p.name} className={`tier${showCrowd && p.best ? " popular" : ""}`}>
            {showCrowd && p.best && <span className="tier-flag">Best seller</span>}
            <Headphones />
            <h3>{p.name}</h3>
            <p className="tier-price"><b>${p.price}</b></p>
            <ul>
              {p.specs.map((s) => <li key={s}>{s}</li>)}
            </ul>
            {showCrowd && (
              <p className="bw-crowd">
                ★ {p.rating} · {p.reviews}
                {p.crowd && <><br />{p.crowd}</>}
              </p>
            )}
            <button className="tier-btn" onClick={() => setPicked(picked === p.name ? null : p.name)} aria-pressed={picked === p.name}>
              {picked === p.name ? "Selected ✓" : `Choose ${p.name}`}
            </button>
          </div>
        ))}
      </div>
      <button className="bw-toggle" onClick={() => setShowCrowd(!showCrowd)} aria-pressed={!showCrowd}>
        {showCrowd ? "Hide what other people think" : "Show ratings and sales"}
      </button>
    </div>
  );
}
