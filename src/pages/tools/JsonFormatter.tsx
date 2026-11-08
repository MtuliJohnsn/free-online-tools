import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Textarea } from '@/components/ui/FormControls';
import { formatJson } from '@/lib/devtools';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [minify, setMinify] = useState(false);

  const result = useMemo(() => formatJson(input, minify), [input, minify]);

  return (
    <div className="space-y-8">
      <Textarea
        id="json-input"
        label="JSON input"
        rows={8}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder='Paste your JSON here, e.g. {"name":"HABARI","tools":10}'
        className="font-mono text-sm"
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={() => setMinify(false)} aria-pressed={!minify}>
          Format
        </Button>
        <Button variant="secondary" onClick={() => setMinify(true)} aria-pressed={minify}>
          Minify
        </Button>
        <Button variant="secondary" onClick={() => setInput('')} disabled={!input}>
          Clear
        </Button>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Output</h2>
          {result.ok ? <CopyButton text={result.output} label="Copy JSON" /> : null}
        </div>
        {result.ok ? (
          <pre className="max-h-96 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-navy-900">
            {result.output}
          </pre>
        ) : (
          <p role="alert" className="rounded-xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
            {result.error}
          </p>
        )}
      </div>
    </div>
  );
}
