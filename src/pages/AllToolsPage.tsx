import { useState } from 'react';
import { findCategory, searchTools, CATEGORIES, type CategoryId } from '@/data/tools';
import { useLocation } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { PageHeader } from '@/components/PageHeader';
import { ToolCard } from '@/components/ToolCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormControls';

export function AllToolsPage() {
  useDocumentMeta({
    title: 'All Tools',
    description: 'Browse every free HABARI tool: calculators, text tools, date and time tools and productivity generators.',
  });

  const { search } = useLocation();
  const [category, setCategory] = useState<CategoryId | null>(() => findCategory(new URLSearchParams(search).get('category'))?.id ?? null);
  const [query, setQuery] = useState('');

  const results = searchTools(query, category);
  const hasFilters = Boolean(query.trim() || category);

  return (
    <div>
      <PageHeader
        eyebrow="Free tools"
        title="All Tools"
        description="Every HABARI tool in one place. Search by name or filter by category."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Input
            id="all-tools-search"
            label="Search tools"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try 'percentage' or 'time zone'"
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <CategoryChip label="All" active={category === null} onClick={() => setCategory(null)} />
            {CATEGORIES.map((item) => (
              <CategoryChip key={item.id} label={item.name} active={category === item.id} onClick={() => setCategory(item.id)} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4" aria-live="polite">
          <p className="text-sm font-medium text-slate-600">
            Showing {results.length} of {searchTools('').length} tools
          </p>
          {hasFilters ? (
            <Button
              variant="ghost"
              onClick={() => {
                setQuery('');
                setCategory(null);
              }}
            >
              Clear filters
            </Button>
          ) : null}
        </div>

        {results.length > 0 ? (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((tool) => (
              <li key={tool.slug}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-lg font-semibold text-navy-900">No tools match your filters</p>
            <p className="mt-2 text-slate-600">Try a different search term or choose another category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

interface CategoryChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function CategoryChip({ label, active, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
        active ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 bg-white text-navy-800 hover:border-primary-300 hover:text-primary-700'
      }`}
    >
      {label}
    </button>
  );
}
