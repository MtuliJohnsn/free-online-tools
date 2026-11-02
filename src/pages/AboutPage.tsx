import { ArrowRight, Heart, Lock, Zap } from 'lucide-react';
import { Link } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { PageHeader } from '@/components/PageHeader';

const VALUES = [
  {
    icon: Heart,
    title: 'Free for everyone',
    text: 'Every tool on HABARI is free to use. No subscriptions, no paywalls and no hidden limits.',
  },
  {
    icon: Lock,
    title: 'Private by design',
    text: 'Your text and numbers are processed in your browser. Nothing you type into a tool is uploaded to us.',
  },
  {
    icon: Zap,
    title: 'Fast and simple',
    text: 'Each tool opens instantly and does one job well, so you can get your answer in seconds.',
  },
];

export function AboutPage() {
  useDocumentMeta({
    title: 'About Us',
    description: 'Learn about HABARI, a free online tools website built to make everyday tasks quicker and easier.',
  });

  return (
    <div>
      <PageHeader
        eyebrow="About us"
        title="Simple tools for everyday life"
        description="HABARI is a free collection of practical online tools. We build the calculators, converters and helpers that people reach for every day, and we keep them fast, accurate and easy to use."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-slate-700">
          <h2 className="text-2xl font-bold text-navy-900">Why HABARI?</h2>
          <p>
            In Swahili, "habari" means news and is also the everyday greeting "how are you?". We chose the name because our goal is simple: give people
            helpful information and a friendly experience, without barriers.
          </p>
          <p>
            Many free tools are slow, cluttered or hidden behind sign-ups. HABARI is different. You open a tool, you use it, and you get on with your day.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <article key={value.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{value.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Ready to get started?</h2>
            <p className="mt-2 text-primary-50">Explore all ten free tools, or tell us what you would like us to build next.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/tools" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-primary-50">
              Explore tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="inline-flex items-center rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
