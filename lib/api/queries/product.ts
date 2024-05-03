import productFragment from "../fragments/product";

export const getProductsQuery = /* GraphQL */ `
  query getProducts($order_by: [ProductSortInput!], $query: String!) {
    products(
      order: $order_by
      where: { title: { contains: $query } }
      first: 100
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
