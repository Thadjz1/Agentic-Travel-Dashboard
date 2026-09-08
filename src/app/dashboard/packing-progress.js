export default function PackingProgress({ packed, total }) {
  if (!total) {
    return <span className="text-xs text-black/40">No packing items yet</span>;
  }

  const percent = Math.round((packed / total) * 100);

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-black/10">
        <div className="h-full bg-blue-600" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs text-black/60">
        {packed}/{total} packed
      </span>
    </div>
  );
}
