interface AvailabilityData {
  tableEggs?: number | null;
  manure?: number | null;
  exLayerHens?: number | null;
  lastUpdated?: string | null;
  note?: string | null;
}

export function AvailabilityStrip({ availability }: { availability?: AvailabilityData | null }) {
  if (!availability) return null;

  const { tableEggs, manure, exLayerHens, note, lastUpdated } = availability;

  const pills = [
    { label: 'Egg Trays', value: tableEggs, unit: 'left' },
    { label: 'Manure Sacks', value: manure, unit: 'left' },
    { label: 'Ex-Layer Hens', value: exLayerHens, unit: 'available' },
  ].filter((p) => p.value !== null && p.value !== undefined);

  if (pills.length === 0 && !note) return null;

  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleString('en-KE', {
        timeZone: 'Africa/Nairobi',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="w-full bg-brand-gold/[0.07] border-y border-brand-gold/15 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-gold/80 flex-shrink-0">
            In Stock
          </span>
          {pills.map((pill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border"
              style={{
                background: 'rgba(236,204,116,0.1)',
                color: 'var(--brand-gold)',
                borderColor: 'rgba(236,204,116,0.25)',
              }}
            >
              <span className="font-black">{pill.value}</span>
              <span className="font-medium opacity-80">
                {pill.label} {pill.unit}
              </span>
            </span>
          ))}
          {note && (
            <span className="text-xs text-white/50 italic">{note}</span>
          )}
        </div>
        {formattedTime && (
          <span className="text-[10px] text-white/30 flex-shrink-0">Updated {formattedTime}</span>
        )}
      </div>
    </div>
  );
}
