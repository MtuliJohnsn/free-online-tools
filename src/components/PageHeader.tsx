import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-primary-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">{eyebrow}</p> : null}
        <h1 className="mt-3 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{description}</p> : null}
        {children}
      </div>
    </header>
  );
}
