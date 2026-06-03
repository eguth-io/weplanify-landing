"use client";

import { useEffect, useState } from "react";
import { buildRegisterHref, type RegisterHrefOptions } from "./first-touch";

/**
 * Returns the app register href with first-touch attribution applied.
 *
 * Computed once for SSR (localStorage unavailable → `utm_source=landing`
 * fallback) and recomputed after mount, when the persisted first-touch source
 * is readable. Use in client components that own a register CTA (Nav, Footer,
 * StickyCTA, …). In-content page CTAs are handled globally by
 * FirstTouchLinkRewriter instead.
 */
export function useRegisterHref(opts: RegisterHrefOptions): string {
	const [href, setHref] = useState(() => buildRegisterHref(opts));

	useEffect(() => {
		setHref(buildRegisterHref(opts));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opts.locale, opts.template, opts.campaign, opts.medium, opts.placement]);

	return href;
}
