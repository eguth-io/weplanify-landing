import fs from 'fs';
import path from 'path';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './src/i18n/routing';

/**
 * Loads every per-namespace JSON file under `messages/<locale>/` and merges them
 * into a single flat messages object keyed by namespace (the file name).
 *
 * This lets each page/component own its own message file (e.g. `home.json`,
 * `faq.json`) instead of one monolithic `<locale>.json`. Adding a new language
 * is then just dropping a `messages/<locale>/` directory; adding a page's
 * strings is just adding `messages/<locale>/<page>.json`.
 */
function loadMessages(locale: string): Record<string, unknown> {
  const dir = path.join(process.cwd(), 'messages', locale);
  const messages: Record<string, unknown> = {};

  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.json')) {
        const namespace = file.replace(/\.json$/, '');
        messages[namespace] = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'));
      }
    }
  }

  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: loadMessages(locale),
  };
});
