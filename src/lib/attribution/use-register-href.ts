"use client";

import { useEffect, useState } from "react";
import { buildRegisterHref, type RegisterHrefOptions } from "./first-touch";

/**
 * Returns the app register href with first-touch attribution applied.
 *
 * The first render deliberately ignores the persisted first-touch and uses the
 * `utm_source=direct` fallback, because it has to produce exactly what the
 * server produced. `localStorage` is unreadable during SSR but readable while
 * hydrating, so building the href from it on the first client render yields a
 * different `href` than the server sent — React reports a hydration mismatch,
 * gives up on patching the attribute, and the link keeps the server's
 * `utm_source=direct` for the rest of the page's life. The stored source is
 * applied by the effect below, after hydration has settled.
 *
 * Use in client components that own a register CTA (Nav, Footer, StickyCTA, …).
 * In-content page CTAs are handled globally by FirstTouchLinkRewriter instead.
 */
export function useRegisterHref(opts: RegisterHrefOptions): string {
	const [href, setHref] = useState(() => buildRegisterHref(opts, {}));

	useEffect(() => {
		setHref(buildRegisterHref(opts));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opts.locale, opts.template, opts.campaign, opts.medium, opts.placement]);

	return href;
}
