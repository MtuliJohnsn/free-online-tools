import { useMemo, useState } from 'react';
import {
  ArrowUpRight, Bot, BookOpen, BriefcaseBusiness, Code2, Image, Mic2, Search,
  Sparkles, Video, WandSparkles, PenLine, LayoutGrid, Check, Star,
} from 'lucide-react';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

type Category =
  | 'All tools'
  | 'AI assistants'
  | 'Research & learning'
  | 'Images & design'
  | 'Video'
  | 'Writing'
  | 'Voice & music'
  | 'Coding'
  | 'Productivity';

type AITool = {
  name: string;
  category: Exclude<Category, 'All tools'>;
  description: string;
  bestFor: string;
  access: string;
  url: string;
  featured?: boolean;
};

const CATEGORIES: { name: Category; icon: typeof Bot }[] = [
  { name: 'All tools', icon: LayoutGrid },
  { name: 'AI assistants', icon: Bot },
  { name: 'Research & learning', icon: BookOpen },
  { name: 'Images & design', icon: Image },
  { name: 'Video', icon: Video },
  { name: 'Writing', icon: PenLine },
  { name: 'Voice & music', icon: Mic2 },
  { name: 'Coding', icon: Code2 },
  { name: 'Productivity', icon: BriefcaseBusiness },
];

const TOOLS: AITool[] = [
  { name: 'ChatGPT', category: 'AI assistants', description: 'Ask questions, write, brainstorm, analyze files and create images with an all-purpose AI assistant.', bestFor: 'Everyday AI help', access: 'Free plan available', url: 'https://chatgpt.com', featured: true },
  { name: 'Google Gemini', category: 'AI assistants', description: 'Get help with ideas, questions, writing and tasks across Google services.', bestFor: 'Google users', access: 'Free plan available', url: 'https://gemini.google.com', featured: true },
  { name: 'Claude', category: 'AI assistants', description: 'Work through complex questions, long documents, thoughtful writing and coding tasks.', bestFor: 'Writing & analysis', access: 'Free plan available', url: 'https://claude.ai' },
  { name: 'Perplexity', category: 'Research & learning', description: 'Research topics with answers that include links to the sources used.', bestFor: 'Web research', access: 'Free plan available', url: 'https://www.perplexity.ai', featured: true },
  { name: 'NotebookLM', category: 'Research & learning', description: 'Ask questions about your own documents and organize research around your sources.', bestFor: 'Your documents', access: 'Free access available', url: 'https://notebooklm.google.com' },
  { name: 'Canva', category: 'Images & design', description: 'Create social posts, presentations, posters and designs with helpful AI features.', bestFor: 'Easy graphic design', access: 'Free plan available', url: 'https://www.canva.com' },
  { name: 'Adobe Firefly', category: 'Images & design', description: 'Generate and edit images and creative assets using Adobe’s generative AI tools.', bestFor: 'Creative image generation', access: 'Free credits available', url: 'https://firefly.adobe.com' },
  { name: 'Leonardo AI', category: 'Images & design', description: 'Create AI images and visual concepts from text prompts.', bestFor: 'AI artwork', access: 'Free plan available', url: 'https://leonardo.ai' },
  { name: 'CapCut', category: 'Video', description: 'Edit videos for social media with templates, captions and AI-assisted features.', bestFor: 'Social video editing', access: 'Free features available', url: 'https://www.capcut.com' },
  { name: 'Runway', category: 'Video', description: 'Explore AI tools for generating and editing video clips and visual effects.', bestFor: 'AI video creation', access: 'Limited free credits', url: 'https://runwayml.com' },
  { name: 'Grammarly', category: 'Writing', description: 'Improve clarity, tone, grammar and readability in everyday writing.', bestFor: 'Polishing writing', access: 'Free plan available', url: 'https://www.grammarly.com' },
  { name: 'DeepL Write', category: 'Writing', description: 'Rewrite sentences and improve wording, tone and fluency.', bestFor: 'Rewriting & editing', access: 'Free use available', url: 'https://www.deepl.com/write' },
  { name: 'ElevenLabs', category: 'Voice & music', description: 'Create natural-sounding AI voices and convert text into speech.', bestFor: 'AI voiceovers', access: 'Free plan available', url: 'https://elevenlabs.io' },
  { name: 'Suno', category: 'Voice & music', description: 'Create songs and music from written prompts and ideas.', bestFor: 'AI music creation', access: 'Free plan available', url: 'https://suno.com' },
  { name: 'GitHub Copilot', category: 'Coding', description: 'Get coding suggestions and AI help directly inside supported code editors.', bestFor: 'Code suggestions', access: 'Free plan available', url: 'https://github.com/features/copilot' },
  { name: 'Cursor', category: 'Coding', description: 'Use an AI-powered code editor to understand, write and update software.', bestFor: 'AI-assisted coding', access: 'Free tier available', url: 'https://cursor.com' },
  { name: 'Notion AI', category: 'Productivity', description: 'Summarize notes, organize information and help move work forward in Notion.', bestFor: 'Notes & workspaces', access: 'AI features may require a paid plan', url: 'https://www.notion.com/product/ai' },
  { name: 'Zapier', category: 'Productivity', description: 'Connect apps and automate repetitive workflows, with AI features available.', bestFor: 'Workflow automation', access: 'Free plan available', url: 'https://zapier.com' },
];

export function AIToolsPage() {
  useDocumentMeta({
    title: 'Best AI Tools Directory',
    description: 'Discover useful AI tools for chat, research, images, video, writing, voice, coding and productivity. Browse by category on HABARI.',
  });

  const [category, setCategory] = useState<Category>('All tools');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory = category === 'All tools' || tool.category === category;
      const matchesSearch = !term || [tool.name, tool.category, tool.description, tool.bestFor].join(' ').toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative isolate overflow-hidden bg-[#10172d] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.42),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(14,165,233,0.28),transparent_32%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-indigo-100">
              <Sparkles className="h-4 w-4" /> HABARI AI DIRECTORY
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find the right AI tool for <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">what you want to do.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore useful AI websites for work, creativity, learning and everyday life. Pick a category, compare what each tool does, and visit its official website.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#browse-ai-tools" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-cyan-100">
                Explore AI tools <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-slate-200">
                {TOOLS.length} hand-picked tools
              </span>
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-3">
            {[
              { icon: Bot, label: 'Ask & learn', color: 'from-violet-500/30 to-indigo-500/10' },
              { icon: Image, label: 'Create images', color: 'from-pink-500/30 to-rose-500/10' },
              { icon: Video, label: 'Make videos', color: 'from-cyan-500/30 to-blue-500/10' },
              { icon: Code2, label: 'Build & code', color: 'from-emerald-500/30 to-teal-500/10' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className={`flex min-h-32 flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-5 shadow-xl shadow-black/10 backdrop-blur`}>
                <Icon className="h-7 w-7 text-white" />
                <span className="font-semibold text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="browse-ai-tools" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-700">Explore & discover</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Browse AI tools</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Find a tool by the task you need help with. Start with free options and check each provider for current limits.</p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200 sm:self-auto">
            <WandSparkles className="h-4 w-4 text-violet-600" /> Curated directory
          </div>
        </div>

        <div className="mt-8 max-w-xl">
          <label htmlFor="ai-tool-search" className="sr-only">Search AI tools</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input id="ai-tool-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ChatGPT, images, writing, coding..." className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:ring-4 focus:ring-primary-100" />
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Filter AI tools by category">
          {CATEGORIES.map(({ name, icon: Icon }) => (
            <button key={name} type="button" onClick={() => setCategory(name)} aria-pressed={category === name} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${category === name ? 'bg-slate-950 text-white shadow-md' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'}`}>
              <Icon className="h-4 w-4" /> {name}
            </button>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-600" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'tool' : 'tools'} found</p>
          {(query || category !== 'All tools') && <button type="button" onClick={() => { setQuery(''); setCategory('All tools'); }} className="text-sm font-bold text-primary-700 hover:text-primary-900">Clear filters</button>}
        </div>

        {filtered.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <article key={tool.name} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-slate-200/70">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-cyan-100 text-primary-800">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  {tool.featured && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"><Star className="h-3 w-3 fill-current" /> Popular pick</span>}
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-primary-700">{tool.category}</p>
                <h3 className="mt-2 text-xl font-extrabold text-slate-950">{tool.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{tool.description}</p>
                <div className="mt-5 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Best for</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">{tool.bestFor}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Check className="h-4 w-4" /> {tool.access}
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200">
                  Visit official website <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-3 text-lg font-bold text-slate-900">No matching AI tools</h3>
            <p className="mt-1 text-sm text-slate-600">Try another search or choose a different category.</p>
          </div>
        )}
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl bg-slate-950 px-6 py-7 text-white sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold">A quick note about free plans</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Many AI websites offer free access with limits on messages, credits or features. Availability and pricing can change, so always check the provider’s official page before signing up or paying.</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-cyan-200"><Check className="h-4 w-4" /> Official links only</span>
            </div>
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-slate-500">HABARI is an independent directory and is not affiliated with the listed AI providers. Tool names and trademarks belong to their respective owners.</p>
        </div>
      </section>
    </div>
  );
}
