import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { estimatePasswordStrength, generatePassword, hasCharacterSet, type PasswordOptions } from '@/lib/random';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
};

const STRENGTH_STYLES = {
  Weak: { bar: 'bg-error-500', text: 'text-error-700' },
  Fair: { bar: 'bg-warning-500', text: 'text-warning-700' },
  Strong: { bar: 'bg-success-600', text: 'text-success-700' },
  'Very strong': { bar: 'bg-success-700', text: 'text-success-700' },
} as const;

const CHECKBOXES: { key: 'uppercase' | 'lowercase' | 'numbers' | 'symbols' | 'excludeAmbiguous'; label: string }[] = [
  { key: 'uppercase', label: 'Uppercase letters (A-Z)' },
  { key: 'lowercase', label: 'Lowercase letters (a-z)' },
  { key: 'numbers', label: 'Numbers (0-9)' },
  { key: 'symbols', label: 'Symbols (!@#$%)' },
  { key: 'excludeAmbiguous', label: 'Exclude look-alike characters (I, l, 1, O, 0)' },
];

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [seed, setSeed] = useState(0);

  const hasSet = hasCharacterSet(options);
  const password = useMemo(() => (hasSet ? generatePassword(options) : ''), [options, seed, hasSet]);
  const strength = useMemo(() => estimatePasswordStrength(options), [options]);
  const styles = STRENGTH_STYLES[strength.label];
  const meterWidth = `${Math.min(100, (strength.bits / 128) * 100).toFixed(0)}%`;

  function update<K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) {
    setOptions((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <p className="mb-3 text-sm font-semibold text-slate-600">Your password</p>
        <p
          className="min-h-[3rem] break-all font-mono text-xl font-semibold text-navy-900 sm:text-2xl"
          aria-live="polite"
          data-testid="generated-password"
        >
          {hasSet ? password : 'Select at least one character type'}
        </p>

        <div className="mt-5" aria-live="polite">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-navy-900">Strength</span>
            <span className={`font-bold ${styles.text}`}>{hasSet ? strength.label : '-'}</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200" role="presentation">
            <div className={`h-full rounded-full transition-all duration-500 ${styles.bar}`} style={{ width: hasSet ? meterWidth : '0%' }} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="password-length" className="text-sm font-semibold text-navy-900">
            Length: <span className="font-mono text-primary-700">{options.length}</span>
          </label>
        </div>
        <input
          id="password-length"
          type="range"
          min={8}
          max={64}
          value={options.length}
          onChange={(event) => update('length', Number(event.target.value))}
          className="w-full cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-slate-600">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-semibold text-navy-900">Include</legend>
        {CHECKBOXES.map((checkbox) => (
          <label key={checkbox.key} className="flex cursor-pointer items-center gap-3 text-sm text-navy-900">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              checked={options[checkbox.key]}
              onChange={(event) => update(checkbox.key, event.target.checked)}
            />
            {checkbox.label}
          </label>
        ))}
      </fieldset>

      {!hasSet ? (
        <p role="alert" className="rounded-lg bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
          Choose at least one character type to generate a password.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setSeed((value) => value + 1)} disabled={!hasSet}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Generate new password
        </Button>
        <CopyButton text={hasSet ? password : ''} label="Copy password" />
        <Button
          variant="secondary"
          onClick={() => {
            setOptions(DEFAULT_OPTIONS);
            setSeed(0);
          }}
        >
          Reset
        </Button>
      </div>

      <p className="text-sm text-slate-600">
        Passwords are created in your browser using secure random values and are never sent or stored anywhere.
      </p>
    </div>
  );
}
