import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Stat } from '@/components/ui/Stat';
import { Textarea } from '@/components/ui/FormControls';
import { getTextStats } from '@/lib/text';

export function WordCounter() {
  const [text, setText] = useState('');
  const stats = useMemo(() => getTextStats(text), [text]);

  const items: { label: string; value: string | number }[] = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Reading time', value: stats.words ? `${stats.readingMinutes} min` : 0 },
    { label: 'Speaking time', value: stats.words ? `${stats.speakingMinutes} min` : 0 },
  ];

  return (
    <div className="space-y-8">
      <Textarea
        id="word-counter-text"
        label="Your text"
        rows={10}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste or type your text here to see live counts."
      />

      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <Stat key={item.label} label={item.label} value={item.value} />
        ))}
      </dl>

      <div className="flex flex-wrap gap-3">
        <CopyButton text={text} label="Copy text" />
        <Button variant="secondary" onClick={() => setText('')} disabled={!text}>
          Clear
        </Button>
      </div>
    </div>
  );
}
