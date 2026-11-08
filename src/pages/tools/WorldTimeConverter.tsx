import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/FormControls';
import {
  WORLD_TIME_ZONES,
  dayOrdinal,
  formatWallTimeInput,
  getLocalTimeZone,
  getWallTime,
  parseWallTimeInput,
  wallTimeToEpochMs,
} from '@/lib/timezone';

const DEFAULT_ZONES = ['UTC', 'Europe/London', 'Africa/Nairobi', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'];

function cityName(timeZone: string): string {
  return timeZone.split('/').pop()?.replace(/_/g, ' ') ?? timeZone;
}

function nowInZone(timeZone: string): string {
  return formatWallTimeInput(getWallTime(Date.now(), timeZone));
}

function formatDisplay(epochMs: number, timeZone: string): string {
  return new Date(epochMs).toLocaleString('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h12',
  });
}

export function WorldTimeConverter() {
  const [sourceZone, setSourceZone] = useState(getLocalTimeZone);
  const [sourceTime, setSourceTime] = useState(() => nowInZone(getLocalTimeZone()));
  const [zones, setZones] = useState<string[]>(DEFAULT_ZONES);
  const [zoneToAdd, setZoneToAdd] = useState('Asia/Shanghai');

  const parsed = parseWallTimeInput(sourceTime);
  const epochMs = useMemo(() => (parsed ? wallTimeToEpochMs(sourceZone, parsed) : null), [parsed, sourceZone]);
  const sourceDay = parsed ? dayOrdinal(parsed) : null;
  const sourceZoneOptions = [...new Set([getLocalTimeZone(), ...WORLD_TIME_ZONES])];

  function handleSetNow() {
    setSourceTime(nowInZone(sourceZone));
  }

  function handleAddZone() {
    if (!zones.includes(zoneToAdd)) setZones((current) => [...current, zoneToAdd]);
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="world-source-time"
          label="Date and time"
          type="datetime-local"
          value={sourceTime}
          onChange={(event) => setSourceTime(event.target.value)}
          error={sourceTime && !parsed ? 'Enter a valid date and time.' : undefined}
        />
        <Select id="world-source-zone" label="Time zone of that time" value={sourceZone} onChange={(event) => setSourceZone(event.target.value)}>
          {sourceZoneOptions.map((zone) => (
            <option key={zone} value={zone}>
              {cityName(zone)} ({zone})
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={handleSetNow}>
          Use current time
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setSourceZone(getLocalTimeZone());
            setSourceTime(nowInZone(getLocalTimeZone()));
            setZones(DEFAULT_ZONES);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
        <Select id="world-add-zone" label="Add a time zone" value={zoneToAdd} onChange={(event) => setZoneToAdd(event.target.value)}>
          {WORLD_TIME_ZONES.map((zone) => (
            <option key={zone} value={zone} disabled={zones.includes(zone)}>
              {cityName(zone)} ({zone})
            </option>
          ))}
        </Select>
        <Button onClick={handleAddZone} disabled={zones.includes(zoneToAdd)}>
          Add time zone
        </Button>
      </div>

      <div aria-live="polite">
        {epochMs !== null && sourceDay !== null ? (
          <ul className="grid gap-4 sm:grid-cols-2 animate-fade-in-up">
            {zones.map((zone) => {
              const wall = getWallTime(epochMs, zone);
              const dayDifference = dayOrdinal(wall) - sourceDay;
              const dayNote = dayDifference === 0 ? 'Same day' : dayDifference > 0 ? `+${dayDifference} day` : `${dayDifference} day`;
              return (
                <li key={zone} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-lg font-bold text-navy-900">{cityName(zone)}</p>
                      <p className="truncate text-sm text-slate-600">{zone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setZones((current) => current.filter((item) => item !== zone))}
                      className="shrink-0 rounded-md px-2 py-1 text-sm font-semibold text-error-700 transition-colors hover:bg-error-50"
                      aria-label={`Remove ${cityName(zone)}`}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="font-mono text-3xl font-bold tabular-nums text-primary-700">
                    {new Date(epochMs).toLocaleTimeString('en-US', { timeZone: zone, hour: 'numeric', minute: '2-digit', hourCycle: 'h12' })}
                  </p>
                  <p className="text-sm text-slate-600">
                    {formatDisplay(epochMs, zone)} &middot; {dayNote}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Enter a valid date and time to see the conversions.
          </p>
        )}
      </div>
    </div>
  );
}
