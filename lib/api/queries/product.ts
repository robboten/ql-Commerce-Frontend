import productFragment from "../fragments/product";

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $order_by: [ProductSortInput!]
    $query: String!
    $first: Int
  ) {
    products(
      order: $order_by
      where: { title: { contains: $query } }
      first: $first
    ) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;
