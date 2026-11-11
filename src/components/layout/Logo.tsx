import { Layers } from 'lucide-react';
import { Link } from '@/lib/router';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5"
      aria-label="HABARI home"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-600 text-white shadow-lg shadow-fuchsia-950/30 ring-1 ring-white/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <Layers className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-xl font-extrabold tracking-[0.16em] text-transparent drop-shadow-sm sm:text-2xl">
        HABARI
      </span>
    </Link>
  );
}
