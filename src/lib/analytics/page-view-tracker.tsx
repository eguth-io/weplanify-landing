"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { trackEvent } from "@/lib/tracking";

function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const initialized = useRef(false);

  useEffect(() => {
    // Skip the first effect: GTM/GA4 already fire a page_view on initial
    // page load. We only emit for client-side (SPA) navigations to avoid
    // double-counting the entry view.
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    const search = searchParams?.toString();
    trackEvent("page_view", {
      path: pathname ?? "/",
      locale,
      search: search && search.length > 0 ? search : undefined,
    });
  }, [pathname, searchParams, locale]);

  return null;
}

/**
 * Emits a `page_view` event on every SPA navigation under the App Router.
 * Mounts once near the root layout. Wrapped in Suspense because
 * `useSearchParams()` requires it during static rendering.
 */
export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}
