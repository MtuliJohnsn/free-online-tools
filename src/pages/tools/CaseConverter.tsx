import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Textarea } from '@/components/ui/FormControls';
import { CASE_CONVERTERS } from '@/lib/text';

export function CaseConverter() {
  const [text, setText] = useState('');

  return (
    <div className="space-y-8">
      <Textarea
        id="case-converter-text"
        label="Your text"
        rows={6}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type or paste the text you want to convert."
      />

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setText('')} disabled={!text}>
          Clear
        </Button>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-navy-900">Converted versions</h2>
        {text.trim() ? (
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200">
            {CASE_CONVERTERS.map((converter) => {
              const output = converter.convert(text);
              return (
                <li key={converter.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-600">{converter.label}</p>
                    <p className="mt-1 break-words font-medium text-navy-900">{output}</p>
                  </div>
                  <CopyButton text={output} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Your converted text will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
