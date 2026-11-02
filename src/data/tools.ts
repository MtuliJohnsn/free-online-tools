import type { ComponentType } from 'react';
import { lazy } from 'react';
import { Briefcase, CalendarClock, Cake, CaseSensitive, Calculator, Clock, FileText, Globe, KeyRound, Landmark, Percent, Dices, Tag, Type } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CategoryId = 'calculators' | 'text' | 'datetime' | 'productivity';

export interface ToolCategory {
  id: CategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: CategoryId;
  icon: LucideIcon;
  keywords: string[];
  component: ComponentType;
}

export const CATEGORIES: ToolCategory[] = [
  { id: 'calculators', name: 'Calculators', description: 'Age, percentages, loans and discounts', icon: Calculator },
  { id: 'text', name: 'Text Tools', description: 'Count, format and transform your writing', icon: Type },
  { id: 'datetime', name: 'Date & Time', description: 'Live clocks and world time conversion', icon: CalendarClock },
  { id: 'productivity', name: 'Productivity', description: 'Generators for numbers and passwords', icon: Briefcase },
];

const TOOLS: ToolDefinition[] = [
  {
    slug: 'word-counter',
    name: 'Word Counter',
    summary: 'Count words, characters, sentences and paragraphs with reading time.',
    description: 'Free word counter. See words, characters, sentences, paragraphs, reading and speaking time as you type.',
    category: 'text',
    icon: FileText,
    keywords: ['words', 'characters', 'count', 'essay', 'reading time'],
    component: lazy(() => import('@/tools/WordCounter').then((m) => ({ default: m.WordCounter }))),
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    summary: 'Convert text to uppercase, lowercase, title case, camelCase, snake_case and more.',
    description: 'Free case converter. Switch text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more.',
    category: 'text',
    icon: CaseSensitive,
    keywords: ['uppercase', 'lowercase', 'title case', 'camelcase', 'snake case', 'capitalize'],
    component: lazy(() => import('@/tools/CaseConverter').then((m) => ({ default: m.CaseConverter }))),
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    summary: 'Find your exact age in years, months and days, plus your next birthday.',
    description: 'Free age calculator. Get your exact age in years, months and days, total weeks and hours, and days until your next birthday.',
    category: 'calculators',
    icon: Cake,
    keywords: ['age', 'birthday', 'date of birth', 'years old'],
    component: lazy(() => import('@/tools/AgeCalculator').then((m) => ({ default: m.AgeCalculator }))),
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    summary: 'Work out percentages of a number, what percent one number is of another, and percentage change.',
    description: 'Free percentage calculator. Calculate X% of Y, find what percent X is of Y, and measure percentage increase or decrease.',
    category: 'calculators',
    icon: Percent,
    keywords: ['percent', 'percentage', 'percentage change', 'ratio'],
    component: lazy(() => import('@/tools/PercentageCalculator').then((m) => ({ default: m.PercentageCalculator }))),
  },
  {
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    summary: 'Generate random whole numbers in any range, with or without repeats.',
    description: 'Free random number generator. Pick random whole numbers between any minimum and maximum, with optional unique results.',
    category: 'productivity',
    icon: Dices,
    keywords: ['random', 'number', 'dice', 'lottery', 'draw'],
    component: lazy(() => import('@/tools/RandomNumberGenerator').then((m) => ({ default: m.RandomNumberGenerator }))),
  },
  {
    slug: 'live-digital-clock',
    name: 'Live Digital Clock',
    summary: 'A large digital clock that updates every second in your local time zone.',
    description: 'Free live digital clock. See the current time and date in your time zone, updating every second, in 12 or 24-hour format.',
    category: 'datetime',
    icon: Clock,
    keywords: ['clock', 'time', 'digital', 'now', 'live'],
    component: lazy(() => import('@/tools/LiveClock').then((m) => ({ default: m.LiveClock }))),
  },
  {
    slug: 'world-time-converter',
    name: 'World Time Converter',
    summary: 'Convert a date and time between cities and time zones around the world.',
    description: 'Free world time converter. Compare one moment across cities in different time zones, including day differences.',
    category: 'datetime',
    icon: Globe,
    keywords: ['time zone', 'world clock', 'convert time', 'timezone', 'city time'],
    component: lazy(() => import('@/tools/WorldTimeConverter').then((m) => ({ default: m.WorldTimeConverter }))),
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    summary: 'Estimate monthly repayments, total interest and a yearly loan breakdown.',
    description: 'Free loan calculator. Estimate monthly loan payments, total interest and a year-by-year breakdown of principal and balance.',
    category: 'calculators',
    icon: Landmark,
    keywords: ['loan', 'mortgage', 'interest', 'repayment', 'emi', 'monthly payment'],
    component: lazy(() => import('@/tools/LoanCalculator').then((m) => ({ default: m.LoanCalculator }))),
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    summary: 'Find the sale price, your savings and the total with tax, including stacked discounts.',
    description: 'Free discount calculator. Work out the final sale price, how much you save, and the total with sales tax, with optional stacked discounts.',
    category: 'calculators',
    icon: Tag,
    keywords: ['discount', 'sale', 'savings', 'price', 'tax', 'off'],
    component: lazy(() => import('@/tools/DiscountCalculator').then((m) => ({ default: m.DiscountCalculator }))),
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    summary: 'Create strong, random passwords with the characters you choose.',
    description: 'Free password generator. Create strong random passwords with custom length and character types, created privately in your browser.',
    category: 'productivity',
    icon: KeyRound,
    keywords: ['password', 'secure', 'random', 'strong password', 'security'],
    component: lazy(() => import('@/tools/PasswordGenerator').then((m) => ({ default: m.PasswordGenerator }))),
  },
];

export function findTool(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function findCategory(id: string | null): ToolCategory | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function searchTools(query: string, categoryId?: CategoryId | null): ToolDefinition[] {
  const term = query.trim().toLowerCase();
  return TOOLS.filter((tool) => {
    if (categoryId && tool.category !== categoryId) return false;
    if (!term) return true;
    const haystack = [tool.name, tool.summary, ...tool.keywords, findCategory(tool.category)?.name ?? ''].join(' ').toLowerCase();
    return term.split(/\s+/).every((word) => haystack.includes(word));
  });
}

export function categoryName(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)?.name ?? '';
}
