type Props = { found: number; total: number; streak: number };

// A server component with no state. The bar grows once when the page loads, and the gallery
// filters below live in their own client component, so changing a filter never replays it.
export default function ProgressBar({ found, total, streak }: Props) {
  return (
    <section className="progress rise d1" aria-label="Progress">
      <div className="pt">
        <div className="count">
          <strong>{found}</strong>
          <span>of {total} laws discovered</span>
        </div>
        <div className="streak">
          {streak > 0 && `${streak}-day streak · `}{total - found} still to find
        </div>
      </div>
      <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={found} aria-label="Laws discovered">
        <i style={{ width: `${(found / total) * 100}%` }} />
      </div>
    </section>
  );
}
