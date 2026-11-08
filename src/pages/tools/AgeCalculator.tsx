import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';
import { Stat } from '@/components/ui/Stat';
import { calculateAge, parseIsoDate, toLocalIsoDate } from '@/lib/calculators';

function formatCount(value: number, unit: string): string {
  return `${value.toLocaleString('en-US')} ${unit}${value === 1 ? '' : 's'}`;
}

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [asOfDate, setAsOfDate] = useState(() => toLocalIsoDate());

  const parsedBirth = parseIsoDate(birthDate);
  const parsedAsOf = parseIsoDate(asOfDate);
  const result = useMemo(
    () => (parsedBirth && parsedAsOf ? calculateAge(parsedBirth, parsedAsOf) : null),
    [parsedBirth, parsedAsOf],
  );

  let error: string | undefined;
  if (birthDate && !parsedBirth) error = 'Enter a valid birth date from 1900 onwards.';
  else if (asOfDate && !parsedAsOf) error = 'Enter a valid date to compare against.';
  else if (parsedBirth && parsedAsOf && !result) error = 'The birth date must be before the comparison date.';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="age-birth" label="Date of birth" type="date" min="1900-01-01" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} error={error} />
        <Input id="age-as-of" label="Calculate age on" type="date" min="1900-01-01" value={asOfDate} onChange={(event) => setAsOfDate(event.target.value)} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            setBirthDate('');
            setAsOfDate(toLocalIsoDate());
          }}
        >
          Reset
        </Button>
      </div>

      <div aria-live="polite">
        {result ? (
          <div className="space-y-6 animate-fade-in-up">
            <div className="rounded-2xl bg-primary-600 p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-100">Your age</p>
              <p className="mt-2 text-3xl font-bold sm:text-4xl">
                {formatCount(result.years, 'year')}, {formatCount(result.months, 'month')}, {formatCount(result.days, 'day')}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              <Stat label="Total months" value={(result.years * 12 + result.months).toLocaleString('en-US')} />
              <Stat label="Total weeks" value={result.totalWeeks.toLocaleString('en-US')} />
              <Stat label="Total days" value={result.totalDays.toLocaleString('en-US')} />
              <Stat label="Total hours" value={result.totalHours.toLocaleString('en-US')} />
              <Stat label="Day born" value={result.birthWeekday} />
              <Stat
                label="Next birthday"
                value={result.nextBirthdayInDays === 0 ? 'Today!' : `${formatCount(result.nextBirthdayInDays, 'day')}`}
              />
            </dl>
            {result.nextBirthdayInDays > 0 ? (
              <p className="text-sm text-slate-600">
                Your next birthday is in {formatCount(result.nextBirthdayInDays, 'day')}, when you will turn {result.nextBirthdayAge}.
              </p>
            ) : null}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Enter a date of birth to see the exact age.
          </p>
        )}
      </div>
    </div>
  );
}
