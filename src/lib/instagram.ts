export type InstagramPost = {
  id: string;
  caption: string;
  permalink: string;
  imageUrl: string;
};

const PROFILE_URL = "https://www.instagram.com/weplanify/";

// Mock posts used on preview deploys and whenever the API call fails, so the
// slider always renders something sensible.
const MOCK_POSTS: InstagramPost[] = [
  {
    id: "mock-1",
    caption: "Planning the next group adventure ✈️",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=1067&fit=crop",
  },
  {
    id: "mock-2",
    caption: "Sunsets are better with the whole crew 🌅",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=1067&fit=crop",
  },
  {
    id: "mock-3",
    caption: "From the streets of Lisbon to the temples of Kyoto",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=1067&fit=crop",
  },
  {
    id: "mock-4",
    caption: "One itinerary, everyone on the same page 🗺️",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=1067&fit=crop",
  },
  {
    id: "mock-5",
    caption: "Road trip season is open 🚐",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=1067&fit=crop",
  },
  {
    id: "mock-6",
    caption: "Your group, your way ☀️",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&h=1067&fit=crop",
  },
];

type ApiSocialPost = {
  id: string;
  image_url: string | null;
  caption: string | null;
  link_url: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.weplanify.com";

/**
 * Fetch the posts shown in the Instagram slider on the landing.
 *
 * The data is served by the Laravel API (administered in Filament), so the
 * marketing team can drop new images + captions without touching code. We
 * cache the response for ten minutes. When the API is unreachable or returns no
 * posts, we fall back to MOCK_POSTS so the slider always renders.
 */
export async function getInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  try {
    const res = await fetch(`${API_URL}/api/social-posts`, {
      next: { revalidate: 600, tags: ["social-posts"] },
    });
    if (!res.ok) {
      return MOCK_POSTS.slice(0, limit);
    }

    const json: { data?: ApiSocialPost[] } = await res.json();
    const posts = (json.data ?? [])
      .map((p): InstagramPost | null => {
        if (!p.image_url) {
          return null;
        }
        return {
          id: p.id,
          caption: p.caption ?? "",
          permalink: p.link_url || PROFILE_URL,
          imageUrl: p.image_url,
        };
      })
      .filter((post): post is InstagramPost => post !== null);

    return posts.length > 0 ? posts.slice(0, limit) : MOCK_POSTS.slice(0, limit);
  } catch {
    return MOCK_POSTS.slice(0, limit);
  }
}
