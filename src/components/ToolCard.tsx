import { ArrowRight } from 'lucide-react';
import type { ToolDefinition } from '@/data/tools';
import { categoryName } from '@/data/tools';
import { Link } from '@/lib/router';

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon;
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary-700">{categoryName(tool.category)}</p>
      <h3 className="mt-2 text-lg font-bold text-navy-900">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{tool.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
