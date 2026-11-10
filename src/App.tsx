import { lazy, Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { findTool } from '@/data/tools';
import { useLocation } from '@/lib/router';
import { HomePage } from '@/pages/HomePage';

const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const AIToolsPage = lazy(() => import('@/pages/AIToolsPage').then((m) => ({ default: m.AIToolsPage })));
const AllToolsPage = lazy(() => import('@/pages/AllToolsPage').then((m) => ({ default: m.AllToolsPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const FreeMoviesPage = lazy(() => import('@/pages/FreeMoviesPage').then((m) => ({ default: m.FreeMoviesPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const ToolPage = lazy(() => import('@/pages/ToolPage').then((m) => ({ default: m.ToolPage })));

function renderRoute(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return <HomePage />;
  if (segments[0] === 'tools' && segments.length === 1) return <AllToolsPage />;
  if (segments[0] === 'tools' && segments.length === 2) {
    const tool = findTool(segments[1]);
    return tool ? <ToolPage key={tool.slug} tool={tool} /> : <NotFoundPage />;
  }
  if (segments.length === 1) {
    switch (segments[0]) {
      case 'about':
        return <AboutPage />;
      case 'ai-tools':
        return <AIToolsPage />;
      case 'contact':
        return <ContactPage />;
      case 'free-movies':
        return <FreeMoviesPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
    }
  }
  return <NotFoundPage />;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <Layout>
      <Suspense fallback={<div role="status" className="min-h-[60vh]" aria-label="Loading page" />}>{renderRoute(pathname)}</Suspense>
    </Layout>
  );
}
