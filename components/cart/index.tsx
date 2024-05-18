import { getCart } from "@/lib/api";
import { cookies } from "next/headers";
import OpenCart from "./open-cart";
import CartModal from "./modal";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }
  return <CartModal cart={cart} />;
  //return <CartModal cart={cart} />;
}
