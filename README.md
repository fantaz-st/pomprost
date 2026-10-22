# PomProST

Website for the PomProST project (Faculty of Maritime Studies, University of Split): a Next.js front end for a headless WordPress (WPGraphQL + Polylang).

## Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Environment variables (`.env`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `WP_GRAPHQL_ENDPOINT` | yes | WPGraphQL URL, e.g. `https://pomprost-be.pfst.hr/graphql` |
| `NEXT_PUBLIC_SITE_URL` | production | Public origin, used for canonical/hreflang URLs, Open Graph and `sitemap.xml` (defaults to `http://localhost:3000`) |
| `REVALIDATE_SECRET` | for instant updates | Shared secret for the WordPress revalidation webhook |

## Content updates

WordPress data is cached for 5 minutes. To publish edits immediately, have WordPress call the revalidation endpoint on save, e.g. in the theme's `functions.php`:

```php
function pomprost_revalidate() {
  wp_remote_post('https://<site>/api/revalidate', [
    'headers'  => ['x-revalidate-secret' => '<REVALIDATE_SECRET>'],
    'blocking' => false,
  ]);
}
add_action('save_post', 'pomprost_revalidate');
add_action('wp_update_nav_menu', 'pomprost_revalidate');
```

## Structure

- `src/app/[locale]/`: routes; `[locale]/layout.js` is the root layout (sets `<html lang>`).
  - `(wp-pages)/[...slug]`: any WordPress page, resolved by URI.
  - `news/`, `novosti/`: post index and posts (`en` and `hr` URL segments, see `src/settings/routes.js`).
- `src/proxy.js`: redirects unprefixed URLs to `/<locale>/...` (cookie, else `hr`).
- `src/i18n/`: all UI copy, one dictionary per language.
- `src/settings/`: site config, locales, route segments.
- `src/components/BlockRenderer` + `src/elements/`: Gutenberg block renderers (server components).
- `src/lib/urls.js`: WordPress URI → front-end path mapping. Polylang's default language (`en`) has no URL prefix in WordPress; the front end always prefixes the locale.
