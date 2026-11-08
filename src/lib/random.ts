export const MAX_RANDOM_BOUND = 1_000_000_000;
export const MAX_RANDOM_COUNT = 1000;

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export interface PasswordStrength {
  bits: number;
  label: 'Weak' | 'Fair' | 'Strong' | 'Very strong';
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?';
const AMBIGUOUS = 'Il1O0o';

function randomInt(min: number, max: number): number {
  const range = max - min + 1;
  const limit = Math.floor(0x100000000 / range) * range;
  const buffer = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);
  return min + (value % range);
}

export function generateRandomNumbers(min: number, max: number, count: number, unique: boolean): number[] {
  const results: number[] = [];
  const seen = new Set<number>();
  while (results.length < count) {
    const value = randomInt(min, max);
    if (unique) {
      if (seen.has(value)) continue;
      seen.add(value);
    }
    results.push(value);
  }
  return results;
}

function getCharacterSets(options: PasswordOptions): string[] {
  const sets: string[] = [];
  const filter = (set: string) => (options.excludeAmbiguous ? [...set].filter((char) => !AMBIGUOUS.includes(char)).join('') : set);
  if (options.uppercase) sets.push(filter(UPPERCASE));
  if (options.lowercase) sets.push(filter(LOWERCASE));
  if (options.numbers) sets.push(filter(NUMBERS));
  if (options.symbols) sets.push(SYMBOLS);
  return sets;
}

function pickChar(chars: string): string {
  return chars.charAt(randomInt(0, chars.length - 1));
}

export function generatePassword(options: PasswordOptions): string {
  const sets = getCharacterSets(options);
  if (sets.length === 0 || options.length < sets.length) return '';

  const pool = sets.join('');
  const chars = sets.map(pickChar);
  while (chars.length < options.length) {
    chars.push(pickChar(pool));
  }

  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
  }
  return chars.join('');
}

export function estimatePasswordStrength(options: PasswordOptions): PasswordStrength {
  const poolSize = getCharacterSets(options).join('').length;
  const bits = poolSize > 1 ? options.length * Math.log2(poolSize) : 0;
  if (bits < 40) return { bits, label: 'Weak' };
  if (bits < 60) return { bits, label: 'Fair' };
  if (bits < 80) return { bits, label: 'Strong' };
  return { bits, label: 'Very strong' };
}

export function hasCharacterSet(options: PasswordOptions): boolean {
  return getCharacterSets(options).length > 0;
}
