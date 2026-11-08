import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/FormControls';
import { computeDiff } from '@/lib/devtools';

export function TextDiffChecker() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const diff = useMemo(() => computeDiff(textA, textB), [textA, textB]);
  const added = diff.filter((d) => d.type === 'added').length;
  const removed = diff.filter((d) => d.type === 'removed').length;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Textarea
          id="diff-text-a"
          label="Original text"
          rows={10}
          value={textA}
          onChange={(event) => setTextA(event.target.value)}
          placeholder="Paste the original text here."
          className="font-mono text-sm"
        />
        <Textarea
          id="diff-text-b"
          label="Changed text"
          rows={10}
          value={textB}
          onChange={(event) => setTextB(event.target.value)}
          placeholder="Paste the changed text here."
          className="font-mono text-sm"
        />
      </div>

      {(textA || textB) ? (
        <div className="flex gap-4 text-sm font-semibold">
          <span className="text-success-700">+{added} added</span>
          <span className="text-error-700">-{removed} removed</span>
        </div>
      ) : null}

      <div>
        <h2 className="mb-3 text-lg font-bold text-navy-900">Comparison</h2>
        {(textA || textB) ? (
          <div className="max-h-96 overflow-auto rounded-xl border border-slate-200 font-mono text-sm">
            <table className="w-full">
              <tbody>
                {diff.map((line, i) => (
                  <tr
                    key={i}
                    className={
                      line.type === 'added'
                        ? 'bg-success-50'
                        : line.type === 'removed'
                        ? 'bg-error-50'
                        : ''
                    }
                  >
                    <td className="w-12 select-none border-r border-slate-200 px-2 py-0.5 text-right text-xs text-slate-500">
                      {line.oldNum ?? ''}
                    </td>
                    <td className="w-12 select-none border-r border-slate-200 px-2 py-0.5 text-right text-xs text-slate-500">
                      {line.newNum ?? ''}
                    </td>
                    <td className="whitespace-pre-wrap break-all px-3 py-0.5 text-navy-900">
                      <span className="select-none mr-1 font-bold">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                      </span>
                      {line.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Enter text in both fields to see the differences.
          </p>
        )}
      </div>

      <Button variant="secondary" onClick={() => { setTextA(''); setTextB(''); }} disabled={!textA && !textB}>
        Clear
      </Button>
    </div>
  );
}
