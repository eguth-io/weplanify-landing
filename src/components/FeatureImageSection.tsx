import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  Vote,
  Wallet,
  Search,
  Map,
  BedDouble,
  ListChecks,
  Bus,
  Users,
  type LucideIcon,
} from "lucide-react";

type Lang = "en" | "fr";

// Clean iPhone mockup WITHOUT bubbles — the bubbles are rendered in HTML below
// so they stay translatable (FR/EN). Replaces the old baked-in-text image.
const MOCKUP_IMAGE = "/feature-mockup.png";
const MOCKUP_W = 1052;
const MOCKUP_H = 1370;

type Side = "left" | "right";

type Bubble = {
  /** Stable key, used to match the bubble with its translated text by order. */
  id: string;
  icon: LucideIcon;
  /** Which side of the phone the bubble sits on (desktop). */
  side: Side;
  /** Vertical anchor as a percentage of the container height (desktop). */
  top: number;
  /**
   * Inner-edge anchor as a percentage of the container width (desktop).
   * Left bubbles anchor their RIGHT edge here, right bubbles their LEFT edge,
   * so they all tuck the same amount behind the (higher z-index) phone.
   */
  edge: number;
  /** Slightly translucent for a layered/depth effect, like the original mockup. */
  dim?: boolean;
  /**
   * Mobile placement. Only bubbles with this set are shown on mobile, floating
   * in one of the four corners and slightly overlapping the phone for depth.
   * Anchored to the corner with a FIXED offset (not a % of container height) so
   * the bubble can never drift off-screen as the phone's height changes — top
   * bubbles pin to the top edge, bottom bubbles to the bottom edge.
   */
  mobile?: {
    corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    /** Vertical offset (px) from the corner's edge. */
    offset: number;
  };
};

// Layout/logic only — the user-facing text/subtitle live in the
// `featureImageSection` messages, matched to this array by index.
const BUBBLES: Bubble[] = [
  // Left column — clustered in the upper ~60%, inner edge tucked behind the phone
  { id: "polls", icon: Vote, side: "left", top: 10, edge: 38, mobile: { corner: "top-left", offset: 8 } },
  { id: "expenses", icon: Wallet, side: "left", top: 32, edge: 37 },
  { id: "invite", icon: Users, side: "left", top: 54, edge: 33, dim: true, mobile: { corner: "bottom-left", offset: 8 } },
  { id: "trip", icon: Map, side: "left", top: 76, edge: 31 },
  // Right column
  { id: "activities", icon: Search, side: "right", top: 9, edge: 32, mobile: { corner: "top-right", offset: 64 } },
  { id: "accommodation", icon: BedDouble, side: "right", top: 34, edge: 30, dim: true },
  { id: "tasks", icon: ListChecks, side: "right", top: 56, edge: 29, dim: true },
  { id: "transport", icon: Bus, side: "right", top: 78, edge: 34, mobile: { corner: "bottom-right", offset: 64 } },
];

type BubbleText = { text: string; subtitle: string };

interface FeatureImageSectionProps {
  locale?: string;
}

export default async function FeatureImageSection({ locale = "en" }: FeatureImageSectionProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const t = await getTranslations({ locale: lang, namespace: "featureImageSection" });
  const title = t("title");
  const bubbleTexts = t.raw("bubbles") as BubbleText[];

  return (
    <div className="px-4 lg:px-8 pt-8 lg:pt-12">
      <div className="max-w-[1536px] mx-auto">
        <h2 className="text-[#001E13] text-3xl lg:text-5xl xl:text-6xl font-londrina-solid leading-tight mb-8 lg:mb-12 text-center max-w-[800px] mx-auto whitespace-pre-line">
          {title}
        </h2>

        {/* Shifted left so the phone (offset right by the hand) sits centered under the title.
            Mobile: small TOP padding so the top corner bubbles don't crowd the title,
            and NO bottom padding so the phone meets the next section like on desktop. */}
        <div className="relative w-full max-w-[1040px] mx-auto pt-6 pb-0 lg:py-0 lg:-translate-x-[42px]">
          {/* Phone mockup (clean, no baked-in text) */}
          <div className="relative z-20 mx-auto w-[270px] sm:w-[340px] lg:w-[440px]">
            <Image
              src={MOCKUP_IMAGE}
              alt={title}
              width={MOCKUP_W}
              height={MOCKUP_H}
              sizes="(max-width: 1024px) 300px, 340px"
              className="w-full h-auto"
              priority={false}
            />
          </div>

          {/* Bubbles — desktop: floating around the phone */}
          {BUBBLES.map((b, i) => (
            <FeatureBubble
              key={b.id}
              bubble={b}
              text={bubbleTexts[i].text}
              subtitle={bubbleTexts[i].subtitle}
            />
          ))}

          {/* Bubbles — mobile: a few floating in the corners, overlapping the
              phone for the same layered effect as desktop. */}
          {BUBBLES.map((b, i) =>
            b.mobile ? (
              <MobileFeatureBubble
                key={b.id}
                bubble={b}
                text={bubbleTexts[i].text}
                subtitle={bubbleTexts[i].subtitle}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureBubble({ bubble, text, subtitle }: { bubble: Bubble; text: string; subtitle: string }) {
  const Icon = bubble.icon;
  // Left bubbles pin their RIGHT edge near the phone; right bubbles their LEFT
  // edge. Both sit at `100 - edge`% so they tuck the same amount behind the phone.
  const sidePos =
    bubble.side === "left"
      ? { right: `${100 - bubble.edge}%` }
      : { left: `${100 - bubble.edge}%` };
  // Extra padding on the inner side so the card's white space (not the text)
  // is what tucks behind the phone.
  // Icon is always flush-left (pl-3.5). Left bubbles get extra RIGHT padding so
  // their white space (not text) tucks behind the phone; right bubbles only
  // tuck their left corner, so the icon stays clear.
  const innerPad = bubble.side === "left" ? "pl-3.5 pr-8" : "pl-3.5 pr-4";

  return (
    <div
      className={`absolute z-10 hidden lg:flex items-center gap-2.5 rounded-2xl bg-white ${innerPad} py-2.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.4)] ring-1 ring-black/5`}
      style={{
        top: `${bubble.top}%`,
        ...sidePos,
        opacity: bubble.dim ? 0.6 : 1,
      }}
    >
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange">
        <Icon className="h-4 w-4 text-white" />
      </span>
      <span className="flex flex-col">
        <span className="font-karla text-[13px] font-bold leading-tight text-[#001E13] whitespace-nowrap">
          {text}
        </span>
        <span className="font-karla text-[11px] leading-tight text-gray-400 whitespace-nowrap">
          {subtitle}
        </span>
      </span>
    </div>
  );
}

function MobileFeatureBubble({ bubble, text, subtitle }: { bubble: Bubble; text: string; subtitle: string }) {
  const Icon = bubble.icon;
  const corner = bubble.mobile!.corner;
  const isLeft = corner === "top-left" || corner === "bottom-left";
  const isTop = corner === "top-left" || corner === "top-right";
  // Anchor to a fixed corner offset instead of a % of the container height, so
  // the bubble can't slip below the viewport when its text wraps or the phone
  // resizes. Top bubbles pin their TOP edge to the container's top; bottom
  // bubbles pin their BOTTOM edge to the container's bottom.
  const sidePos = {
    ...(isLeft ? { left: 0 } : { right: 0 }),
    ...(isTop
      ? { top: bubble.mobile!.offset }
      : { bottom: bubble.mobile!.offset }),
  };
  // Bubbles sit ON TOP of the phone on mobile (z-30 > phone's z-20) so they stay
  // fully visible, overlapping the phone's edge for a layered look. Right bubbles
  // mirror their layout so the icon stays on the outer edge.
  const innerPad = isLeft ? "pl-3 pr-3" : "pl-3 pr-3 flex-row-reverse text-right";

  return (
    <div
      className={`absolute z-30 flex max-w-[54%] items-center gap-2 rounded-2xl bg-white ${innerPad} py-2 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5 lg:hidden`}
      style={{
        ...sidePos,
        opacity: bubble.dim ? 0.92 : 1,
      }}
    >
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange">
        <Icon className="h-3.5 w-3.5 text-white" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="line-clamp-2 font-karla text-xs font-bold leading-tight text-[#001E13]">
          {text}
        </span>
        <span className="truncate font-karla text-[10px] leading-tight text-gray-400">
          {subtitle}
        </span>
      </span>
    </div>
  );
}
