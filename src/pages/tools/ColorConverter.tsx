import { useMemo, useState } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Input } from '@/components/ui/FormControls';
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl, type HslColor, type RgbColor } from '@/lib/devtools';

export function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState<RgbColor>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<HslColor>({ h: 217, s: 91, l: 60 });

  const previewColor = useMemo(() => rgbToHex(rgb), [rgb]);

  function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
  }

  function fromHex(value: string) {
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed));
    }
  }

  function fromRgb(channel: keyof RgbColor, value: number) {
    const next = { ...rgb, [channel]: clamp(value, 0, 255) };
    setRgb(next);
    setHex(rgbToHex(next));
    setHsl(rgbToHsl(next));
  }

  function fromHsl(channel: keyof HslColor, value: number) {
    const max = channel === 'h' ? 360 : 100;
    const next = { ...hsl, [channel]: clamp(value, 0, max) };
    setHsl(next);
    const rgbVal = hslToRgb(next);
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal));
  }

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-6">
        <div className="h-28 w-28 shrink-0 rounded-2xl border border-slate-200 shadow-sm" style={{ backgroundColor: previewColor }} aria-label="Color preview" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
            <code className="font-mono text-sm font-medium text-navy-900">{hex}</code>
            <CopyButton text={hex} />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
            <code className="font-mono text-sm font-medium text-navy-900">{rgbString}</code>
            <CopyButton text={rgbString} />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
            <code className="font-mono text-sm font-medium text-navy-900">{hslString}</code>
            <CopyButton text={hslString} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-navy-900">HEX</h2>
          <Input
            id="color-hex"
            label="Hex value"
            value={hex}
            onChange={(event) => fromHex(event.target.value)}
            placeholder="#3b82f6"
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-navy-900">RGB</h2>
          <div className="grid grid-cols-3 gap-2">
            {(['r', 'g', 'b'] as const).map((ch) => (
              <Input
                key={ch}
                id={`color-rgb-${ch}`}
                label={ch.toUpperCase()}
                type="number"
                min={0}
                max={255}
                value={rgb[ch]}
                onChange={(event) => fromRgb(ch, Number(event.target.value))}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-navy-900">HSL</h2>
          <div className="grid grid-cols-3 gap-2">
            <Input
              id="color-hsl-h"
              label="H"
              type="number"
              min={0}
              max={360}
              value={hsl.h}
              onChange={(event) => fromHsl('h', Number(event.target.value))}
            />
            <Input
              id="color-hsl-s"
              label="S%"
              type="number"
              min={0}
              max={100}
              value={hsl.s}
              onChange={(event) => fromHsl('s', Number(event.target.value))}
            />
            <Input
              id="color-hsl-l"
              label="L%"
              type="number"
              min={0}
              max={100}
              value={hsl.l}
              onChange={(event) => fromHsl('l', Number(event.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
