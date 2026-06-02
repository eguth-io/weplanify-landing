"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureFirstTouch } from "@/lib/attribution/first-touch";

function FirstTouchTrackerInner() {
	const searchParams = useSearchParams();

	useEffect(() => {
		captureFirstTouch(searchParams);
	}, [searchParams]);

	return null;
}

/**
 * Captures the external campaign source (utm_*) on the first page the visitor
 * lands on and persists it for the rest of the visit. Mount once in the root
 * layout. Wrapped in Suspense because `useSearchParams()` requires it during
 * static rendering.
 */
export function FirstTouchTracker() {
	return (
		<Suspense fallback={null}>
			<FirstTouchTrackerInner />
		</Suspense>
	);
}
