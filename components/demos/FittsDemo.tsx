"use client";

import { useRef, useState, type MouseEvent } from "react";
import { useMode, type Mode } from "../ExampleSection";

const ROUNDS = 6;
type Best = Partial<Record<Mode, number>>;
const ms = (v?: number) => (v === undefined ? "–" : `${Math.round(v)} ms`);

export default function FittsDemo() {
  const mode = useMode();
  const [best, setBest] = useState<Best>({});

  const finish = (avg: number) =>
    setBest((b) => ({ ...b, [mode]: Math.min(avg, b[mode] ?? Infinity) }));

  // Keyed by mode so switching versions starts a fresh run, while `best` is kept for both.
  return (
    <>
      <Run key={mode} mode={mode} onFinish={finish} />
      <div className="result">
        <span>Small (16px) best avg: <b>{ms(best.before)}</b></span>
        <span>Large (64px) best avg: <b>{ms(best.after)}</b></span>
      </div>
    </>
  );
}

function Run({ mode, onFinish }: { mode: Mode; onFinish: (avg: number) => void }) {
  const size = mode === "before" ? 16 : 64;
  const arena = useRef<HTMLDivElement>(null);
  const times = useRef<number[]>([]);
  const misses = useRef(0);
  const shownAt = useRef(0);
  const side = useRef(0);
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle");
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [summary, setSummary] = useState<{ avg: number; misses: number } | null>(null);

  function spawn() {
    const el = arena.current;
    if (!el) return;
    const pad = size / 2 + 8;
    const x = side.current ? el.clientWidth - pad - 10 : pad + 10;
    const y = pad + Math.random() * (el.clientHeight - 2 * pad);
    side.current ^= 1;
    setTarget({ x, y });
    shownAt.current = performance.now();
  }

  function start() {
    times.current = [];
    misses.current = 0;
    side.current = 0;
    setCount(0);
    setSummary(null);
    setPhase("run");
    spawn();
  }

  function hit(e: MouseEvent) {
    e.stopPropagation();
    times.current.push(performance.now() - shownAt.current);
    const n = count + 1;
    setCount(n);
    if (n < ROUNDS) return spawn();
    // The first target has no travel distance, so it is left out of the average.
    const rest = times.current.slice(1);
    const avg = rest.reduce((a, b) => a + b, 0) / rest.length;
    setTarget(null);
    setPhase("done");
    setSummary({ avg, misses: misses.current });
    onFinish(avg);
  }

  return (
    <>
      <div className="task">
        <p>{phase === "run" ? `Target ${count + 1} of ${ROUNDS}` : phase === "done" ? "Done." : "Click each target as fast as you can."}</p>
        <button className="btn" onClick={start}>{phase === "idle" ? "Start" : phase === "done" ? "Go again" : "Restart"}</button>
      </div>
      <div className="arena" ref={arena} onClick={() => { if (phase === "run") misses.current++; }}>
        {phase !== "run" && (
          <div className="say">
            {summary
              ? `Average ${Math.round(summary.avg)} ms, ${summary.misses} ${summary.misses === 1 ? "miss" : "misses"}`
              : `${ROUNDS} targets will appear, alternating left and right.`}
          </div>
        )}
        {target && (
          <button
            className="target"
            aria-label="Target"
            style={{ left: target.x, top: target.y, width: size, height: size }}
            onClick={hit}
          />
        )}
      </div>
    </>
  );
}
