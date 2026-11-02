import { useState, type FormEvent } from 'react';
import { ArrowRight, Clapperboard, Search, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { CATEGORIES, findTool, searchTools } from '@/data/tools';
import { Link, navigate } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { ToolCard } from '@/components/ToolCard';

const TRUST_POINTS = [
  { icon: Sparkles, label: 'Completely free' },
  { icon: ShieldCheck, label: 'No sign-up needed' },
  { icon: Zap, label: 'Works instantly in your browser' },
];

const QUICK_TOOL_SLUGS = ['word-counter', 'password-generator', 'loan-calculator', 'live-digital-clock', 'age-calculator'];

const QUICK_TOOLS = QUICK_TOOL_SLUGS.map(findTool).filter((tool) => tool !== undefined);

export function HomePage() {
  useDocumentMeta({
    title: 'Free Online Tools for Everyday Life',
    description:
      'HABARI offers free online tools for everyday life: word counter, case converter, age, loan and discount calculators, password generator, live clock and world time converter.',
  });

  const [query, setQuery] = useState('');
  const matches = query.trim() ? searchTools(query).slice(0, 6) : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (matches[0]) navigate(`/tools/${matches[0].slug}`);
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary-100/60 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pb-24 sm:pt-24 animate-fade-in-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-1.5 text-sm font-semibold text-primary-700 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Ten free tools, always available
          </p>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight text-navy-900 sm:text-5xl lg:text-6xl">
            Free Online Tools for Everyday Life
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Count words, calculate loans, convert time zones, generate strong passwords and more. Fast, accurate and private.
          </p>

          <form role="search" onSubmit={handleSubmit} className="relative mx-auto mt-10 max-w-xl text-left">
            <label htmlFor="tool-search" className="sr-only">
              Search tools
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              id="tool-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setQuery('');
              }}
              placeholder="Search tools, e.g. password or loan"
              className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-base text-navy-900 shadow-sm transition-shadow duration-200 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100"
              aria-describedby="tool-search-status"
            />

            <div id="tool-search-status" aria-live="polite">
              {query.trim() && matches.length === 0 ? (
                <p className="mt-3 text-center text-sm text-slate-600">No tools match "{query.trim()}". Try a different word.</p>
              ) : null}
            </div>

            {matches.length > 0 ? (
              <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg animate-fade-in-up">
                {matches.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <li key={tool.slug}>
                      <Link to={`/tools/${tool.slug}`} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-primary-50 focus-visible:bg-primary-50">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-navy-900">{tool.name}</span>
                          <span className="block truncate text-sm text-slate-600">{tool.summary}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-medium text-slate-600">Popular:</span>
            {QUICK_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                to={`/tools/${tool.slug}`}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800 shadow-sm transition-colors hover:border-primary-300 hover:text-primary-700"
              >
                {tool.name}
              </Link>
            ))}
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.label} className="flex items-center gap-2 text-sm font-medium text-navy-700">
                  <Icon className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  {point.label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="categories-heading">
        <div>
          <h2 id="categories-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Browse by category
          </h2>
          <p className="mt-2 text-slate-600">Find the right tool for the job.</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const count = searchTools('', category.id).length;
            return (
              <li key={category.id}>
                <Link
                  to={`/tools?category=${category.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-5 text-lg font-bold text-navy-900">{category.name}</span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{category.description}</span>
                  <span className="mt-5 flex items-center justify-between text-sm font-semibold text-primary-700">
                    {count} {count === 1 ? 'tool' : 'tools'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6" aria-labelledby="all-tools-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="all-tools-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
              All free tools
            </h2>
            <p className="mt-2 text-slate-600">Every tool works instantly, with no account required.</p>
          </div>
          <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
            View all tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {searchTools('').map((tool) => (
            <li key={tool.slug}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="movies-heading">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div className="flex items-start gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-100">
              <Clapperboard className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="movies-heading" className="text-xl font-bold sm:text-2xl">
                Looking for something to watch?
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-primary-50">
                Browse our curated list of legal free movie sites, from public domain classics to free streaming services.
              </p>
            </div>
          </div>
          <Link
            to="/free-movies"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-primary-50"
          >
            Explore free movies
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
