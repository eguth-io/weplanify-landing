"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

function localeFromPath(pathname: string | null): string {
  if (!pathname) return "en";
  const seg = pathname.split("/")[1];
  return seg === "fr" ? "fr" : "en";
}

function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
      locale: localeFromPath(pathname),
      search: search && search.length > 0 ? search : undefined,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Emits a `page_view` event on every SPA navigation under the App Router.
 * Mounts once near the root layout. Wrapped in Suspense because
 * `useSearchParams()` requires it during static rendering.
 *
 * Locale is derived from the URL pathname segment instead of `useLocale()`
 * from next-intl: the tracker is mounted as a sibling of the locale layout's
 * `<NextIntlClientProvider>`, not a descendant, so the next-intl context
 * isn't available here. Reading the segment keeps the component
 * self-sufficient and avoids a render crash if it's mounted outside the
 * provider.
 */
export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}
