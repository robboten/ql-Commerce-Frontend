import cartFragment from "../fragments/cart";

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: String!, $lines: [LineItemInput!]!) {
    addToCart(id: $cartId, lines: $lines) {
      ...cart
    }
  }
  ${cartFragment}
`;

export const createCartWithLinesMutation = /* GraphQL */ `
  mutation createCart($lines: [LineItemInput!]!) {
    cartCreateWithItems(lines: $lines) {
      ...cart
    }
  }
  ${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
  mutation createCart {
    cartCreate {
      ...cart
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems($cartId: String!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      ...cart
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: String!, $lineIds: [Int!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      ...cart
    }
  }
  ${cartFragment}
`;
