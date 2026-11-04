export default function Sketch({ idea }: { idea?: string }) {
  return (
    <div className="sketch">
      <div>
        <span className="label">Example to build</span>
        <b>{idea ?? "Add a Demo component to this law's entry file."}</b>
      </div>
    </div>
  );
}
