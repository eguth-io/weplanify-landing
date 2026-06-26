"use client";

import { useEffect } from "react";

/**
 * Records a home-hero A/B conversion when the visitor clicks through to signup.
 *
 * Register CTAs point to `app.weplanify.com/...register` (a different origin),
 * so the click is a plain `<a>` navigation that leaves the landing — the click
 * itself is the conversion we can observe here. We beacon a same-origin route
 * that reads the `wp_vid` cookie server-side and emits the conversion event to
 * Vision, so the visitor id never touches client JS and survives the page
 * leaving via `sendBeacon` (queued by the browser even mid-navigation).
 *
 * Hooks `pointerdown` (capture) so it fires once per click and also catches
 * middle-click / modifier-click opens. Fires at most once per page load —
 * Vision attributes conversion per distinct user, so one event is enough.
 */
export function SignupConversionBeacon() {
	useEffect(() => {
		let fired = false;

		const onPointerDown = (event: Event) => {
			if (fired) return;
			const target = event.target;
			if (!(target instanceof Element)) return;

			const anchor = target.closest<HTMLAnchorElement>('a[href*="app.weplanify.com"]');
			if (!anchor) return;

			let url: URL;
			try {
				url = new URL(anchor.href);
			} catch {
				return;
			}
			if (url.hostname !== "app.weplanify.com" || !url.pathname.endsWith("/register")) return;

			fired = true;
			navigator.sendBeacon?.("/api/track-conversion");
		};

		document.addEventListener("pointerdown", onPointerDown, true);
		return () => document.removeEventListener("pointerdown", onPointerDown, true);
	}, []);

	return null;
}
