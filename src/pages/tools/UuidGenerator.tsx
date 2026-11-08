import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { generateUuids } from '@/lib/devtools';

export function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>(() => generateUuids(1));

  function generate() {
    setUuids(generateUuids(count));
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end gap-4">
        <label htmlFor="uuid-count" className="text-sm font-semibold text-navy-900">
          How many UUIDs?
        </label>
        <input
          id="uuid-count"
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(event) => setCount(Math.min(100, Math.max(1, Number(event.target.value) || 1)))}
          className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-base text-navy-900 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={generate}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Generate
        </Button>
        <CopyButton text={uuids.join('\n')} label="Copy all" />
      </div>

      <ul className="space-y-2" aria-live="polite">
        {uuids.map((uuid) => (
          <li key={uuid} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <code className="font-mono text-sm font-medium text-navy-900 break-all">{uuid}</code>
            <CopyButton text={uuid} />
          </li>
        ))}
      </ul>

      <p className="text-sm text-slate-600">
        Each UUID is a version 4 identifier generated securely in your browser. Generate up to 100 at a time.
      </p>
    </div>
  );
}
