export const WP_CACHE_TAG = "wp";

export async function wpFetch(query, variables = {}) {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT;
  if (!endpoint) throw new Error("WP_GRAPHQL_ENDPOINT is not set");

  const r = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    // Tagged so /api/revalidate (called by WP on save) can expire everything at once; 5 min is the fallback.
    next: { revalidate: 300, tags: [WP_CACHE_TAG] },
  });
  if (!r.ok) throw new Error(`WPGraphQL request failed: ${r.status} ${r.statusText}`);

  const j = await r.json();
  if (j.errors) throw new Error(j.errors[0]?.message || "WPGraphQL error");
  return j.data;
}
