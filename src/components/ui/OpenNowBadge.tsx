'use client';

import { useEffect, useState } from 'react';

interface BusinessHours {
  weekdays?: string;
  saturday?: string;
}

function getOpenStatus(_hours?: BusinessHours): { open: boolean; label: string } {
  const now = new Date();
  const nairobiTime = new Intl.DateTimeFormat('en-KE', {
    timeZone: 'Africa/Nairobi',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    hour12: false,
  }).formatToParts(now);

  const weekday = nairobiTime.find((p) => p.type === 'weekday')?.value ?? '';
  const hour = parseInt(nairobiTime.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const minute = parseInt(nairobiTime.find((p) => p.type === 'minute')?.value ?? '0', 10);
  const totalMinutes = hour * 60 + minute;

  const isSaturday = weekday === 'Sat';
  const isSunday = weekday === 'Sun';

  if (isSunday) return { open: false, label: 'Closed — opens Mon 8am' };

  if (isSaturday) {
    const open = totalMinutes >= 480 && totalMinutes < 720;
    return open
      ? { open: true, label: 'Open now · closes 12pm' }
      : { open: false, label: 'Closed — opens Mon 8am' };
  }

  const open = totalMinutes >= 480 && totalMinutes < 1020;
  return open
    ? { open: true, label: 'Open now · closes 5pm' }
    : { open: false, label: totalMinutes < 480 ? 'Closed — opens 8am' : 'Closed — opens tomorrow 8am' };
}

export function OpenNowBadge({ hours }: { hours?: BusinessHours }) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    setStatus(getOpenStatus());
    const id = setInterval(() => { setStatus(getOpenStatus()); }, 60_000);
    return () => { clearInterval(id); };
  }, [hours]);

  if (!status) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
      <span
        className={`w-2 h-2 rounded-full flex-shrink-0 ${status.open ? 'bg-[#25D366]' : 'bg-white/30'}`}
      />
      <span className={status.open ? 'text-[#25D366]' : 'text-white/40'}>{status.label}</span>
    </span>
  );
}
