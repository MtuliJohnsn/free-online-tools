import type { ReactNode } from 'react';

interface StatProps {
  label: string;
  value: ReactNode;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <dt className="text-sm font-medium text-slate-600">{label}</dt>
      <dd className="mt-1 break-words text-2xl font-bold text-navy-900">{value}</dd>
    </div>
  );
}
