import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-navy-900 placeholder:text-slate-500 transition-colors duration-200 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 aria-[invalid=true]:border-error-600';

interface ControlProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint && !error ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

function ControlShell({ id, label, hint, error, children }: ControlProps & { children: ReactNode }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-error-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ id, label, hint, error, className = '', ...props }: ControlProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <ControlShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        className={`${inputClass} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...props}
      />
    </ControlShell>
  );
}

export function Textarea({ id, label, hint, error, className = '', ...props }: ControlProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <ControlShell id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        className={`${inputClass} resize-y leading-relaxed ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...props}
      />
    </ControlShell>
  );
}

export function Select({ id, label, hint, error, className = '', children, ...props }: ControlProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <ControlShell id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        className={`${inputClass} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...props}
      >
        {children}
      </select>
    </ControlShell>
  );
}
