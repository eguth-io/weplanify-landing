/**
 * Typed catalog of every custom analytics event the landing emits.
 *
 * Keep this map in sync with the GTM container — when adding a new event,
 * also add a tag/trigger in GTM and (where it makes sense) register the
 * params as Custom Definitions in GA4 so they're queryable in reports.
 *
 * Niveau 2 will introduce a unified form schema (form_start / form_submit /
 * generate_lead) — the legacy `*_form_submit` and `newsletter_subscribe`
 * events live here for now to avoid breaking GTM tags configured against
 * the current names.
 */

type FormStatus = "success" | "error";

export type EventCatalog = {
  // Page views fired client-side on SPA navigation by PageViewTracker.
  // The very first page view is left to GTM/GA4 native to avoid double counting.
  page_view: { path: string; locale: string; search?: string };

  // Generic CTAs (sticky, hero, etc.) — `location` discriminates the surface.
  cta_click: { location: string; label: string };

  // Pitch flow — hero
  hero_pitch_submit: { length: number; locale: string };
  hero_pitch_needs_clarification: { locale: string };
  hero_pitch_success: { destination: string };
  hero_pitch_cta_click: { destination: string };

  // Pitch flow — inline (in-page sections)
  inline_pitch_submit: { location: string; length: number; locale: string };
  inline_pitch_success: { location: string; destination: string };
  inline_pitch_cta_click: { location: string; destination: string };

  // Content engagement
  faq_toggle: { question: string };
  related_feature_click: { from: string; to: string };
  blog_article_click: { title: string };

  // Forms (legacy names — to be unified in Niveau 2)
  contact_form_submit: { status: FormStatus };
  launch_notification_submit: { status: FormStatus };
  partnership_form_submit: { status: FormStatus };
  // Newsletter intentionally carries no payload — never send the email
  // (PII leak into dataLayer / GTM / GA4).
  newsletter_subscribe: void;
};

export type EventName = keyof EventCatalog;
