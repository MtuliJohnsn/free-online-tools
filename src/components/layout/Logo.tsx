import { Layers } from 'lucide-react';
import { Link } from '@/lib/router';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <Link to="/" onClick={onClick} className="group inline-flex items-center gap-2.5" aria-label="HABARI home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <Layers className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-xl font-bold tracking-wider text-navy-900">HABARI</span>
    </Link>
  );
}
