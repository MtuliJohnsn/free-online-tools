import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from '@/lib/router';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found',
    description: 'The page you are looking for does not exist. Browse HABARI free online tools instead.',
  });

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 animate-fade-in-up">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary-700">Error 404</p>
      <h1 className="mt-3 text-3xl font-bold text-navy-900 sm:text-4xl">We could not find that page</h1>
      <p className="mt-4 text-lg text-slate-600">The link may be broken or the page may have moved. Try one of our free tools instead.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <Link to="/tools" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-primary-500 hover:text-primary-700">
          Browse all tools
        </Link>
      </div>
    </section>
  );
}
