import type { AbstractIntlMessages } from "next-intl";

/**
 * Namespaces handed to NextIntlClientProvider.
 *
 * The root locale layout used to pass the whole `getMessages()` catalog, which
 * serialised all 78 namespaces into the HTML of every page — ~390 KB per page,
 * most of it for components that page never renders.
 *
 * Only namespaces read from inside the client boundary belong here. Server
 * Components resolve `useTranslations` against the server config and need
 * nothing from the provider, so adding them back is pure page weight.
 *
 * The client boundary is every file carrying "use client" *plus* everything they
 * import transitively — a module without the directive still ships to the
 * browser once a client component imports it. `scripts/check-client-namespaces.mjs`
 * walks that graph and fails the build if this list drifts, so keep it sorted and
 * let the checker tell you what belongs.
 */
export const clientNamespaces = [
  "animations",
  "bigFeaturesSection",
  "budgetFeature",
  "collaborationFeature",
  "cookieConsent",
  "ctaBanner",
  "exploreFeature",
  "faqSupport",
  "featureJsonLd",
  "footer",
  "heroPitchWall",
  "heroSearch",
  "inlinePitch",
  "instagramSlider",
  "itineraryFeature",
  "memoriesFeature",
  "nav",
  "packingFeature",
  "planningFeature",
  "pollsFeature",
  "readyBanner",
  "relatedFeatures",
  "stackingCards",
  "testimonialCarousel",
  "transportFeature",
  "travelSteps",
] as const;

/** Narrows a full message catalog down to what the client actually reads. */
export function pickClientMessages(
  messages: AbstractIntlMessages
): AbstractIntlMessages {
  const picked: Record<string, unknown> = {};

  for (const namespace of clientNamespaces) {
    if (namespace in messages) {
      picked[namespace] = messages[namespace];
    }
  }

  return picked as AbstractIntlMessages;
}
