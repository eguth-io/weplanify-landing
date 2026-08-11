/**
 * Lowercase and strip accents, so "malaga" matches "Málaga" and "perou" the
 * country "Pérou". Used by the destination filters on both the search box and
 * the country picker, which have to agree on what counts as a match.
 */
export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
