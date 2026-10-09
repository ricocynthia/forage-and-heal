const KINDS = [
  ['All', 'All'],
  ['Plant', 'Plants'],
  ['Mushroom', 'Mushrooms'],
];

export default function KindFilter({ kind, onChange, total }) {
  return (
    <div className="kind-filter" role="group" aria-label="Show">
      {KINDS.map(([value, label]) => (
        <button key={value} type="button" className="smallcaps" aria-pressed={kind === value} onClick={() => onChange(value)}>
          {value === 'All' ? `All ${total}` : label}
        </button>
      ))}
    </div>
  );
}
