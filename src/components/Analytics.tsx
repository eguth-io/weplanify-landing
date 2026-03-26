"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const GTM_ID = "GTM-MJHJL7Q2";

/**
 * Analytics component — loads GTM only after cookie consent is granted.
 * Listens for "consent_granted" event dispatched by CookieConsent component.
 * Also checks localStorage on mount in case consent was already given in a previous session.
 */
export function Analytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if consent was already granted in a previous session
    try {
      const stored = localStorage.getItem("weplanify_consent");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.state === "granted") {
          setConsentGiven(true);
          return;
        }
      }
    } catch {
      // ignore
    }

    // Listen for consent event from CookieConsent component
    const handleConsent = () => setConsentGiven(true);
    window.addEventListener("consent_granted", handleConsent);
    return () => window.removeEventListener("consent_granted", handleConsent);
  }, []);

  if (!consentGiven) {
    // Even without consent, initialize dataLayer + consent mode defaults
    return (
      <Script id="consent-defaults" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'granted',
            'personalization_storage': 'denied',
            'security_storage': 'granted',
            'wait_for_update': 500
          });
        `}
      </Script>
    );
  }

  return (
    <>
      {/* Consent defaults (must be before GTM) */}
      <Script id="consent-defaults" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted',
            'functionality_storage': 'granted',
            'personalization_storage': 'granted',
            'security_storage': 'granted'
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
