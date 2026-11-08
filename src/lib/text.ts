export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  speakingMinutes: number;
}

const EMPTY_STATS: TextStats = {
  words: 0,
  characters: 0,
  charactersNoSpaces: 0,
  sentences: 0,
  paragraphs: 0,
  readingMinutes: 0,
  speakingMinutes: 0,
};

export function getTextStats(text: string): TextStats {
  const trimmed = text.trim();
  if (!trimmed) return EMPTY_STATS;

  const words = trimmed.split(/\s+/).length;
  const chars = [...text];

  return {
    words,
    characters: chars.length,
    charactersNoSpaces: chars.filter((char) => !/\s/.test(char)).length,
    sentences: trimmed.split(/[.!?]+/).filter((part) => part.trim().length > 0).length,
    paragraphs: trimmed.split(/\n\s*\n/).filter((part) => part.trim().length > 0).length,
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    speakingMinutes: Math.max(1, Math.ceil(words / 130)),
  };
}

export type CaseMode =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'alternating'
  | 'inverse'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant';

export interface CaseConverter {
  id: CaseMode;
  label: string;
  convert: (text: string) => string;
}

function splitWords(text: string): string[] {
  return text.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function toAlternatingCase(text: string): string {
  let letterIndex = 0;
  return [...text]
    .map((char) => {
      if (char.toLowerCase() === char.toUpperCase()) return char;
      const output = letterIndex % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
      letterIndex += 1;
      return output;
    })
    .join('');
}

export const CASE_CONVERTERS: CaseConverter[] = [
  { id: 'upper', label: 'UPPERCASE', convert: (text) => text.toUpperCase() },
  { id: 'lower', label: 'lowercase', convert: (text) => text.toLowerCase() },
  {
    id: 'title',
    label: 'Title Case',
    convert: (text) => text.toLowerCase().replace(/(^|[^\p{L}\p{N}'’])(\p{L})/gu, (_match, before: string, letter: string) => before + letter.toUpperCase()),
  },
  {
    id: 'sentence',
    label: 'Sentence case',
    convert: (text) => text.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{Ll})/gu, (_match, before: string, letter: string) => before + letter.toUpperCase()),
  },
  { id: 'alternating', label: 'aLtErNaTiNg', convert: toAlternatingCase },
  {
    id: 'inverse',
    label: 'iNVERSE cASE',
    convert: (text) => [...text].map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())).join(''),
  },
  {
    id: 'camel',
    label: 'camelCase',
    convert: (text) =>
      splitWords(text)
        .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
        .join(''),
  },
  { id: 'pascal', label: 'PascalCase', convert: (text) => splitWords(text).map(capitalize).join('') },
  { id: 'snake', label: 'snake_case', convert: (text) => splitWords(text).map((word) => word.toLowerCase()).join('_') },
  { id: 'kebab', label: 'kebab-case', convert: (text) => splitWords(text).map((word) => word.toLowerCase()).join('-') },
  { id: 'constant', label: 'CONSTANT_CASE', convert: (text) => splitWords(text).map((word) => word.toUpperCase()).join('_') },
];
