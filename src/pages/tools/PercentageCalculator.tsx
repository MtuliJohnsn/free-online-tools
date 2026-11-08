import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { calculatePercentChange, calculatePercentOf, calculateWhatPercent } from '@/lib/calculators';
import { formatNumber } from '@/lib/format';

type PercentMode = 'percentOf' | 'whatPercent' | 'change';

const MODES: { id: PercentMode; label: string; firstLabel: string; secondLabel: string }[] = [
  { id: 'percentOf', label: 'X% of Y', firstLabel: 'Percentage (%)', secondLabel: 'Number' },
  { id: 'whatPercent', label: 'X is what % of Y', firstLabel: 'Part (X)', secondLabel: 'Whole (Y)' },
  { id: 'change', label: '% change from X to Y', firstLabel: 'Starting value (X)', secondLabel: 'New value (Y)' },
];

function parseValue(value: string): number | null {
  if (value.trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function PercentageCalculator() {
  const [mode, setMode] = useState<PercentMode>('percentOf');
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');

  const currentMode = MODES.find((item) => item.id === mode) ?? MODES[0];
  const a = parseValue(first);
  const b = parseValue(second);

  const result = useMemo(() => {
    if (a === null || b === null) return { value: null, error: undefined };
    if (mode === 'percentOf') return { value: calculatePercentOf(a, b), error: undefined };
    if (mode === 'whatPercent') {
      const value = calculateWhatPercent(a, b);
      return value === null ? { value: null, error: 'The whole (Y) cannot be zero.' } : { value, error: undefined };
    }
    const value = calculatePercentChange(a, b);
    return value === null ? { value: null, error: 'The starting value (X) cannot be zero.' } : { value, error: undefined };
  }, [a, b, mode]);

  const firstError = first && a === null ? 'Enter a valid number.' : undefined;
  const secondError = second && b === null ? 'Enter a valid number.' : undefined;

  function explain(): string {
    if (a === null || b === null || result.value === null) return '';
    if (mode === 'percentOf') return `${formatNumber(a)}% of ${formatNumber(b)} is`;
    if (mode === 'whatPercent') return `${formatNumber(a)} is`;
    return result.value >= 0 ? 'Increase of' : 'Decrease of';
  }

  function handleReset() {
    setFirst('');
    setSecond('');
  }

  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Calculation type" className="grid gap-2 rounded-xl bg-slate-100 p-1.5 sm:grid-cols-3">
        {MODES.map((item) => {
          const selected = item.id === mode;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setMode(item.id)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                selected ? 'bg-white text-primary-700 shadow-sm' : 'text-navy-700 hover:text-navy-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="percent-first" label={currentMode.firstLabel} type="text" inputMode="decimal" value={first} onChange={(event) => setFirst(event.target.value)} error={firstError} />
        <Input id="percent-second" label={currentMode.secondLabel} type="text" inputMode="decimal" value={second} onChange={(event) => setSecond(event.target.value)} error={secondError} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={handleReset} disabled={!first && !second}>
          Reset
        </Button>
      </div>

      <div aria-live="polite">
        {result.error ? (
          <p role="alert" className="rounded-lg bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
            {result.error}
          </p>
        ) : result.value !== null ? (
          <div className="rounded-2xl bg-primary-600 p-6 text-white sm:p-8 animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-100">Result</p>
            <p className="mt-2 break-words text-4xl font-bold sm:text-5xl">
              {mode === 'change' ? `${result.value >= 0 ? '+' : ''}${formatNumber(result.value, 4)}%` : formatNumber(result.value, 4)}
              {mode === 'whatPercent' ? '%' : ''}
            </p>
            <p className="mt-3 text-primary-50">
              {mode === 'percentOf' && `${explain()} ${formatNumber(result.value, 4)}`}
              {mode === 'whatPercent' && `${explain()} ${formatNumber(result.value, 4)}% of ${formatNumber(b ?? 0)}`}
              {mode === 'change' && `${explain()} ${formatNumber(Math.abs(result.value), 4)}% from ${formatNumber(a ?? 0)} to ${formatNumber(b ?? 0)}`}
            </p>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Fill in both numbers to see the result.
          </p>
        )}
      </div>
    </div>
  );
}
