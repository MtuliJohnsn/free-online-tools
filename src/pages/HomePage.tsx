import { useState } from 'react';
import { ArrowRight, Clapperboard, Search, ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';
import { CATEGORIES, findTool, searchTools, type CategoryId } from '@/data/tools';
import { Link } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

const TRUST_POINTS = [
  { icon: Zap, label: 'Free to use' },
  { icon: Lock, label: 'No account needed' },
  { icon: ShieldCheck, label: 'Simple and secure' },
];

const QUICK_TOOL_SLUGS = ['word-counter', 'password-generator', 'loan-calculator', 'live-digital-clock', 'age-calculator'];
const QUICK_TOOLS = QUICK_TOOL_SLUGS.map(findTool).filter((tool) => tool !== undefined);

export function HomePage() {
  useDocumentMeta({
    title: 'HABARI — Your Free Digital Toolbox',
    description: 'Discover free online tools for calculations, text, dates, productivity and more. Simple, useful tools that work right in your browser.',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryId>('all');
  const visibleTools = searchTools(searchQuery, selectedCategory === 'all' ? undefined : selectedCategory);

  return (
    <div className="min-h-screen bg-[#100f15]">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#f5dafa] via-[#e7d8fb] to-[#c6c8ff] pb-28 pt-14 text-[#17132d] sm:pt-20">
        <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-24 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-800 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Your everyday digital toolbox
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-[#17132d] sm:text-6xl lg:text-7xl">
            HABARI
            <span className="mt-2 block bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl">
              Tools to make life easier.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#49415f] sm:text-lg">
            Discover handy free tools for everyday tasks — from quick calculations and text helpers to date, time and productivity utilities.
          </p>
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-violet-500" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => { setSearchQuery(event.target.value); setSelectedCategory('all'); }}
              placeholder="Search for a tool..."
              aria-label="Search tools"
              className="w-full rounded-2xl border border-white/80 bg-white/95 py-4 pl-14 pr-5 text-base text-slate-900 shadow-xl shadow-violet-900/10 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-300/40"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-sm font-semibold text-violet-900/70">Popular:</span>
            {QUICK_TOOLS.map((tool) => (
              <Link key={tool.slug} to={`/tools/${tool.slug}`} className="rounded-full border border-white/70 bg-white/45 px-3 py-1.5 text-sm font-semibold text-violet-950 transition hover:bg-white hover:shadow">
                {tool.name}
              </Link>
            ))}
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3">
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon;
              return <li key={point.label} className="flex items-center gap-2 text-sm font-semibold text-[#51466e]"><Icon className="h-4 w-4 text-violet-700" aria-hidden="true" />{point.label}</li>;
            })}
          </ul>
        </div>
      </section>

      <section className="-mt-12 relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6" aria-labelledby="tools-heading">
        <div className="rounded-t-3xl border border-white/10 bg-[#211f28] px-5 pb-5 pt-7 shadow-2xl shadow-black/20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">Explore HABARI</p>
              <h2 id="tools-heading" className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Find the right tool</h2>
            </div>
            <Link to="/tools" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition hover:text-white">All tools <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto border-b border-white/10 pb-1" role="group" aria-label="Filter tools by category">
            <button type="button" onClick={() => setSelectedCategory('all')} aria-pressed={selectedCategory === 'all'} className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition ${selectedCategory === 'all' ? 'border-violet-400 text-violet-300' : 'border-transparent text-slate-300 hover:text-white'}`}>All</button>
            {CATEGORIES.map((category) => (
              <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} aria-pressed={selectedCategory === category.id} className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition ${selectedCategory === category.id ? 'border-violet-400 text-violet-300' : 'border-transparent text-slate-300 hover:text-white'}`}>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-b-3xl border-x border-b border-white/10 bg-[#15141a] p-5 sm:p-8">
          {visibleTools.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <li key={tool.slug}>
                    <Link to={`/tools/${tool.slug}`} className="group flex h-full min-h-48 flex-col rounded-2xl border border-white/[0.07] bg-[#232129] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-[#292533] hover:shadow-xl hover:shadow-violet-950/20">
                      <span className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-950/30"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        <span className="text-base font-bold text-white">{tool.name}</span>
                      </span>
                      <span className="mt-4 flex-1 text-sm leading-6 text-slate-400">{tool.summary}</span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition group-hover:text-fuchsia-300">Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 px-5 py-12 text-center">
              <p className="font-semibold text-white">No tools found</p>
              <p className="mt-2 text-sm text-slate-400">Try another search or choose a different category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6" aria-labelledby="about-habari-heading">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#211f2b] to-[#191720] p-7 sm:p-10">
          <h2 id="about-habari-heading" className="text-2xl font-extrabold text-white sm:text-3xl">A useful toolbox, ready when you need it</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            HABARI brings together practical online tools designed to make everyday digital tasks easier. Use calculators, text tools, date and time utilities, and productivity helpers directly in your browser.
          </p>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            Browse the collection, choose a tool, and get started. Our goal is to keep useful features easy to find and simple to use.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-violet-300 hover:text-white">More about HABARI <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6" aria-label="More from HABARI">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-violet-300/15 bg-gradient-to-br from-[#302044] to-[#201b2b] p-7 text-white sm:p-8">
            <Sparkles className="h-7 w-7 text-fuchsia-300" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Explore AI tools</h2>
            <p className="mt-2 text-sm leading-6 text-violet-100/75">Discover a curated collection of AI tools for writing, creativity, productivity and more.</p>
            <Link to="/ai-tools" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-200 hover:text-white">Browse AI tools <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="rounded-3xl border border-violet-300/15 bg-gradient-to-br from-[#302044] to-[#201b2b] p-7 text-white sm:p-8">
            <Clapperboard className="h-7 w-7 text-violet-300" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Looking for something to watch?</h2>
            <p className="mt-2 text-sm leading-6 text-violet-100/75">Browse our curated list of legal free movie websites and streaming services.</p>
            <Link to="/free-movies" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-200 hover:text-white">Explore free movies <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
