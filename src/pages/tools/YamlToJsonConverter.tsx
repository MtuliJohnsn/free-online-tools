import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Textarea } from '@/components/ui/FormControls';

type YamlModule = typeof import('yaml');

let yamlPromise: Promise<YamlModule> | null = null;
function loadYaml(): Promise<YamlModule> {
  if (!yamlPromise) yamlPromise = import('yaml');
  return yamlPromise;
}

export function YamlToJsonConverter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function convert() {
    if (!input.trim()) {
      setError('Enter some YAML to convert.');
      setOutput('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const yaml = await loadYaml();
      const parsed = yaml.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setOutput('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Textarea
        id="yaml-input"
        label="YAML input"
        rows={10}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={'key: value\nlist:\n  - item one\n  - item two'}
        className="font-mono text-sm"
      />

      <div className="flex flex-wrap gap-3">
        <Button onClick={convert} disabled={loading}>
          {loading ? 'Converting...' : 'Convert to JSON'}
        </Button>
        <Button variant="secondary" onClick={() => { setInput(''); setOutput(''); setError(''); }} disabled={!input}>
          Clear
        </Button>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">JSON output</h2>
          {output ? <CopyButton text={output} label="Copy JSON" /> : null}
        </div>
        {error ? (
          <p role="alert" className="rounded-xl bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
            {error}
          </p>
        ) : output ? (
          <pre className="max-h-96 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-navy-900">
            {output}
          </pre>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Your converted JSON will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
