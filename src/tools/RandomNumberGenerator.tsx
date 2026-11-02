import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Input } from '@/components/ui/FormControls';
import { Stat } from '@/components/ui/Stat';
import { MAX_RANDOM_BOUND, MAX_RANDOM_COUNT, generateRandomNumbers } from '@/lib/random';
import { formatNumber } from '@/lib/format';

interface RandomSettings {
  min: string;
  max: string;
  count: string;
  unique: boolean;
}

const DEFAULT_SETTINGS: RandomSettings = { min: '1', max: '100', count: '1', unique: false };

function parseWhole(value: string): number | null {
  if (value.trim() === '') return null;
  const number = Number(value);
  return Number.isInteger(number) ? number : null;
}

function validate(settings: RandomSettings): { error?: string; params?: { min: number; max: number; count: number } } {
  const min = parseWhole(settings.min);
  const max = parseWhole(settings.max);
  const count = parseWhole(settings.count);

  if (min === null || max === null) return { error: 'Enter whole numbers for the minimum and maximum.' };
  if (Math.abs(min) > MAX_RANDOM_BOUND || Math.abs(max) > MAX_RANDOM_BOUND) {
    return { error: `Keep both limits between -${formatNumber(MAX_RANDOM_BOUND, 0)} and ${formatNumber(MAX_RANDOM_BOUND, 0)}.` };
  }
  if (min > max) return { error: 'The minimum must be less than or equal to the maximum.' };
  if (count === null || count < 1 || count > MAX_RANDOM_COUNT) {
    return { error: `Choose how many numbers to generate, from 1 to ${MAX_RANDOM_COUNT}.` };
  }
  if (settings.unique && count > max - min + 1) {
    return { error: `Unique numbers need a range with at least ${count} values. Widen the range or lower the count.` };
  }
  return { params: { min, max, count } };
}

export function RandomNumberGenerator() {
  const [settings, setSettings] = useState<RandomSettings>(DEFAULT_SETTINGS);
  const [results, setResults] = useState<number[] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validation = useMemo(() => validate(settings), [settings]);
  const error = submitted ? validation.error : undefined;

  function update<K extends keyof RandomSettings>(key: K, value: RandomSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function handleGenerate() {
    setSubmitted(true);
    const { params } = validate(settings);
    if (!params) {
      setResults(null);
      return;
    }
    setResults(generateRandomNumbers(params.min, params.max, params.count, settings.unique));
  }

  function handleReset() {
    setSettings(DEFAULT_SETTINGS);
    setResults(null);
    setSubmitted(false);
  }

  const resultText = results ? results.join(', ') : '';

  return (
    <form
      className="space-y-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        handleGenerate();
      }}
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <Input id="rng-min" label="Minimum" type="number" inputMode="numeric" value={settings.min} onChange={(event) => update('min', event.target.value)} />
        <Input id="rng-max" label="Maximum" type="number" inputMode="numeric" value={settings.max} onChange={(event) => update('max', event.target.value)} />
        <Input id="rng-count" label="How many numbers" type="number" inputMode="numeric" min={1} max={MAX_RANDOM_COUNT} value={settings.count} onChange={(event) => update('count', event.target.value)} />
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-navy-900">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          checked={settings.unique}
          onChange={(event) => update('unique', event.target.checked)}
        />
        Only unique numbers (no repeats)
      </label>

      {error ? (
        <p role="alert" className="rounded-lg bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit">Generate numbers</Button>
        <CopyButton text={resultText} label="Copy results" />
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div aria-live="polite">
        {results ? (
          <div className="space-y-4 animate-fade-in-up">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Stat label="Count" value={results.length} />
              <Stat label="Smallest" value={Math.min(...results)} />
              <Stat label="Largest" value={Math.max(...results)} />
            </dl>
            <ul className="flex flex-wrap gap-2" aria-label="Generated numbers">
              {results.map((value, index) => (
                <li key={`${value}-${index}`} className="rounded-lg border border-primary-200 bg-primary-50 px-3.5 py-2 font-mono text-lg font-semibold text-primary-800">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Choose a range and press Generate numbers.
          </p>
        )}
      </div>
    </form>
  );
}
