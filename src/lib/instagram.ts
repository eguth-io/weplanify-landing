export type InstagramPost = {
  id: string;
  caption: string;
  permalink: string;
  imageUrl: string;
};

const PROFILE_URL = "https://www.instagram.com/weplanify/";

// Mock posts used on preview deploys and whenever the access token is missing
// or the API call fails, so the slider always renders something sensible.
const MOCK_POSTS: InstagramPost[] = [
  {
    id: "mock-1",
    caption: "Planning the next group adventure ✈️",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop",
  },
  {
    id: "mock-2",
    caption: "Sunsets are better with the whole crew 🌅",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop",
  },
  {
    id: "mock-3",
    caption: "From the streets of Lisbon to the temples of Kyoto",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=600&fit=crop",
  },
  {
    id: "mock-4",
    caption: "One itinerary, everyone on the same page 🗺️",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop",
  },
  {
    id: "mock-5",
    caption: "Road trip season is open 🚐",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop",
  },
  {
    id: "mock-6",
    caption: "Your group, your way ☀️",
    permalink: PROFILE_URL,
    imageUrl:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&h=600&fit=crop",
  },
];

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

/**
 * Fetch the latest posts of the @weplanify Instagram feed.
 *
 * Uses the Instagram Graph API (graph.instagram.com) with a long-lived access
 * token provided via INSTAGRAM_ACCESS_TOKEN. The result is cached for an hour
 * (the feed is "live" but we don't hammer the API on every request). When the
 * token is missing or the request fails, it falls back to MOCK_POSTS so the
 * slider still renders (e.g. on preview deploys before the token is set up).
 */
export async function getInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return MOCK_POSTS.slice(0, limit);
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return MOCK_POSTS.slice(0, limit);
    }

    const json: { data?: InstagramMedia[] } = await res.json();
    const posts = (json.data ?? [])
      .map((media): InstagramPost | null => {
        const imageUrl = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
        if (!imageUrl) {
          return null;
        }
        return {
          id: media.id,
          caption: media.caption ?? "",
          permalink: media.permalink,
          imageUrl,
        };
      })
      .filter((post): post is InstagramPost => post !== null);

    return posts.length > 0 ? posts.slice(0, limit) : MOCK_POSTS.slice(0, limit);
  } catch {
    return MOCK_POSTS.slice(0, limit);
  }
}
