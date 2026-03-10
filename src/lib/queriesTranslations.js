export const RESOLVE_PAGE_TRANSLATION = `
  query ResolvePageTranslation($path: ID!) {
    page(id: $path, idType: URI) {
      uri
      language { slug }
      translations {
        uri
        language { slug }
      }
    }
  }
`;
export const RESOLVE_POST_TRANSLATION = `
  query ResolvePostTranslation($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      translations {
        slug
        language { slug }
      }
    }
  }
`;
