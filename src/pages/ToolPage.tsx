import { ChevronRight } from 'lucide-react';
import { CATEGORIES, categoryName, searchTools, type ToolDefinition } from '@/data/tools';
import { Link } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { ToolCard } from '@/components/ToolCard';
import { AdSlot } from '@/components/AdSlot';

interface ToolPageProps {
  tool: ToolDefinition;
}

const CATEGORY_HERO: Record<ToolDefinition['category'], { background: string; icon: string; eyebrow: string }> = {
  calculators: { background: 'from-violet-50 via-white to-fuchsia-50', icon: 'from-violet-500 to-fuchsia-600', eyebrow: 'text-violet-700' },
  text: { background: 'from-pink-50 via-white to-rose-50', icon: 'from-pink-500 to-rose-500', eyebrow: 'text-pink-700' },
  datetime: { background: 'from-sky-50 via-white to-cyan-50', icon: 'from-sky-500 to-cyan-500', eyebrow: 'text-sky-700' },
  productivity: { background: 'from-emerald-50 via-white to-teal-50', icon: 'from-emerald-500 to-teal-500', eyebrow: 'text-emerald-700' },
  developer: { background: 'from-indigo-50 via-white to-blue-50', icon: 'from-indigo-500 to-blue-600', eyebrow: 'text-indigo-700' },
};

export function ToolPage({ tool }: ToolPageProps) {
  useDocumentMeta({ title: tool.name, description: tool.description });

  const Icon = tool.icon;
  const Tool = tool.component;
  const categoryLabel = CATEGORIES.find((category) => category.id === tool.category)?.name ?? '';
  const style = CATEGORY_HERO[tool.category];
  const related = searchTools('', tool.category)
    .filter((item) => item.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div>
      <div className={`border-b border-slate-200 bg-gradient-to-br ${style.background}`}>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
              <li><Link to="/" className="hover:text-primary-700">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li><Link to="/tools" className="hover:text-primary-700">All Tools</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="font-semibold text-navy-900">{tool.name}</li>
            </ol>
          </nav>

          <div className="mt-8 flex items-start gap-5">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${style.icon} text-white shadow-lg ring-4 ring-white/80`}>
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className={`text-sm font-bold uppercase tracking-wider ${style.eyebrow}`}>{categoryLabel}</p>
              <h1 className="mt-1 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{tool.name}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">{tool.summary}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/70 sm:p-8 animate-fade-in-up">
          <Tool />
        </div>

        <AdSlot className="mt-12" />

        {related.length > 0 ? (
          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-navy-900">More {categoryName(tool.category)}</h2>
              <Link to={`/tools?category=${tool.category}`} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                See all in this category
              </Link>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}><ToolCard tool={item} /></li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
