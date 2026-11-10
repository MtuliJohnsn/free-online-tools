import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-violet-200/70 bg-gradient-to-br from-[#180d2d] via-[#29113f] to-[#4a174c] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        {eyebrow ? (
          <p className="inline-flex rounded-full border border-fuchsia-200/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-200 backdrop-blur">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-violet-100/85 sm:text-lg">
            {description}
          </p>
        ) : null}
        {children}
        <div aria-hidden="true" className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-300" />
      </div>
    </header>
  );
}
