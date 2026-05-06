import type { EventCatalog, EventName } from "./analytics/events";

/**
 * Push a custom event to the GTM dataLayer.
 *
 * Typed against `EventCatalog` so call sites can't pass an unknown event
 * name or a wrong payload shape. Server-side calls are silently no-ops.
 *
 * Consent is enforced by Google Consent Mode v2 inside GTM — we always
 * push to dataLayer; GTM withholds tag firing until consent is granted.
 */
export function trackEvent<E extends EventName>(
  event: E,
  ...rest: EventCatalog[E] extends void
    ? []
    : [payload: EventCatalog[E]]
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...((rest[0] as Record<string, unknown> | undefined) ?? {}) });
}

export type { EventCatalog, EventName } from "./analytics/events";
