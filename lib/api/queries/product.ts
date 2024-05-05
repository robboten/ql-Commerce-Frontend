import productFragment from "../fragments/product";

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
