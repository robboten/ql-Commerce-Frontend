"use server";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/api";
import { TAGS } from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: any,
  selectedVariantId: number | undefined
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!selectedVariantId) {
    return "Missing product variant id";
  }

  // try {
  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set("cartId", cartId);
  }
  await addToCart(cartId, [{ id: selectedVariantId, quantity: 1 }]);

  console.log("add cart", cart, selectedVariantId);

  revalidateTag(TAGS.cart);
  // } catch (e) {
  //   return 'Error adding item to cart';
  // }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Cart id not found";
  }

  const { lineId, variantId, quantity } = payload;

  if (quantity === 0) {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
    return;
  }

  await updateCart(cartId, [
    {
      id: lineId,
      merchandiseId: variantId,
      quantity,
    },
  ]);
  revalidateTag(TAGS.cart);
}
