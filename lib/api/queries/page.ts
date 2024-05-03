import seoFragment from "../fragments/seo";

const pageFragment = /* GraphQL */ `
  fragment page on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
    }
  }
  ${seoFragment}
`;

export const getPagesQuery = /* GraphQL */ `
  query getPages {
    pages(first: 50) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;
