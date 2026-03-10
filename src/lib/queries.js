export const LATEST_POSTS = `
  query Latest($first: Int = 6, $lang: LanguageCodeFilterEnum!) {
    posts(
      first: $first
      where: {
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
        language: $lang
      }
    ) {
      nodes {
        id
        slug
        uri
        title
        date
        excerpt
        language { slug }
        translations {
          slug
          uri
          language { slug }
        }
      }
    }
  }
`;

export const ALL_NEWS = `
  query AllNews(
    $first: Int = 12,
    $after: String,
    $search: String,
    $category: String,
    $tag: String,
    $year: Int,
    $month: Int,
    $order: OrderEnum = DESC,
    $lang: LanguageCodeFilterEnum!
  ) {
    posts(
      first: $first
      after: $after
      where: {
        status: PUBLISH
        orderby: { field: DATE, order: $order }
        search: $search
        categoryName: $category
        tag: $tag
        dateQuery: { year: $year, month: $month }
        language: $lang
      }
    ) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        slug
        uri
        title
        date
        excerpt
      }
    }
  }
`;

export const POST_BY_SLUG = `
  query PostBySlug($slug: String!, $lang: LanguageCodeFilterEnum!) {
    posts(
      first: 1
      where: {
        status: PUBLISH
        language: $lang
        name: $slug
      }
    ) {
      nodes {
        id
        slug
        uri
        title
        date
        modified
        featuredImage { node { sourceUrl altText } }
        blocks(attributes: true, dynamicContent: true)
        language { slug }
        translations {
          slug
          uri
          language { slug }
        }
      }
    }
  }
`;

export const ALL_PAGES = `
  query AllPages($first: Int = 200, $lang: LanguageCodeFilterEnum!) {
    pages(
      first: $first
      where: {
        status: PUBLISH
        language: $lang
      }
    ) {
      nodes {
        id
        slug
        uri
        title
        databaseId
        parentDatabaseId
        language { slug }
        translations {
          uri
          slug
          language { slug }
        }
      }
    }
  }
`;

export const ALL_PAGES_ALT = `
  query AllPagesAlt {
    pages(
      where: {
        status: PUBLISH
      }
    ) {
      nodes {
        databaseId
        parentDatabaseId
        slug
        title
        uri
      }
    }
  }
`;

export const PAGE_BY_PATH = `
  query PageByPath($path: ID!) {
    page(id: $path, idType: URI) {
      id
      slug
      uri
      title
      modified
      featuredImage { node { sourceUrl altText } }
      blocks(attributes: true, dynamicContent: true)

      language { slug }
      translations {
        uri
        slug
        language { slug }
      }

      ancestors {
        nodes {
          ... on Page {
            id
            uri
            title
          }
        }
      }

      children {
        nodes {
          ... on Page {
            id
            uri
            title
          }
        }
      }
    }
  }
`;

export const MENU_PAGE = `
  query MenuPage($name: ID!, $after: String) {
    menu(id: $name, idType: NAME) {
      menuItems(first: 100, after: $after) {
        nodes { databaseId parentDatabaseId label uri }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;
