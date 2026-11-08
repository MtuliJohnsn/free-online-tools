import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

const NAVIGATE_EVENT = 'habari:navigate';

export interface CurrentLocation {
  pathname: string;
  search: string;
}

function readLocation(): CurrentLocation {
  return { pathname: window.location.pathname, search: window.location.search };
}

export function useLocation(): CurrentLocation {
  const [location, setLocation] = useState<CurrentLocation>(readLocation);

  useEffect(() => {
    const update = () => setLocation(readLocation());
    window.addEventListener('popstate', update);
    window.addEventListener(NAVIGATE_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);

  return location;
}

export function navigate(to: string): void {
  const target = new URL(to, window.location.origin);
  const current = window.location.pathname + window.location.search;
  if (target.pathname + target.search === current) {
    window.scrollTo({ top: 0 });
    return;
  }
  window.history.pushState({}, '', target.pathname + target.search);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo({ top: 0 });
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
}

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
