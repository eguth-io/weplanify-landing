"use client";

import { useEffect } from "react";

// OpenReplay session replay for the landing site.
//
// Privacy: session replay records user interactions, so it only starts AFTER
// the visitor has granted consent. It hooks into the same consent flow as GTM
// (CookieConsent stores `weplanify_consent` and dispatches a `consent_granted`
// window event). Input fields are obscured (emails/numbers/dates) by default.
//
// Cloud setup needs only the project key; `ingestPoint` is for self-hosted.

// Hardcoded fallback so replay works without setting the env var; env still wins if present.
const PROJECT_KEY = process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY ?? "FYlS2xW7GGUyPQYqzRpP";
const INGEST_POINT = process.env.NEXT_PUBLIC_OPENREPLAY_INGEST_POINT; // optional, self-hosted only

// Must match CookieConsent.tsx.
const CONSENT_KEY = "weplanify_consent";
const CONSENT_VERSION = "1";

function hasGrantedConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed.version === CONSENT_VERSION && parsed.state === "granted";
  } catch {
    return false;
  }
}

// Module-level guard so the tracker is started at most once per page load.
let started = false;

async function startTracker() {
  if (started || !PROJECT_KEY || typeof window === "undefined") return;
  started = true;

  // Lazy-imported so the ~100KB tracker never ships to visitors who don't consent.
  const { default: Tracker } = await import("@openreplay/tracker");
  const tracker = new Tracker({
    projectKey: PROJECT_KEY,
    ...(INGEST_POINT ? { ingestPoint: INGEST_POINT } : {}),
    obscureInputEmails: true,
    obscureInputNumbers: true,
    obscureInputDates: true,
    respectDoNotTrack: true,
  });

  await tracker.start();
  // Lets you filter landing sessions in a shared OpenReplay project.
  // Register a "surface" metadata key in the project settings to surface it.
  tracker.setMetadata("surface", "landing");
}

export default function OpenReplay() {
  useEffect(() => {
    if (!PROJECT_KEY) return;

    // Start immediately if consent was already granted in a previous visit…
    if (hasGrantedConsent()) {
      void startTracker();
      return;
    }
    // …otherwise wait for the user to accept in the cookie banner.
    const onGranted = () => void startTracker();
    window.addEventListener("consent_granted", onGranted);
    return () => window.removeEventListener("consent_granted", onGranted);
  }, []);

  return null;
}
