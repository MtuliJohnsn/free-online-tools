import { useEffect } from 'react';
import { ADSENSE_AD_SLOT, ADSENSE_CLIENT_ID } from '@/lib/ads';

const SCRIPT_ID = 'adsense-script';

type AdsWindow = Window & { adsbygoogle?: unknown[] };

export function AdSlot({ className = '' }: { className?: string }) {
  const enabled = Boolean(ADSENSE_CLIENT_ID && ADSENSE_AD_SLOT);

  useEffect(() => {
    if (!enabled) return;

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      document.head.appendChild(script);
    }

    const adsWindow = window as AdsWindow;
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
    adsWindow.adsbygoogle.push({});
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside aria-label="Advertisement" className={className}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={ADSENSE_AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
