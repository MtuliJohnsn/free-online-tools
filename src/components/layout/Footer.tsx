import { CATEGORIES } from '@/data/tools';
import { Link } from '@/lib/router';
import { Logo } from '@/components/layout/Logo';

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/ai-tools', label: 'AI Tools Library' },
  { to: '/free-movies', label: 'Free Movie Sites' },
  { to: '/contact', label: 'Contact Us' },
];

const LEGAL_LINKS = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms and Conditions' },
];

const linkClass = "text-sm text-violet-100/65 transition-colors hover:text-fuchsia-200";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#170c28] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="[&_a]:text-white [&_svg]:text-fuchsia-200">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-violet-100/65">
            Useful tools, inspiring discoveries and helpful resources — all in one place.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-fuchsia-200">Tools</h2>
          <ul className="mt-5 space-y-3">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link to={`/tools?category=${category.id}`} className={linkClass}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-fuchsia-200">Explore HABARI</h2>
          <ul className="mt-5 space-y-3">
            {COMPANY_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-fuchsia-200">Legal</h2>
          <ul className="mt-5 space-y-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs tracking-wide text-violet-100/45 sm:px-6">
          © 2026 HABARI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
