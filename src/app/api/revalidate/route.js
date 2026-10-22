import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { WP_CACHE_TAG } from "@/lib/wpFetch";

// Called by WordPress on save/publish/delete so edits show up immediately instead of after the 5 min fallback.
// Auth: `x-revalidate-secret` header (or `?secret=`) must equal REVALIDATE_SECRET.
export async function POST(req) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "REVALIDATE_SECRET is not configured" }, { status: 500 });
  }

  const secret = req.headers.get("x-revalidate-secret") || req.nextUrl.searchParams.get("secret");
  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(WP_CACHE_TAG, { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: WP_CACHE_TAG, now: Date.now() });
}
