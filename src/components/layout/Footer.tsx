import { CATEGORIES } from '@/data/tools';
import { Link } from '@/lib/router';
import { Logo } from '@/components/layout/Logo';

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/free-movies', label: 'Free Movie Sites' },
];

const LEGAL_LINKS = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms and Conditions' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Free online tools for everyday life. Fast, private and built to work right in your browser.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-900">Tools</h2>
          <ul className="mt-4 space-y-3">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link to={`/tools?category=${category.id}`} className="text-sm text-slate-600 transition-colors hover:text-primary-700">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-900">Company</h2>
          <ul className="mt-4 space-y-3">
            {COMPANY_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-slate-600 transition-colors hover:text-primary-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-navy-900">Legal</h2>
          <ul className="mt-4 space-y-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-slate-600 transition-colors hover:text-primary-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 sm:px-6">
          &copy; {new Date().getFullYear()} HABARI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
