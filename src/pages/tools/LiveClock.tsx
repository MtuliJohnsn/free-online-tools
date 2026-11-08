import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Stat } from '@/components/ui/Stat';
import { getLocalTimeZone } from '@/lib/timezone';

type HourFormat = '24' | '12';

function formatUtcOffset(date: Date): string {
  const totalMinutes = -date.getTimezoneOffset();
  const sign = totalMinutes >= 0 ? '+' : '-';
  const absolute = Math.abs(totalMinutes);
  const hours = String(Math.floor(absolute / 60)).padStart(2, '0');
  const minutes = String(absolute % 60).padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
}

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const difference = date.getTime() - start.getTime() + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60_000;
  return Math.floor(difference / 86_400_000);
}

export function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  const [hourFormat, setHourFormat] = useState<HourFormat>('24');
  const timeZone = getLocalTimeZone();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timeText = now.toLocaleTimeString('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: hourFormat === '12',
  });
  const dateText = now.toLocaleDateString('en-US', { timeZone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const zoneAbbreviation = now.toLocaleTimeString('en-US', { timeZone, timeZoneName: 'short' }).split(' ').pop() ?? timeZone;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-navy-900 px-6 py-10 text-center text-white sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-100">
          Your local time &middot; {timeZone} ({zoneAbbreviation})
        </p>
        <p
          className="mt-4 font-mono text-5xl font-bold tabular-nums sm:text-7xl"
          role="timer"
          aria-live="off"
          aria-label={`Current time ${timeText}`}
        >
          {timeText}
        </p>
        <p className="mt-4 text-lg text-primary-50">{dateText}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div role="radiogroup" aria-label="Hour format" className="inline-flex rounded-lg border border-slate-300 bg-white p-1">
          {(['24', '12'] as const).map((format) => (
            <button
              key={format}
              type="button"
              role="radio"
              aria-checked={hourFormat === format}
              onClick={() => setHourFormat(format)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                hourFormat === format ? 'bg-primary-600 text-white' : 'text-navy-700 hover:bg-slate-100'
              }`}
            >
              {format === '24' ? '24-hour' : '12-hour'}
            </button>
          ))}
        </div>
        <CopyButton text={`${dateText} ${timeText} (${timeZone})`} label="Copy date and time" />
        <Button variant="secondary" onClick={() => setHourFormat('24')} disabled={hourFormat === '24'}>
          Reset
        </Button>
      </div>

      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Time zone" value={timeZone} />
        <Stat label="UTC offset" value={formatUtcOffset(now)} />
        <Stat label="Unix timestamp" value={Math.floor(now.getTime() / 1000).toLocaleString('en-US', { useGrouping: false })} />
        <Stat label="Day of the year" value={dayOfYear(now)} />
      </dl>
    </div>
  );
}
