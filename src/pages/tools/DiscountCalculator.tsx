import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Input, Select } from '@/components/ui/FormControls';
import { Stat } from '@/components/ui/Stat';
import { calculateDiscount } from '@/lib/calculators';
import { CURRENCIES, formatCurrency, formatNumber } from '@/lib/format';

interface DiscountForm {
  price: string;
  discount: string;
  secondDiscount: string;
  tax: string;
  currency: string;
}

const DEFAULT_FORM: DiscountForm = { price: '100', discount: '20', secondDiscount: '', tax: '', currency: 'USD' };

function parsePercent(value: string): number | null {
  if (value.trim() === '') return 0;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 && number <= 100 ? number : null;
}

function validate(form: DiscountForm) {
  const price = form.price.trim() === '' ? null : Number(form.price);
  if (price === null || !Number.isFinite(price) || price < 0) return { error: 'Enter the original price as a number of zero or more.' };
  const discount = parsePercent(form.discount);
  const secondDiscount = parsePercent(form.secondDiscount);
  const tax = parsePercent(form.tax);
  if (discount === null || secondDiscount === null) return { error: 'Discounts must be between 0% and 100%.' };
  if (tax === null) return { error: 'Tax must be between 0% and 100%.' };
  return { params: { price, discount, secondDiscount, tax } };
}

export function DiscountCalculator() {
  const [form, setForm] = useState<DiscountForm>(DEFAULT_FORM);

  const validation = useMemo(() => validate(form), [form]);
  const result = useMemo(() => {
    const params = validation.params;
    if (!params) return null;
    return calculateDiscount(params.price, params.discount, params.secondDiscount, params.tax);
  }, [validation]);

  const money = (value: number) => formatCurrency(value, form.currency);

  function update<K extends keyof DiscountForm>(key: K, value: DiscountForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const summaryText = result
    ? [
        `Final price: ${money(result.finalPrice)}`,
        `You save: ${money(result.savedAmount)} (${formatNumber(result.savedPercent)}%)`,
        `Total with tax: ${money(result.totalWithTax)}`,
      ].join('\n')
    : '';

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="discount-price" label="Original price" type="number" min={0} step="any" value={form.price} onChange={(event) => update('price', event.target.value)} />
        <Input id="discount-percent" label="Discount (%)" type="number" min={0} max={100} step="any" value={form.discount} onChange={(event) => update('discount', event.target.value)} />
        <Input id="discount-second" label="Extra discount (%), optional" hint="Applied after the first discount." type="number" min={0} max={100} step="any" value={form.secondDiscount} onChange={(event) => update('secondDiscount', event.target.value)} />
        <Input id="discount-tax" label="Sales tax (%), optional" type="number" min={0} max={100} step="any" value={form.tax} onChange={(event) => update('tax', event.target.value)} />
        <Select id="discount-currency" label="Currency" value={form.currency} onChange={(event) => update('currency', event.target.value)}>
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
        {result ? (
          <div className="space-y-6 animate-fade-in-up">
            <div className="rounded-2xl bg-primary-600 p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-100">Final price</p>
              <p className="mt-2 break-words text-4xl font-bold sm:text-5xl">{money(result.finalPrice)}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              <Stat label="You save" value={money(result.savedAmount)} />
              <Stat label="Savings" value={`${formatNumber(result.savedPercent)}%`} />
              <Stat label="Total with tax" value={money(result.totalWithTax)} />
            </dl>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-600">
            Enter a price and discount to see the final price.
          </p>
        )}
      </div>
    </div>
  );
}
