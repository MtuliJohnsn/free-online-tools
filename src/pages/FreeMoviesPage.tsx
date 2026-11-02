import { ExternalLink, Film } from 'lucide-react';
import { MOVIE_SITES, type MovieSiteAccess } from '@/data/movieSites';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { PageHeader } from '@/components/PageHeader';

const ACCESS_STYLES: Record<MovieSiteAccess, string> = {
  'Free to watch': 'bg-success-50 text-success-700',
  'Free with account': 'bg-primary-50 text-primary-700',
  'Ad-supported': 'bg-warning-50 text-warning-700',
};

export function FreeMoviesPage() {
  useDocumentMeta({
    title: 'Free Movie Sites',
    description: 'A curated list of legal free movie streaming sites where you can watch films at no cost.',
  });

  return (
    <div>
      <PageHeader
        eyebrow="Free movies"
        title="Free movie sites to watch legally"
        description="A curated list of legitimate services that stream films for free. Catalogs change often, and some titles may not be available in every country."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MOVIE_SITES.map((site) => (
            <li key={site.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Film className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ACCESS_STYLES[site.access]}`}>{site.access}</span>
              </div>
              <h2 className="mt-5 text-lg font-bold text-navy-900">{site.name}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-slate-600">{site.description}</p>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                Visit {site.name}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-slate-600">
          HABARI does not host or stream these movies. We only link to the official websites of the services listed. Please check each
          site's terms before you sign up.
        </p>
      </section>
    </div>
  );
}
