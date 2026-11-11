import { useMemo, useState } from 'react';
import { ArrowUpRight, Clapperboard, Film, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { MOVIE_SITES, type MovieSiteAccess } from '@/data/movieSites';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { PageHeader } from '@/components/PageHeader';
import { AdSlot } from '@/components/AdSlot';

type Filter = 'All services' | MovieSiteAccess;

const FILTERS: Filter[] = ['All services', 'Free to watch', 'Ad-supported', 'Free with account'];

const ACCESS_STYLES: Record<MovieSiteAccess, string> = {
  'Free to watch': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'Free with account': 'border-blue-200 bg-blue-50 text-blue-700',
  'Ad-supported': 'border-amber-200 bg-amber-50 text-amber-700',
};

const CARD_ACCENTS = [
  'from-blue-950 via-indigo-950 to-slate-900',
  'from-slate-900 via-cyan-950 to-blue-950',
  'from-violet-950 via-slate-900 to-indigo-950',
  'from-slate-900 via-rose-950 to-orange-950',
  'from-slate-900 via-sky-950 to-cyan-950',
  'from-emerald-950 via-slate-900 to-teal-950',
];

const FEATURED_MOVIES = [
  { title: 'The Dark Knight', year: '2008', poster: 'https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { title: 'Pulp Fiction', year: '1994', poster: 'https://image.tmdb.org/t/p/w342/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
  { title: 'The Matrix', year: '1999', poster: 'https://image.tmdb.org/t/p/w342/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { title: 'Gladiator', year: '2000', poster: 'https://image.tmdb.org/t/p/w342/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg' },
  { title: 'Parasite', year: '2019', poster: 'https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
  { title: 'The Godfather', year: '1972', poster: 'https://image.tmdb.org/t/p/w342/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
];

export function FreeMoviesPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All services');

  useDocumentMeta({
    title: 'Free Movies Online – Compare Free Streaming Services | HABARI',
    description: 'Compare free movie and TV streaming services, understand ads and account requirements, and find official platforms to explore. Availability varies by country.',
  });

  const filteredSites = useMemo(() => {
    const term = search.trim().toLowerCase();
    return MOVIE_SITES.filter((site) => {
      const matchesFilter = activeFilter === 'All services' || site.access === activeFilter;
      const matchesSearch = !term || [site.name, site.description, site.access].some((value) => value.toLowerCase().includes(term));
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div>
      <PageHeader
        eyebrow="HABARI movie guide"
        title="Find your next movie night."
        description="Compare free movie and TV services, learn how each viewing option works, and visit the platform to check its current catalogue."
      >
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 font-medium">
            <ShieldCheck className="h-4 w-4 text-success-600" aria-hidden="true" />
            Third-party platforms
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 font-medium">
            <Sparkles className="h-4 w-4 text-primary-700" aria-hidden="true" />
            Free services
          </span>
        </div>
      </PageHeader>

      <section className="bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Your next watch starts here</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
              Great stories. More ways to watch. <span className="text-cyan-300">No subscription required.</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
              Explore services that offer free films or channels. Catalogues, viewing rules and availability can change by title, device and country.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900 via-slate-900 to-cyan-950 p-7 shadow-2xl">
            <div className="absolute -right-8 -top-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cyan-200 ring-1 ring-white/15">
                <Clapperboard className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-black text-white">{MOVIE_SITES.length}+</p>
                <p className="text-sm text-slate-300">services to explore</p>
              </div>
            </div>
            <div className="relative mt-6 flex items-center gap-2 text-sm font-medium text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Links to platform websites
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Movie inspiration</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Fresh movie picks</h2>
            </div>
            <p className="text-sm text-slate-400">Six hand-picked classics for your next movie night</p>
          </div>
          <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {FEATURED_MOVIES.map((movie) => (
              <li key={movie.title} className="group">
                <div className="overflow-hidden rounded-xl bg-slate-800 shadow-lg ring-1 ring-white/10">
                  <img
                    src={movie.poster}
                    alt={`${movie.title} movie poster`}
                    width="342"
                    height="513"
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-white">{movie.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{movie.year}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-slate-400">
            Movie poster images are provided by The Movie Database (TMDB). HABARI is not endorsed or certified by TMDB.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Explore platforms</p>
            <h2 className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">Where to watch for free</h2>
            <p className="mt-2 text-slate-600">Compare the access notes, then check the platform itself for current titles, restrictions and terms.</p>
          </div>
          <p className="text-sm font-medium text-slate-500" aria-live="polite">
            Showing {filteredSites.length} of {MOVIE_SITES.length} services
          </p>
        </div>

        <div className="mt-7">
          <label htmlFor="movie-service-search" className="sr-only">Search movie services</label>
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="movie-service-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Tubi, Plex, free with account..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter movie services">
          {FILTERS.map((filter) => {
            const selected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={selected}
                className={selected
                  ? 'rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white shadow-sm'
                  : 'rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary-300 hover:text-primary-700'}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {filteredSites.length > 0 ? (
          <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredSites.map((site) => {
              const originalIndex = MOVIE_SITES.findIndex((item) => item.name === site.name);
              return (
                <li key={site.name} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className={`relative flex min-h-40 items-end overflow-hidden bg-gradient-to-br ${CARD_ACCENTS[originalIndex % CARD_ACCENTS.length]} p-6`}>
                    <div className="absolute -right-5 -top-8 h-36 w-36 rounded-full border-[18px] border-white/5" />
                    <div className="absolute right-6 top-5 text-white/10">
                      <Film className="h-24 w-24" aria-hidden="true" />
                    </div>
                    <div className="relative flex w-full items-center justify-between gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur">
                        <Clapperboard className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold text-white/90">
                        PICK YOUR PLATFORM
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-navy-900">{site.name}</h3>
                      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${ACCESS_STYLES[site.access]}`}>
                        {site.access}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 leading-relaxed text-slate-600">{site.description}</p>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-200"
                    >
                      Visit platform website
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <Film className="mx-auto h-9 w-9 text-slate-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-navy-900">No services found</h3>
            <p className="mt-2 text-sm text-slate-600">Try another search or clear your filters.</p>
            <button
              type="button"
              onClick={() => { setSearch(''); setActiveFilter('All services'); }}
              className="mt-5 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
            >
              Clear search and filters
            </button>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-success-600" aria-hidden="true" />
            <div>
              <h3 className="font-bold text-navy-900">A quick note before you press play</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                HABARI does not host, upload, or stream movies. This page is an independent directory of third-party services, not a guarantee that every title is free, licensed for every location, or currently available. Open the platform directly, confirm the title and viewing terms in your country, and avoid unofficial mirror sites or pages that ask you to install unknown software.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3" aria-labelledby="free-movies-guide">
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Make a smarter choice</p>
            <h2 id="free-movies-guide" className="mt-2 text-2xl font-bold text-navy-900 sm:text-3xl">How to choose a free movie service</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
              “Free” can mean different things. Some services show adverts, some ask you to create an account, and some offer a changing selection of films. A quick check before watching can save time and help you avoid misleading links.
            </p>
          </div>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-bold text-navy-900">1. Check the viewing model</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Look for notes about adverts, free accounts, rentals or paid upgrades. A service may offer both free and paid content, so confirm the price on the title page.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-bold text-navy-900">2. Check your location</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Streaming catalogues and supported devices differ by country. Search the service’s own help pages if a title or app is not available where you live.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="font-bold text-navy-900">3. Use the real website</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Check the web address before signing in. Avoid pop-ups that promise downloads, browser extensions or special players from unfamiliar websites.</p>
          </article>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="free-movies-faq">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Helpful answers</p>
          <h2 id="free-movies-faq" className="mt-2 text-2xl font-bold text-navy-900">Free movie streaming: common questions</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article>
              <h3 className="font-bold text-navy-900">Are all movies on these services free?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">No. A platform may mix free, ad-supported titles with rentals, purchases or subscription content. Check the individual title before you start.</p>
            </article>
            <article>
              <h3 className="font-bold text-navy-900">Do I need to create an account?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">It depends on the service and sometimes the device. Review its current sign-in requirements before sharing personal information.</p>
            </article>
            <article>
              <h3 className="font-bold text-navy-900">Why can’t I find the same film everywhere?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Streaming rights, release windows and regional catalogues change. A film available today may move or disappear later.</p>
            </article>
            <article>
              <h3 className="font-bold text-navy-900">Does HABARI stream or own these movies?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">No. HABARI provides information and links only. Each platform controls its own catalogue, playback, accounts and terms.</p>
            </article>
          </div>
        </section>

        <AdSlot className="mt-12" />
      </section>
    </div>
  );
}
