/**
 * Push a custom event to the GTM dataLayer.
 * Safe to call server-side (no-ops silently).
 */
export function trackEvent(
  event: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
