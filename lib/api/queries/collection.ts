import { collectionFragment } from "../fragments/collection";
import productFragment from "../fragments/product";

export const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
    $order_by: [ProductSortInput!]
  ) {
    collection(handle: $handle) {
      products(
        order: $order_by
        first: $first
        after: $after
        last: $last
        before: $before
      ) {
        edges {
          node {
            ...product
          }
          cursor
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${productFragment}
`;
