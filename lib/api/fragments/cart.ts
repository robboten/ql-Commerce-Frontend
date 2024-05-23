import productFragment from "./product";

const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount
      totalAmount
      totalTaxAmount
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${productFragment}
`;

export default cartFragment;
