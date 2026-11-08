export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  birthWeekday: string;
  nextBirthdayInDays: number;
  nextBirthdayAge: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface YearlySummary {
  year: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  rows: AmortizationRow[];
}

export interface DiscountResult {
  finalPrice: number;
  savedAmount: number;
  savedPercent: number;
  taxAmount: number;
  totalWithTax: number;
}

const DAY_MS = 86_400_000;
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function utcMs(date: CalendarDate): number {
  return Date.UTC(date.year, date.month - 1, date.day);
}

export function parseIsoDate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  if (year < 1900 || month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) return null;
  return { year, month, day };
}

export function toLocalIsoDate(date: Date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addMonthsClamped(date: CalendarDate, months: number): CalendarDate {
  const index = date.month - 1 + months;
  const year = date.year + Math.floor(index / 12);
  const month = ((index % 12) + 12) % 12 + 1;
  return { year, month, day: Math.min(date.day, daysInMonth(year, month)) };
}

export function calculateAge(birth: CalendarDate, asOf: CalendarDate): AgeResult | null {
  const birthMs = utcMs(birth);
  const asOfMs = utcMs(asOf);
  if (birthMs > asOfMs) return null;

  let totalMonths = (asOf.year - birth.year) * 12 + (asOf.month - birth.month);
  if (asOf.day < birth.day) totalMonths -= 1;
  const anchor = addMonthsClamped(birth, totalMonths);
  const days = Math.round((asOfMs - utcMs(anchor)) / DAY_MS);

  const totalDays = Math.round((asOfMs - birthMs) / DAY_MS);

  let nextBirthday = addMonthsClamped(birth, (asOf.year - birth.year) * 12);
  if (utcMs(nextBirthday) < asOfMs) {
    nextBirthday = addMonthsClamped(birth, (asOf.year + 1 - birth.year) * 12);
  }

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalHours: totalDays * 24,
    birthWeekday: WEEKDAYS[new Date(birthMs).getUTCDay()],
    nextBirthdayInDays: Math.round((utcMs(nextBirthday) - asOfMs) / DAY_MS),
    nextBirthdayAge: nextBirthday.year - birth.year,
  };
}

export function calculatePercentOf(percent: number, value: number): number {
  return (value * percent) / 100;
}

export function calculateWhatPercent(part: number, whole: number): number | null {
  if (whole === 0) return null;
  return (part / whole) * 100;
}

export function calculatePercentChange(from: number, to: number): number | null {
  if (from === 0) return null;
  return ((to - from) / Math.abs(from)) * 100;
}

function calculateMonthlyPayment(principal: number, annualRatePercent: number, termMonths: number): number {
  const monthlyRate = annualRatePercent / 1200;
  if (monthlyRate === 0) return principal / termMonths;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
}

export function buildLoanSchedule(principal: number, annualRatePercent: number, termMonths: number): LoanResult {
  const monthlyRate = annualRatePercent / 1200;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRatePercent, termMonths);
  const rows: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month += 1) {
    const interest = balance * monthlyRate;
    const isLast = month === termMonths;
    const principalPart = isLast ? balance : monthlyPayment - interest;
    balance = Math.max(0, balance - principalPart);
    rows.push({
      month,
      payment: principalPart + interest,
      principal: principalPart,
      interest,
      balance,
    });
  }

  return {
    monthlyPayment,
    totalPaid: rows.reduce((sum, row) => sum + row.payment, 0),
    totalInterest: rows.reduce((sum, row) => sum + row.interest, 0),
    rows,
  };
}

export function summarizeByYear(rows: AmortizationRow[]): YearlySummary[] {
  const years = new Map<number, YearlySummary>();
  for (const row of rows) {
    const year = Math.ceil(row.month / 12);
    const summary = years.get(year) ?? { year, principalPaid: 0, interestPaid: 0, endingBalance: 0 };
    summary.principalPaid += row.principal;
    summary.interestPaid += row.interest;
    summary.endingBalance = row.balance;
    years.set(year, summary);
  }
  return [...years.values()];
}

export function calculateDiscount(price: number, discountPercent: number, secondDiscountPercent: number, taxPercent: number): DiscountResult {
  const finalPrice = price * (1 - discountPercent / 100) * (1 - secondDiscountPercent / 100);
  const savedAmount = price - finalPrice;
  const taxAmount = (finalPrice * taxPercent) / 100;
  return {
    finalPrice,
    savedAmount,
    savedPercent: price === 0 ? 0 : (savedAmount / price) * 100,
    taxAmount,
    totalWithTax: finalPrice + taxAmount,
  };
}
