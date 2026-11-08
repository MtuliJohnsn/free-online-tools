import { useMemo, useState } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Input } from '@/components/ui/FormControls';
import { Button } from '@/components/ui/Button';
import { dateToTimestamp, timestampToDate } from '@/lib/devtools';

export function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [unit, setUnit] = useState<'s' | 'ms'>('s');
  const [dateInput, setDateInput] = useState('');

  const tsResult = useMemo(() => {
    const ts = Number(timestamp);
    if (!timestamp || !Number.isFinite(ts)) return null;
    return timestampToDate(ts, unit);
  }, [timestamp, unit]);

  const dateResult = useMemo(() => {
    if (!dateInput) return null;
    return dateToTimestamp(dateInput, unit);
  }, [dateInput, unit]);

  const nowMs = Date.now();

  function useNow() {
    const ts = unit === 's' ? Math.floor(nowMs / 1000) : nowMs;
    setTimestamp(String(ts));
  }

  return (
    <div className="space-y-8">
      <div className="inline-flex rounded-lg border border-slate-300 p-1">
        <button
          type="button"
          aria-pressed={unit === 's'}
          onClick={() => setUnit('s')}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${unit === 's' ? 'bg-primary-600 text-white' : 'text-navy-800 hover:bg-slate-100'}`}
        >
          Seconds
        </button>
        <button
          type="button"
          aria-pressed={unit === 'ms'}
          onClick={() => setUnit('ms')}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${unit === 'ms' ? 'bg-primary-600 text-white' : 'text-navy-800 hover:bg-slate-100'}`}
        >
          Milliseconds
        </button>
      </div>

      <div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              id="ts-input"
              label="Unix timestamp"
              type="number"
              value={timestamp}
              onChange={(event) => setTimestamp(event.target.value)}
              placeholder={unit === 's' ? 'e.g. 1700000000' : 'e.g. 1700000000000'}
              className="font-mono text-sm"
            />
          </div>
          <Button variant="secondary" onClick={useNow}>Use now</Button>
        </div>
        {tsResult ? (
          <dl className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <dt className="text-xs font-medium text-slate-600">Local time</dt>
                <dd className="mt-0.5 font-medium text-navy-900">{tsResult.local}</dd>
              </div>
              <CopyButton text={tsResult.local} />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <dt className="text-xs font-medium text-slate-600">UTC</dt>
                <dd className="mt-0.5 font-medium text-navy-900">{tsResult.utc}</dd>
              </div>
              <CopyButton text={tsResult.utc} />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <dt className="text-xs font-medium text-slate-600">ISO 8601</dt>
                <dd className="mt-0.5 font-mono text-sm font-medium text-navy-900">{tsResult.iso}</dd>
              </div>
              <CopyButton text={tsResult.iso} />
            </div>
          </dl>
        ) : timestamp ? (
          <p role="alert" className="mt-4 rounded-lg bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
            Invalid timestamp.
          </p>
        ) : null}
      </div>

      <div className="border-t border-slate-200 pt-8">
        <Input
          id="date-input"
          label="Date to timestamp"
          type="datetime-local"
          value={dateInput}
          onChange={(event) => setDateInput(event.target.value)}
        />
        {dateResult !== null ? (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <code className="font-mono text-sm font-medium text-navy-900">{dateResult}</code>
            <CopyButton text={String(dateResult)} />
          </div>
        ) : dateInput ? (
          <p role="alert" className="mt-4 rounded-lg bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
            Invalid date.
          </p>
        ) : null}
      </div>
    </div>
  );
}
