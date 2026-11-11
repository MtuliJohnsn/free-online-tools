import { ArrowRight } from 'lucide-react';
import type { ToolDefinition } from '@/data/tools';
import { categoryName } from '@/data/tools';
import { Link } from '@/lib/router';

const CATEGORY_STYLES: Record<ToolDefinition['category'], { icon: string; label: string; border: string }> = {
  calculators: { icon: 'from-violet-500 to-fuchsia-600', label: 'bg-violet-50 text-violet-700', border: 'hover:border-violet-300' },
  text: { icon: 'from-pink-500 to-rose-500', label: 'bg-pink-50 text-pink-700', border: 'hover:border-pink-300' },
  datetime: { icon: 'from-sky-500 to-cyan-500', label: 'bg-sky-50 text-sky-700', border: 'hover:border-sky-300' },
  productivity: { icon: 'from-emerald-500 to-teal-500', label: 'bg-emerald-50 text-emerald-700', border: 'hover:border-emerald-300' },
  developer: { icon: 'from-indigo-500 to-blue-600', label: 'bg-indigo-50 text-indigo-700', border: 'hover:border-indigo-300' },
};

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon;
  const style = CATEGORY_STYLES[tool.category];
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${style.border}`}
    >
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.icon}`} aria-hidden="true" />
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${style.icon} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className={`mt-5 w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${style.label}`}>{categoryName(tool.category)}</p>
      <h3 className="mt-3 text-lg font-bold text-navy-900">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{tool.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
