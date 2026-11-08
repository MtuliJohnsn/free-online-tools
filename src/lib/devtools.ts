export function formatJson(input: string, minify: boolean): { ok: true; output: string } | { ok: false; error: string } {
  if (!input.trim()) return { ok: false, error: 'Enter some JSON to format.' };
  try {
    const parsed: unknown = JSON.parse(input);
    const output = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
    return { ok: true, output };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  }
}

export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function decodeBase64(input: string): { ok: true; output: string } | { ok: false; error: string } {
  try {
    const binary = atob(input.trim());
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return { ok: true, output: new TextDecoder().decode(bytes) };
  } catch {
    return { ok: false, error: 'Invalid Base64 input. Check for non-Base64 characters or incorrect padding.' };
  }
}

export function generateUuid(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  buffer[6] = (buffer[6] & 0x0f) | 0x40;
  buffer[8] = (buffer[8] & 0x3f) | 0x80;
  const hex = [...buffer].map((b) => b.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
}

export function generateUuids(count: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) result.push(generateUuid());
  return result;
}

export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}

export function urlDecode(input: string): { ok: true; output: string } | { ok: false; error: string } {
  try {
    return { ok: true, output: decodeURIComponent(input) };
  } catch {
    return { ok: false, error: 'Invalid URL-encoded input. Check for malformed % sequences.' };
  }
}

export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export function testRegex(pattern: string, flags: string, text: string): { ok: true; matches: RegexMatch[] } | { ok: false; error: string } {
  if (!pattern) return { ok: false, error: 'Enter a regular expression pattern.' };
  try {
    const re = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    if (flags.includes('g')) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      const m = re.exec(text);
      if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
    }
    return { ok: true, matches };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  }
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function unescapeHtml(input: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
}

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RgbColor | null {
  const clean = hex.replace(/^#/, '');
  if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(clean)) return null;
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function rgbToHex(rgb: RgbColor): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb(hsl: HslColor): RgbColor {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  let r: number;
  let g: number;
  let b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function timestampToDate(ts: number, unit: 's' | 'ms'): { local: string; utc: string; iso: string } | null {
  const ms = unit === 's' ? ts * 1000 : ts;
  if (!Number.isFinite(ms)) return null;
  const date = new Date(ms);
  if (date.toString() === 'Invalid Date') return null;
  return {
    local: date.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'long' }),
    utc: date.toUTCString(),
    iso: date.toISOString(),
  };
}

export function dateToTimestamp(input: string, unit: 's' | 'ms'): number | null {
  const date = new Date(input);
  if (date.toString() === 'Invalid Date') return null;
  const ms = date.getTime();
  return unit === 's' ? Math.floor(ms / 1000) : ms;
}

export interface DiffLine {
  type: 'equal' | 'added' | 'removed';
  text: string;
  oldNum?: number;
  newNum?: number;
}

export function computeDiff(textA: string, textB: string): DiffLine[] {
  const linesA = textA.split('\n');
  const linesB = textB.split('\n');
  const result: DiffLine[] = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  let oldNum = 1;
  let newNum = 1;

  for (let i = 0; i < maxLen; i++) {
    const a = linesA[i];
    const b = linesB[i];
    if (a === undefined && b !== undefined) {
      result.push({ type: 'added', text: b, newNum: newNum++ });
    } else if (a !== undefined && b === undefined) {
      result.push({ type: 'removed', text: a, oldNum: oldNum++ });
    } else if (a === b) {
      result.push({ type: 'equal', text: a ?? '', oldNum: oldNum++, newNum: newNum++ });
    } else {
      result.push({ type: 'removed', text: a ?? '', oldNum: oldNum++ });
      result.push({ type: 'added', text: b ?? '', newNum: newNum++ });
    }
  }
  return result;
}
