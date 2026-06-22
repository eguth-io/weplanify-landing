"use client";

import { useEffect } from "react";
import { readFirstTouch } from "@/lib/attribution/first-touch";

/**
 * Safety net for first-touch attribution on the long tail of in-content CTAs.
 *
 * Most register links live in page bodies and are hardcoded to
 * `utm_source=landing`. That bucket is useless — it hides whether the visitor
 * came from Instagram, Google or direct. This listener rewrites the captured
 * first-touch origin onto `utm_source` at click time. The page's own
 * medium/campaign (e.g. `utm_campaign=world-cup-2026`) are richer than the
 * generic first-touch channel, so they are kept and only filled in from
 * first-touch when the link has none.
 *
 * Register links point to `app.weplanify.com` (a different origin), so they are
 * plain `<a>` navigations — mutating `href` just before the browser follows it
 * is reliable. We hook `pointerdown` (fires before navigation for left, middle
 * and modifier clicks) with `click` as a fallback; the rewrite is idempotent.
 */
export function FirstTouchLinkRewriter() {
	useEffect(() => {
		const rewrite = (event: Event) => {
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

			const ft = readFirstTouch();
			if (!ft.utm_source) return; // not captured yet — keep the page default

			url.searchParams.set("utm_source", ft.utm_source);
			// Keep an explicit page-level medium/campaign; only backfill from
			// first-touch where the link has none. signup_source and template
			// are left untouched.
			if (ft.utm_medium && !url.searchParams.get("utm_medium")) {
				url.searchParams.set("utm_medium", ft.utm_medium);
			}
			if (ft.utm_campaign && !url.searchParams.get("utm_campaign")) {
				url.searchParams.set("utm_campaign", ft.utm_campaign);
			}

			anchor.href = url.toString();
		};

		document.addEventListener("pointerdown", rewrite, true);
		document.addEventListener("click", rewrite, true);
		return () => {
			document.removeEventListener("pointerdown", rewrite, true);
			document.removeEventListener("click", rewrite, true);
		};
	}, []);

	return null;
}
