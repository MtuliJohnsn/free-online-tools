import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { copyText } from '@/lib/clipboard';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function handleCopy() {
    const ok = await copyText(text);
    setStatus(ok ? 'copied' : 'failed');
    window.setTimeout(() => setStatus('idle'), 2000);
  }

  const Icon = status === 'copied' ? Check : Copy;
  const buttonLabel = status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : label;

  return (
    <Button variant="secondary" onClick={handleCopy} disabled={!text} aria-live="polite">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {buttonLabel}
    </Button>
  );
}
