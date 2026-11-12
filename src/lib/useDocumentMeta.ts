import { useEffect } from 'react';

const SITE_NAME = 'HABARI';
const CANONICAL_ORIGIN = 'https://habari.uk';

interface DocumentMeta {
  title: string;
  description: string;
}

function setMetaContent(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function useDocumentMeta({ title, description }: DocumentMeta): void {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;
    setMetaContent('meta[name="description"]', 'name', 'description', description);
    setMetaContent('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaContent('meta[property="og:description"]', 'property', 'og:description', description);

    // Always publish the preferred HTTPS URL, regardless of whether a visitor
    // or crawler arrived through an HTTP or alternate-host URL.
    const canonicalUrl = new URL(window.location.pathname, CANONICAL_ORIGIN).toString();
    setMetaContent('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description]);
}
