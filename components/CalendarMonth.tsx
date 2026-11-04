"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/content/laws/types";
import { CATEGORIES, categoryStyle, shortName } from "@/lib/categories";
import { daysInMonth, mondayOffset, monthLabel, parseIso, toIso } from "@/lib/dates";

type CalendarEntry = { date: string; slug: string; name: string; category: Category };

type Props = {
  entries: CalendarEntry[];
  /** The newest entry's date. Days after it are shown faded. */
  latest: string;
  streak: number;
  longest: number;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarMonth({ entries, latest, streak, longest }: Props) {
  const first = parseIso(entries[0].date);
  const last = parseIso(latest);
  const minIndex = first.y * 12 + first.m0;
  const maxIndex = last.y * 12 + last.m0;
  const [index, setIndex] = useState(maxIndex);

  const y = Math.floor(index / 12);
  const m0 = index % 12;
  const byDate = new Map(entries.map((e) => [e.date, e]));
  const inMonth = entries.filter((e) => {
    const p = parseIso(e.date);
    return p.y === y && p.m0 === m0;
  }).length;
  const lead = mondayOffset(y, m0);
  const days = daysInMonth(y, m0);
  const trail = (7 - ((lead + days) % 7)) % 7;

  return (
    <div className="stack">
      <div className="calhead rise d1">
        <h1>{monthLabel(y, m0)}</h1>
        <div className="arrows">
          <button aria-label="Previous month" disabled={index <= minIndex} onClick={() => setIndex(index - 1)}>←</button>
          <button aria-label="Next month" disabled={index >= maxIndex} onClick={() => setIndex(index + 1)}>→</button>
        </div>
      </div>

      <div className="sums rise d2">
        <div><strong>{inMonth}</strong><span className="label">laws this month</span></div>
        <div><strong>{streak}</strong><span className="label">day streak</span></div>
        <div><strong>{longest}</strong><span className="label">longest run</span></div>
      </div>

      <div className="cal rise d3">
        {WEEKDAYS.map((d) => <div key={d} className="dow label">{d}</div>)}
        {Array.from({ length: lead }, (_, i) => <div key={`l${i}`} className="cell blank" />)}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const iso = toIso(y, m0, day);
          const entry = byDate.get(iso);
          if (entry) {
            return (
              <Link key={iso} href={`/laws/${entry.slug}`} className={`cell w${iso === latest ? " now" : ""}`} style={categoryStyle(entry.category)} title={entry.name}>
                <span className="n">{day}</span>
                <span className="nm">{shortName(entry.name)}</span>
              </Link>
            );
          }
          return (
            <div key={iso} className={`cell${iso > latest || iso < entries[0].date ? " future" : ""}`}>
              <span className="n">{day}</span>
            </div>
          );
        })}
        {Array.from({ length: trail }, (_, i) => <div key={`t${i}`} className="cell blank" />)}
      </div>

      <div className="legend rise d4">
        {CATEGORIES.map((c) => (
          <span key={c} className="cat"><i className="sq" style={categoryStyle(c)} />{c}</span>
        ))}
      </div>
    </div>
  );
}
