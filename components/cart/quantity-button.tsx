"use client";

import { useFormState } from "react-dom";
import { updateItemQuantity } from "./actions";
import { CartItem } from "@/lib/api/types";
import { Minus, Plus } from "lucide-react";

function SignedButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button className="min-h-9 max-h-9 flex items-center hover:opacity-80 transition-all duration-200">
      {type === "plus" ? (
        <Plus className="w-4 h-4" />
      ) : (
        <Minus className="w-4 h-4" />
      )}
    </button>
  );
}

export function QuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);
  return (
    <form action={actionWithVariant}>
      <SignedButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
