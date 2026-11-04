"use client";

import { useState, type MouseEvent } from "react";
import { useMode, type Mode } from "../ExampleSection";

const GROUPS: Record<string, string[]> = {
  Money: ["Invoices", "Payouts", "Taxes", "Refunds"],
  People: ["Team", "Clients", "Roles", "Invites"],
  Settings: ["Profile", "Security", "Alerts", "Billing"],
  Help: ["Docs", "Contact", "Status", "Shortcuts"],
};
const FLAT = [
  "Roles", "Refunds", "Alerts", "Docs", "Invoices", "Clients", "Status", "Taxes",
  "Profile", "Invites", "Payouts", "Shortcuts", "Security", "Team", "Contact", "Billing",
];
const TARGET = "Invoices";

type Best = Partial<Record<Mode, number>>;
const seconds = (ms?: number) => (ms === undefined ? "–" : `${(ms / 1000).toFixed(1)}s`);

export default function HickDemo() {
  const mode = useMode();
  const [best, setBest] = useState<Best>({});

  const finish = (ms: number) =>
    setBest((b) => ({ ...b, [mode]: Math.min(ms, b[mode] ?? Infinity) }));

  // Keyed by mode so switching versions starts a fresh run, while `best` is kept for both.
  return (
    <>
      <Run key={mode} mode={mode} onFinish={finish} />
      <div className="result">
        <span>Counter-example best: <b>{seconds(best.before)}</b></span>
        <span>Applied best: <b>{seconds(best.after)}</b></span>
      </div>
    </>
  );
}

function Run({ mode, onFinish }: { mode: Mode; onFinish: (ms: number) => void }) {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [clicks, setClicks] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [last, setLast] = useState<{ ms: number; clicks: number } | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const live = startedAt !== null;

  // Click events carry a high-resolution timestamp on the same clock as performance.now().
  function start(e: MouseEvent) {
    setStartedAt(e.timeStamp);
    setClicks(0);
    setOpen(null);
    setLast(null);
  }

  function pick(label: string, at: number) {
    if (startedAt === null) return;
    const n = clicks + 1;
    setClicks(n);
    if (label === TARGET) {
      const ms = at - startedAt;
      setStartedAt(null);
      setOpen(null);
      setLast({ ms, clicks: n });
      onFinish(ms);
    } else {
      setWrong(label);
      setTimeout(() => setWrong(null), 300);
    }
  }

  const opt = (label: string, big = false) => (
    <button key={label} className={`opt${big ? " big" : ""}${wrong === label ? " shake" : ""}`} disabled={!live} onClick={(e) => pick(label, e.timeStamp)}>
      {label}
    </button>
  );

  return (
    <>
      <div className="task">
        <p>Task: find <strong>{TARGET}</strong></p>
        <button className={`btn${live ? " ghost" : ""}`} onClick={start}>
          {live ? "Restart" : last ? "Try again" : "Start timer"}
        </button>
      </div>

      <div className="chips2">
        {mode === "before" && FLAT.map((l) => opt(l))}
        {mode === "after" && open === null &&
          Object.keys(GROUPS).map((g) => (
            <button key={g} className="opt big" disabled={!live} onClick={() => { setClicks((c) => c + 1); setOpen(g); }}>
              {g}
            </button>
          ))}
        {mode === "after" && open !== null && (
          <>
            <button className="opt" onClick={() => { setClicks((c) => c + 1); setOpen(null); }}>‹ Back</button>
            {GROUPS[open].map((l) => opt(l, true))}
          </>
        )}
      </div>

      {last && (
        <div className="result">
          <span>Found in <b>{seconds(last.ms)}</b></span>
          <span><b>{last.clicks}</b> {last.clicks === 1 ? "click" : "clicks"}</span>
        </div>
      )}
    </>
  );
}
