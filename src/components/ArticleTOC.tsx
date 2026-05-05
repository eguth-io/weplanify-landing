"use client";

interface TOCItem {
  id: string;
  label: string;
}

interface Props {
  items: TOCItem[];
  title?: string;
}

/**
 * In-page anchor navigation rendered near the top of long-form articles.
 *
 * SEO value: each list item is a clickable anchor to a section id, which gives
 * Google explicit "jump to" link signals that can surface as sitelinks under
 * the page in SERPs. Also lifts dwell time by letting readers skip ahead.
 */
export default function ArticleTOC({ items, title }: Props) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label={title ?? "Table of contents"}
      className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-2xl px-5 py-4 my-6 text-left"
    >
      {title && (
        <p className="text-[#001E13]/60 text-xs font-karla font-bold uppercase tracking-wider mb-2">
          {title}
        </p>
      )}
      <ol className="space-y-1.5 list-decimal list-inside marker:text-[#001E13]/40 marker:font-karla">
        {items.map((item) => (
          <li key={item.id} className="text-[#001E13] font-karla text-sm">
            <a
              href={`#${item.id}`}
              className="text-[#F6391A] hover:underline font-semibold"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
