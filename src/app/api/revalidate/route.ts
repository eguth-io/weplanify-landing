import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Bust the Next.js Data Cache for a given tag or path.
 *
 * Why no auth: the data we expose is already public (social posts feed,
 * landing page render) so the worst an attacker can do is force a re-fetch
 * from our own API. Rate-limited at the Vercel edge by default. If we ever
 * cache anything sensitive, gate this behind a REVALIDATE_TOKEN env var.
 *
 * Usage:
 *   curl 'https://www.weplanify.com/api/revalidate?tag=social-posts'
 *   curl 'https://www.weplanify.com/api/revalidate?path=/en'
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const tag = request.nextUrl.searchParams.get("tag");
  const path = request.nextUrl.searchParams.get("path");

  if (!tag && !path) {
    return NextResponse.json(
      { error: "Provide ?tag=<tag> or ?path=<path>" },
      { status: 400 },
    );
  }

  if (tag) {
    revalidateTag(tag);
  }
  if (path) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    tag,
    path,
    now: Date.now(),
  });
}
