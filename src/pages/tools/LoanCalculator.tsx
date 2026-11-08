import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Input, Select } from '@/components/ui/FormControls';
import { Stat } from '@/components/ui/Stat';
import { buildLoanSchedule, summarizeByYear } from '@/lib/calculators';
import { CURRENCIES, formatCurrency } from '@/lib/format';

interface LoanForm {
  amount: string;
  rate: string;
  term: string;
  unit: 'years' | 'months';
  currency: string;
}

const DEFAULT_FORM: LoanForm = { amount: '250000', rate: '6.5', term: '30', unit: 'years', currency: 'USD' };
const MAX_TERM_MONTHS = 600;

function parseNumber(value: string): number | null {
  if (value.trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function validate(form: LoanForm) {
  const amount = parseNumber(form.amount);
  const rate = parseNumber(form.rate);
  const term = parseNumber(form.term);
  if (amount === null || amount <= 0) return { error: 'Enter a loan amount greater than zero.' };
  if (rate === null || rate < 0 || rate > 100) return { error: 'Enter an interest rate between 0% and 100%.' };
  if (term === null || !Number.isInteger(term) || term < 1) return { error: 'Enter a whole number of years or months.' };
  const months = form.unit === 'years' ? term * 12 : term;
  if (months > MAX_TERM_MONTHS) return { error: 'The loan term can be up to 50 years.' };
  return { params: { amount, rate, months } };
}

export function LoanCalculator() {
  const [form, setForm] = useState<LoanForm>(DEFAULT_FORM);

  const validation = useMemo(() => validate(form), [form]);
  const schedule = useMemo(() => {
    const params = validation.params;
    if (!params) return null;
    const loan = buildLoanSchedule(params.amount, params.rate, params.months);
    return { loan, yearly: summarizeByYear(loan.rows) };
  }, [validation]);

  const money = (value: number) => formatCurrency(value, form.currency);

  function update<K extends keyof LoanForm>(key: K, value: LoanForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const summaryText = schedule
    ? [
        `Monthly payment: ${money(schedule.loan.monthlyPayment)}`,
        `Total paid: ${money(schedule.loan.totalPaid)}`,
        `Total interest: ${money(schedule.loan.totalInterest)}`,
      ].join('\n')
    : '';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="loan-amount" label="Loan amount" type="number" min={0} step="any" value={form.amount} onChange={(event) => update('amount', event.target.value)} />
        <Input id="loan-rate" label="Annual interest rate (%)" type="number" min={0} max={100} step="any" value={form.rate} onChange={(event) => update('rate', event.target.value)} />
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <Input id="loan-term" label="Loan term" type="number" min={1} step={1} value={form.term} onChange={(event) => update('term', event.target.value)} />
          <Select id="loan-unit" label="Unit" value={form.unit} onChange={(event) => update('unit', event.target.value as LoanForm['unit'])}>
            <option value="years">Years</option>
            <option value="months">Months</option>
          </Select>
        </div>
        <Select id="loan-currency" label="Currency" value={form.currency} onChange={(event) => update('currency', event.target.value)}>
          {CURRENCIES.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </Select>
      </div>

      {validation.error ? (
        <p role="alert" className="rounded-lg bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
          {validation.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <CopyButton text={summaryText} label="Copy summary" />
        <Button variant="secondary" onClick={() => setForm(DEFAULT_FORM)}>
          Reset
        </Button>
      </div>

      <div aria-live="polite">
        {schedule ? (
          <div className="space-y-8 animate-fade-in-up">
            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-primary-600 p-6 text-white sm:col-span-1">
                <dt className="text-sm font-semibold text-primary-100">Monthly payment</dt>
                <dd className="mt-2 break-words text-3xl font-bold">{money(schedule.loan.monthlyPayment)}</dd>
              </div>
              <Stat label="Total paid" value={money(schedule.loan.totalPaid)} />
              <Stat label="Total interest" value={money(schedule.loan.totalInterest)} />
            </dl>

            <div>
              <h2 className="mb-4 text-lg font-bold text-navy-900">Yearly breakdown</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <caption className="sr-only">Principal, interest and remaining balance for each year of the loan</caption>
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Year</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Principal paid</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Interest paid</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Balance left</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {schedule.yearly.map((row) => (
                      <tr key={row.year} className="text-navy-900">
                        <td className="px-4 py-3 font-semibold">{row.year}</td>
                        <td className="px-4 py-3">{money(row.principalPaid)}</td>
                        <td className="px-4 py-3">{money(row.interestPaid)}</td>
                        <td className="px-4 py-3">{money(row.endingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Enter your loan details to see the monthly payment.
          </p>
        )}
      </div>
    </div>
  );
}
