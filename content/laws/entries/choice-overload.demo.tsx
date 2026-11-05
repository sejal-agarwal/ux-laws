"use client";

import { useState } from "react";

// Three subscription tiers shown side by side.
const PLANS = [
  { name: "Starter", price: 5, blurb: "For trying things out", features: ["3 projects", "5 GB storage", "Email support", "1 collaborator"] },
  { name: "Plus", price: 12, blurb: "For regular use", features: ["25 projects", "100 GB storage", "Priority support", "5 collaborators"], popular: true },
  { name: "Pro", price: 24, blurb: "For teams", features: ["Unlimited projects", "1 TB storage", "24/7 support", "Unlimited collaborators"] },
];

type Plan = (typeof PLANS)[number];

function PlanCard({ plan, action }: { plan: Plan; action: React.ReactNode }) {
  return (
    <div className={`tier${plan.popular ? " popular" : ""}`}>
      {plan.popular && <span className="tier-flag">Most popular</span>}
      <h3>{plan.name}</h3>
      <p className="tier-blurb">{plan.blurb}</p>
      <p className="tier-price"><b>${plan.price}</b> / month</p>
      <ul>
        {plan.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      {action}
    </div>
  );
}

/** All plans side by side, with the same rows lined up so differences are visible at a glance. */
export default function SideBySide() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="tiers-grid">
      {PLANS.map((plan) => (
        <PlanCard
          key={plan.name}
          plan={plan}
          action={
            <button className="tier-btn" onClick={() => setPicked(picked === plan.name ? null : plan.name)} aria-pressed={picked === plan.name}>
              {picked === plan.name ? "Selected ✓" : `Choose ${plan.name}`}
            </button>
          }
        />
      ))}
    </div>
  );
}
