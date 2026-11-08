import { ChevronRight } from 'lucide-react';
import { CATEGORIES, categoryName, searchTools, type ToolDefinition } from '@/data/tools';
import { Link } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { ToolCard } from '@/components/ToolCard';
import { AdSlot } from '@/components/AdSlot';

interface ToolPageProps {
  tool: ToolDefinition;
}

export function ToolPage({ tool }: ToolPageProps) {
  useDocumentMeta({ title: tool.name, description: tool.description });

  const Icon = tool.icon;
  const Tool = tool.component;
  const categoryLabel = CATEGORIES.find((category) => category.id === tool.category)?.name ?? '';
  const related = searchTools('', tool.category)
    .filter((item) => item.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div>
      <div className="border-b border-slate-200 bg-primary-50/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-primary-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link to="/tools" className="hover:text-primary-700">
                  All Tools
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="font-semibold text-navy-900">
                {tool.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-sm">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">{categoryLabel}</p>
              <h1 className="mt-1 text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">{tool.name}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">{tool.summary}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-fade-in-up">
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
                <li key={item.slug}>
                  <ToolCard tool={item} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
