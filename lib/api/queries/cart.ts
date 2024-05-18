import cartFragment from "../fragments/cart";

export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: String!) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;
