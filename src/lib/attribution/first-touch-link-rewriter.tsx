"use client";

import { useEffect } from "react";
import { readFirstTouch } from "@/lib/attribution/first-touch";

/**
 * Safety net for first-touch attribution on the long tail of in-content CTAs.
 *
 * Most register links live in page bodies and are hardcoded to
 * `utm_source=landing` — the right default for a direct/organic visitor. But a
 * visitor who arrived from an external campaign (Instagram/TikTok) must keep
 * that original source. Rather than thread attribution through dozens of CTAs,
 * this listener rewrites the `utm_*` of any register link at click time, and
 * only when a first-touch source was actually captured.
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
			if (!ft.utm_source) return; // no external first-touch — keep the page default

			url.searchParams.set("utm_source", ft.utm_source);
			if (ft.utm_medium) url.searchParams.set("utm_medium", ft.utm_medium);
			else url.searchParams.delete("utm_medium");
			if (ft.utm_campaign) url.searchParams.set("utm_campaign", ft.utm_campaign);
			else url.searchParams.delete("utm_campaign");
			// signup_source and template are left untouched.

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
