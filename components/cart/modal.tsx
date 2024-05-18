"use client";
import { Cart } from "@/lib/api/types";
import { Button, buttonVariants } from "../ui/button";
import OpenCart from "./open-cart";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Minus, Plus, ShoppingCartIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Price from "../price";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { QuantityButton } from "./quantity-button";

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger aria-label="Open cart">
        <OpenCart quantity={cart?.totalQuantity} />
      </DrawerTrigger>
      <DrawerContent className="w-[400px]">
        <DrawerHeader className="w-full flex justify-between items-center">
          <DrawerTitle className="text-xl">Cart</DrawerTitle>
          <DrawerClose asChild>
            <Button
              variant="outline"
              size="sm"
              aria-label="Close cart"
              className="group aspect-square p-0"
            >
              <X
                className={cn(
                  "transition-all ease-in-out group-hover:scale-125 h-5"
                )}
              />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <>
          {!cart || cart.lines.length === 0 ? (
            <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
              <ShoppingCartIcon className="h-16 w-16" />
              <p className="mt-6 text-center text-2xl font-bold">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <>
              <ScrollArea className="mt-6 flex h-full flex-col justify-between">
                <ul className="px-4">
                  {cart.lines.map((listItem, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-between border-b py-4"
                      >
                        <div className="flex gap-3">
                          <Image
                            src={listItem.merchandise.product.featuredImage.url}
                            alt={
                              listItem.merchandise.product.featuredImage.altText
                            }
                            width={64}
                            height={64}
                            className="aspect-square object-cover"
                          />
                          <div className="flex flex-col">
                            <p className="text-xl leading-tight font-medium">
                              {listItem.merchandise.product.title}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {listItem.merchandise.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col text-right justify-between">
                          <Price
                            className="text-xl font-normal"
                            amount={listItem.cost.totalAmount.amount}
                          />
                          <div className="border h-9 space-x-4 rounded-full p-2 flex items-center justify-between">
                            <QuantityButton item={listItem} type="minus" />
                            <span className="">{listItem.quantity}</span>
                            <QuantityButton item={listItem} type="plus" />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
              <DrawerFooter>
                <div className="py-4">
                  <div className="flex items-center justify-between border-b py-4">
                    <p>Taxes</p>
                    <Price
                      className="text-right"
                      amount={cart.cost.totalTaxAmount.amount}
                    />
                  </div>
                  <div className="flex items-center justify-between border-b py-4">
                    <p>Shipping (flat rate)</p>
                    <Price className="text-right" amount={49} />
                  </div>
                  <div className="flex items-center justify-between border-b py-4">
                    <p>Total</p>
                    <Price
                      className="text-right"
                      amount={cart.cost.totalAmount.amount + 49}
                    />
                  </div>
                </div>
                <Button>Checkout</Button>
              </DrawerFooter>
            </>
          )}
        </>
      </DrawerContent>
    </Drawer>
  );
}
