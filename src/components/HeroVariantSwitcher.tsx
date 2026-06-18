'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, Search } from 'lucide-react';

/**
 * DEV-ONLY floating control to preview the two home hero variants locally.
 * Renders nothing in production builds. Variant is driven by the `?hero=`
 * query param and read server-side in the page — this only flips the param.
 */
export default function HeroVariantSwitcher({ current }: { current: 'ai' | 'search' }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function go(variant: 'ai' | 'search') {
    const next = new URLSearchParams(params.toString());
    next.set('hero', variant);
    router.push(`${pathname}?${next.toString()}`);
  }

  const base =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors';

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-1 rounded-full bg-[#001E13] p-1 shadow-2xl ring-1 ring-white/10">
      <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-white/40">A/B</span>
      <button
        type="button"
        onClick={() => go('ai')}
        className={`${base} ${current === 'ai' ? 'bg-[#EEF899] text-[#001E13]' : 'text-white/70 hover:text-white'}`}
      >
        <Sparkles className="h-3.5 w-3.5" /> AI flow
      </button>
      <button
        type="button"
        onClick={() => go('search')}
        className={`${base} ${current === 'search' ? 'bg-[#EEF899] text-[#001E13]' : 'text-white/70 hover:text-white'}`}
      >
        <Search className="h-3.5 w-3.5" /> Search
      </button>
    </div>
  );
}
