"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

type ConsentState = "pending" | "granted" | "denied";

const CONSENT_KEY = "weplanify_consent";
const CONSENT_VERSION = "1"; // bump this to re-ask consent if policy changes

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.state as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(state: ConsentState) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ state, version: CONSENT_VERSION, timestamp: Date.now() })
  );
}

/**
 * Push Google Consent Mode v2 signals to dataLayer.
 * Called BEFORE GTM loads (default state) and after user choice (update).
 */
function pushConsentSignal(state: ConsentState) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];

  const granted = state === "granted";

  // Update consent state
  w.dataLayer.push({
    event: "consent_update",
    consent_analytics: granted ? "granted" : "denied",
    consent_ads: granted ? "granted" : "denied",
  });

  // Google Consent Mode v2 format
  const gtag = (...args: unknown[]) => {
    (w.dataLayer as unknown[]).push(args);
  };

  gtag("consent", state === "pending" ? "default" : "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    functionality_storage: "granted", // always — needed for the app to work
    personalization_storage: granted ? "granted" : "denied",
    security_storage: "granted", // always
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [, setConsent] = useState<ConsentState>("pending");
  const pathname = usePathname();
  const locale = pathname?.startsWith("/fr") ? "fr" : "en";

  // On mount: check stored consent, set default consent mode
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      pushConsentSignal(stored);
      // Dispatch event so Analytics component knows to load scripts
      if (stored === "granted") {
        window.dispatchEvent(new Event("consent_granted"));
      }
    } else {
      // First visit — push default (denied) consent
      pushConsentSignal("pending");
      setVisible(true);
    }
  }, []);

  const handleAccept = useCallback(() => {
    setConsent("granted");
    storeConsent("granted");
    pushConsentSignal("granted");
    window.dispatchEvent(new Event("consent_granted"));
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    setConsent("denied");
    storeConsent("denied");
    pushConsentSignal("denied");
    setVisible(false);
  }, []);

  if (!visible) return null;

  const t = locale === "fr"
    ? {
        text: "Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience. Aucune donnée n'est vendue à des tiers.",
        accept: "Accepter",
        decline: "Refuser",
        more: "En savoir plus",
      }
    : {
        text: "We use cookies to analyze traffic and improve your experience. No data is sold to third parties.",
        accept: "Accept",
        decline: "Decline",
        more: "Learn more",
      };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 lg:px-6 lg:pb-5">
      <div className="max-w-[900px] mx-auto bg-[#001E13] rounded-full px-5 py-3 lg:px-6 lg:py-3 shadow-2xl border border-[#FFFBF5]/10 flex items-center justify-between gap-4">
        <p className="text-[#FFFBF5]/70 font-karla text-xs lg:text-sm leading-snug flex-1 min-w-0">
          {t.text}
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="text-[#FFFBF5]/50 font-karla text-xs lg:text-sm px-3 py-1.5 rounded-full hover:text-[#FFFBF5]/80 transition-colors"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="bg-[#F6391A] text-[#FFFBF5] font-karla font-bold text-xs lg:text-sm px-4 py-1.5 rounded-full hover:bg-[#d42d10] transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
