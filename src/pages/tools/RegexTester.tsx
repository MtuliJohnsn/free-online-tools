import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormControls';
import { testRegex } from '@/lib/devtools';

const FLAGS = ['g', 'i', 'm', 's', 'u'];

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');

  const result = useMemo(() => testRegex(pattern, flags, text), [pattern, flags, text]);

  function toggleFlag(flag: string) {
    setFlags((current) => (current.includes(flag) ? current.replace(flag, '') : current + flag));
  }

  return (
    <div className="space-y-8">
      <Input
        id="regex-pattern"
        label="Regular expression"
        value={pattern}
        onChange={(event) => setPattern(event.target.value)}
        placeholder="Enter a regex pattern, e.g. \d+"
        className="font-mono text-sm"
        error={result.ok ? undefined : result.error}
      />

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-navy-900">Flags</legend>
        <div className="flex flex-wrap gap-2">
          {FLAGS.map((flag) => (
            <button
              key={flag}
              type="button"
              aria-pressed={flags.includes(flag)}
              onClick={() => toggleFlag(flag)}
              className={`rounded-lg border px-3 py-1.5 font-mono text-sm font-semibold transition-colors ${flags.includes(flag) ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 bg-white text-navy-800 hover:border-primary-300'}`}
            >
              {flag}
            </button>
          ))}
        </div>
      </fieldset>

      <Textarea
        id="regex-text"
        label="Test text"
        rows={8}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter the text to test your pattern against."
        className="font-mono text-sm"
      />

      <div>
        <h2 className="mb-3 text-lg font-bold text-navy-900">Matches</h2>
        {result.ok ? (
          result.matches.length > 0 ? (
            <ul className="space-y-2">
              {result.matches.map((match, i) => (
                <li key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <code className="font-mono text-sm font-medium text-navy-900 break-all">{match.match || '(empty match)'}</code>
                    <span className="shrink-0 text-xs text-slate-600">at index {match.index}</span>
                  </div>
                  {match.groups.length > 0 ? (
                    <div className="mt-2 text-xs text-slate-600">
                      Groups: {match.groups.map((g, gi) => (
                        <span key={gi} className="mr-2 font-mono">${gi + 1}: "{g}"</span>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
              No matches found.
            </p>
          )
        ) : null}
      </div>

      <Button variant="secondary" onClick={() => { setPattern(''); setFlags('g'); setText(''); }}>
        Clear all
      </Button>
    </div>
  );
}
