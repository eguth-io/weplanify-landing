#!/usr/bin/env node
/**
 * Measures our visibility on the queries people phrase as prompts.
 *
 * GSC shows we already rank top-5 on long, natural-language queries (WP-137),
 * and SerpAPI confirms we get cited in AI Overviews. Neither is visible in the
 * usual head-term reporting, so this script records both — organic position and
 * AI Overview citation — for a fixed set of witness queries.
 *
 * Run it before and after a content change to see whether the change moved
 * anything. Output is JSON on stdout; commit the "before" run alongside the
 * change so the comparison is reproducible.
 *
 *   SERPAPI_KEY=… node scripts/geo-baseline.mjs > docs/seo/geo-baseline-YYYY-MM-DD.json
 *
 * Costs one SerpAPI search per query, plus one extra per query that returns an
 * AI Overview (the citations live behind a second, token-addressed call).
 */

const KEY = process.env.SERPAPI_KEY;
if (!KEY) {
	console.error("SERPAPI_KEY is required");
	process.exit(1);
}

const DOMAIN = "weplanify.com";

/**
 * Witness queries, taken verbatim from Search Console rather than invented, so
 * the baseline tracks demand that actually exists. Positions are the 90-day
 * averages observed on 2026-08-08.
 */
const QUERIES = [
	{ q: "best travel planning apps for group vacations 2026?", gscPosition: 1.4 },
	{ q: "which platforms allow collaborative trip planning for dubai, where friends can vote on experiences?", gscPosition: 1.7 },
	{ q: "best group trip planning apps split expenses itinerary polls 2026", gscPosition: 2.0 },
	{ q: "how do i split costs for a group trip fairly?", gscPosition: 2.4 },
	{ q: "best group itinerary builder for team-building trips", gscPosition: 2.4 },
	{ q: "travel planners with collaborative features for group trips?", gscPosition: 3.3 },
	{ q: "best mobile apps for group travel planning 2025 2026", gscPosition: 6.2 },
	{ q: "best collaborative trip planning apps 2026", gscPosition: 8.1 },
	{ q: "best apps to plan a group trip with friends", gscPosition: null }, // known AIO citation
	{ q: "app to plan a trip with friends", gscPosition: 22.4 },
];

const get = async (params) => {
	const url = `https://serpapi.com/search.json?${new URLSearchParams({ ...params, api_key: KEY })}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`SerpAPI ${res.status} for ${params.q ?? params.page_token?.slice(0, 12)}`);
	return res.json();
};

const measure = async ({ q, gscPosition }) => {
	const serp = await get({ engine: "google", q, gl: "us", hl: "en", num: "20" });

	const ours = (serp.organic_results ?? []).find((r) => (r.link ?? "").includes(DOMAIN));
	const aio = serp.ai_overview;

	// AI Overview citations are not inlined in the search response; they need a
	// second call against the page_token the first one hands back.
	let aioCited = null;
	let aioSources = null;
	if (aio?.page_token) {
		try {
			const detail = await get({ engine: "google_ai_overview", page_token: aio.page_token });
			const refs = detail.ai_overview?.references ?? [];
			aioCited = refs.some((r) => (r.link ?? "").includes(DOMAIN));
			aioSources = refs.length;
		} catch {
			aioCited = "error";
		}
	}

	return {
		query: q,
		gscPosition,
		organicPosition: ours?.position ?? null,
		organicUrl: ours?.link ?? null,
		aiOverview: Boolean(aio),
		aiOverviewCitesUs: aioCited,
		aiOverviewSourceCount: aioSources,
		redditInTop5: (serp.organic_results ?? []).slice(0, 5).some((r) => (r.link ?? "").includes("reddit.com")),
	};
};

const results = [];
for (const entry of QUERIES) {
	try {
		results.push(await measure(entry));
	} catch (err) {
		results.push({ query: entry.q, error: String(err) });
	}
}

const cited = results.filter((r) => r.aiOverviewCitesUs === true).length;
const ranked = results.filter((r) => r.organicPosition != null).length;

console.log(
	JSON.stringify(
		{
			measuredAt: new Date().toISOString(),
			domain: DOMAIN,
			market: "gl=us / hl=en",
			summary: {
				queries: results.length,
				withAiOverview: results.filter((r) => r.aiOverview).length,
				citedInAiOverview: cited,
				rankingInTop20: ranked,
			},
			results,
		},
		null,
		2
	)
);
