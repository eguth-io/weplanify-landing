"use client";

import { useEffect, useState } from "react";

/**
 * Shared "immersive mode" flag, driven by the full-screen slider section
 * (BigFeaturesSection). When the immersive slider fills the screen, it sets
 * `data-immersive="true"` on <html>; the nav and the floating CTA read this to
 * retract / hide themselves so nothing overlaps the animation.
 *
 * Using an attribute on <html> avoids prop drilling and works regardless of how
 * far apart the components sit in the tree.
 */
const ATTR = "data-immersive";

/** Set/clear the flag. Called by the immersive section as the user scrolls. */
export function setImmersiveMode(active: boolean) {
  if (typeof document === "undefined") return;
  if (active) {
    document.documentElement.setAttribute(ATTR, "true");
  } else {
    document.documentElement.removeAttribute(ATTR);
  }
}

/** Read the flag reactively (re-renders when it toggles). */
export function useImmersiveMode(): boolean {
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    const read = () =>
      setImmersive(document.documentElement.getAttribute(ATTR) === "true");
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [ATTR],
    });
    return () => observer.disconnect();
  }, []);

  return immersive;
}
