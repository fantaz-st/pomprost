import { NextResponse } from "next/server";
import { wpFetch } from "@/lib/wpFetch";
import { RESOLVE_PAGE_TRANSLATION, RESOLVE_POST_TRANSLATION } from "@/lib/queriesTranslations";

export async function POST(req) {
  const body = await req.json().catch(() => null);

  const type = body?.type;
  const toLocale = body?.toLocale;

  if (!type || !toLocale) {
    return NextResponse.json({ ok: false, error: "Missing type/toLocale" }, { status: 400 });
  }

  if (type === "page") {
    const path = body?.path;
    if (!path) return NextResponse.json({ ok: false, error: "Missing path" }, { status: 400 });

    const tryPaths = [];

    // 1) original
    tryPaths.push(path);

    // 2) strip leading /hr or /en if present
    const stripped = String(path).replace(/^\/(hr|en)\//, "/");
    if (stripped !== path) tryPaths.push(stripped);

    let page = null;

    for (const p of tryPaths) {
      const data = await wpFetch(RESOLVE_PAGE_TRANSLATION, { path: p });
      if (data?.page) {
        page = data.page;
        break;
      }
    }

    const t = page?.translations?.find((x) => x?.language?.slug?.toLowerCase() === toLocale);
    return NextResponse.json({ ok: true, uri: t?.uri || null });
  }

  if (type === "post") {
    const slug = body?.slug;
    if (!slug) return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });

    const data = await wpFetch(RESOLVE_POST_TRANSLATION, { slug });
    const post = data?.post;

    const t = post?.translations?.find((x) => x?.language?.slug?.toLowerCase() === toLocale);
    return NextResponse.json({ ok: true, slug: t?.slug || null });
  }

  return NextResponse.json({ ok: false, error: "Unknown type" }, { status: 400 });
}
