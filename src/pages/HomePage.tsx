import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Clapperboard, 
  ShieldCheck, 
  Zap, 
  Lock 
} from 'lucide-react';
import ToolCard from '../components/ToolCard';
import { CATEGORIES, QUICK_TOOLS, searchTools } from '../data/tools';

const TRUST_POINTS = [
  { icon: Zap, label: '100% Free & Fast' },
  { icon: Lock, label: 'No Account Required' },
  { icon: ShieldCheck, label: 'Private & Secure' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Simple, Useful Free Online Tools
          </h1>
          <p className="mt-4 text-lg text-slate-300 sm:text-xl">
            Fast, secure, and easy-to-use web applications for everyday calculations, text editing, and utilities.
          </p>

          {/* Search Bar */}
          <div className="relative mt-8 max-w-2xl mx-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Search className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a tool (e.g., Password Generator, Word Counter)..."
              className="w-full rounded-full border-0 bg-white py-4 pl-11 pr-4 text-navy-900 shadow-lg ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
            />
          </div>

          {/* Quick Tools Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-medium text-slate-300">Popular:</span>
            {QUICK_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                to={`/tools/${tool.slug}`}
                className="rounded-full border border-slate-700 bg-navy-800/80 px-3.5 py-1.5 text-sm font-semibold text-slate-200 shadow-sm transition-colors hover:border-primary-400 hover:text-white"
              >
                {tool.name}
              </Link>
            ))}
          </div>

          {/* Trust Points */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.label} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Icon className="h-4 w-4 text-primary-400" aria-hidden="true" />
                  {point.label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="categories-heading">
        <div>
          <h2 id="categories-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Browse by category
          </h2>
          <p className="mt-2 text-slate-600">Find the right tool for the job.</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const count = searchTools('', category.id).length;
            return (
              <li key={category.id}>
                <Link
                  to={`/tools?category=${category.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-5 text-lg font-bold text-navy-900">{category.name}</span>
                  <span className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{category.description}</span>
                  <span className="mt-5 flex items-center justify-between text-sm font-semibold text-primary-700">
                    {count} {count === 1 ? 'tool' : 'tools'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* About Section */}
      <section className="border-y border-slate-200 bg-slate-100" aria-labelledby="about-habari-heading">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 id="about-habari-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Welcome to HABARI – Free Online Tools
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            HABARI is a collection of simple and useful free online tools designed to make everyday tasks easier.
            Whether you need to calculate numbers, edit text, manage dates and time, or generate a secure password,
            you can find a helpful tool here.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Our tools are designed to be easy to use, work directly in your browser, and help you save time without
            creating an account. Explore our collection and find the right tool for your needs.
          </p>
          <p className="mt-4 text-sm font-semibold text-primary-700">
            Simple. Useful. Free.
          </p>
        </div>
      </section>

      {/* All Tools Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="all-tools-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="all-tools-heading" className="text-2xl font-bold text-navy-900 sm:text-3xl">
              All free tools
            </h2>
            <p className="mt-2 text-slate-600">Every tool works instantly, with no account required.</p>
          </div>
          <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800">
            View all tools
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {searchTools(searchQuery).map((tool) => (
            <li key={tool.slug}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </section>

      {/* Movies Banner Section */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="movies-heading">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div className="flex items-start gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-100">
              <Clapperboard className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="movies-heading" className="text-xl font-bold sm:text-2xl">
                Looking for something to watch?
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-primary-50">
                Browse our curated list of legal free movie sites, from public domain classics to free streaming services.
              </p>
            </div>
          </div>
          <Link
            to="/free-movies"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-primary-50"
          >
            Explore free movies
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
