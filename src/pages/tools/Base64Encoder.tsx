import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Textarea } from '@/components/ui/FormControls';
import { decodeBase64, encodeBase64 } from '@/lib/devtools';

export function Base64Encoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const result = useMemo<{ ok: true; output: string } | { ok: false; error: string }>(() => {
    if (!input) return { ok: true, output: '' };
    if (mode === 'encode') return { ok: true, output: encodeBase64(input) };
    return decodeBase64(input);
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
        id="base64-input"
        label={mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
        rows={6}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={mode === 'encode' ? 'Type or paste text to convert to Base64.' : 'Paste Base64 text to decode.'}
        className="font-mono text-sm"
      />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Result</h2>
          {result.ok && result.output ? <CopyButton text={result.output} /> : null}
        </div>
        {result.ok ? (
          <pre className="max-h-96 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-navy-900">
            {result.output || 'Your result will appear here.'}
          </pre>
        ) : (
          <p role="alert" className="rounded-xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
            {result.error}
          </p>
        )}
      </div>

      <Button variant="secondary" onClick={() => setInput('')} disabled={!input}>
        Clear
      </Button>
    </div>
  );
}
