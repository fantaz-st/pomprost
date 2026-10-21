import site from "@/settings/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
