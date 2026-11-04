import type { Metadata } from "next";
import Link from "next/link";
import CalendarMonth from "@/components/CalendarMonth";
import { DISCOVERED, NEWEST_DATE, currentStreak, longestStreak } from "@/content/laws";

export const metadata: Metadata = { title: "Calendar" };

export default function CalendarPage() {
  if (!DISCOVERED.length || !NEWEST_DATE) {
    return (
      <div className="empty">
        Your calendar fills in as you learn. <Link href="/">Pick a law from the gallery</Link> to get started.
      </div>
    );
  }

  const entries = DISCOVERED.map(({ slug, name, category, entry }) => ({ slug, name, category, date: entry.date }));
  return <CalendarMonth entries={entries} latest={NEWEST_DATE} streak={currentStreak()} longest={longestStreak()} />;
}
