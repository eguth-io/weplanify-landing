import { EguthFlags } from '@theogu/eguth-feature-flags';

// Singleton feature-flag client (Vision-controlled). Server-side only — the API
// key must never reach the browser. The home-hero A/B is driven by the
// `hero-search` flag (PERCENTAGE): enabled bucket = search variant, else the AI
// control. Rollout % and on/off are flipped remotely in Vision, no redeploy.
let flags: EguthFlags | null = null;

export function getFlags(): EguthFlags {
  if (flags) return flags;

  flags = new EguthFlags({
    app: 'weplanify',
    endpoint: process.env.EGUTH_FLAGS_URL ?? 'https://vision.eguth.io/api/flags/evaluate',
    apiKey: process.env.EGUTH_FLAGS_API_KEY ?? '',
    // Keep SSR snappy: if Vision is slow/unreachable we fall back to defaults
    // (control) rather than blocking the render.
    timeout: 1500,
    defaults: { 'hero-search': false },
  });

  return flags;
}
