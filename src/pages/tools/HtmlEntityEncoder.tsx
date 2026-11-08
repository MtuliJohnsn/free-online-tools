import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Textarea } from '@/components/ui/FormControls';
import { escapeHtml, unescapeHtml } from '@/lib/devtools';

export function HtmlEntityEncoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const result = useMemo(() => {
    if (!input) return '';
    return mode === 'encode' ? escapeHtml(input) : unescapeHtml(input);
  }, [input, mode]);

  return (
    <div className="space-y-8">
      <div className="inline-flex rounded-lg border border-slate-300 p-1">
        <button
          type="button"
          aria-pressed={mode === 'encode'}
          onClick={() => setMode('encode')}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${mode === 'encode' ? 'bg-primary-600 text-white' : 'text-navy-800 hover:bg-slate-100'}`}
        >
          Encode
        </button>
        <button
          type="button"
          aria-pressed={mode === 'decode'}
          onClick={() => setMode('decode')}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${mode === 'decode' ? 'bg-primary-600 text-white' : 'text-navy-800 hover:bg-slate-100'}`}
        >
          Decode
        </button>
      </div>

      <Textarea
        id="html-input"
        label={mode === 'encode' ? 'Text to encode' : 'HTML entities to decode'}
        rows={6}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={mode === 'encode' ? 'Enter text with <, >, & and other special characters.' : 'Paste HTML with entities like &amp; &lt; &gt;'}
        className="font-mono text-sm"
      />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Result</h2>
          {result ? <CopyButton text={result} /> : null}
        </div>
        {result ? (
          <pre className="max-h-96 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-navy-900 break-all whitespace-pre-wrap">
            {result}
          </pre>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Your result will appear here.
          </p>
        )}
      </div>

      <Button variant="secondary" onClick={() => setInput('')} disabled={!input}>
        Clear
      </Button>
    </div>
  );
}
