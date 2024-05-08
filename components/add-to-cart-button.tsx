"use client";
import clsx from "clsx";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@/lib/api/types";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2, PlusIcon } from "lucide-react";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: number | undefined;
}) {
  const { pending } = useFormStatus();
  //const pending = true;
  if (!availableForSale) {
    return (
      <Button aria-disabled disabled className="w-full">
        Not available
      </Button>
    );
  }
  if (!selectedVariantId) {
    return (
      <Button
        aria-label="Please select an option"
        aria-disabled
        disabled={true}
        type="button"
        className="w-full relative flex items-center justify-center"
      >
        <div className="absolute left-0 ml-4 text-white">
          <PlusIcon className="h-5" />
        </div>
        Add to cart
      </Button>
    );
  }
  return (
    <Button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      type="button"
      title="Add to cart"
      className={cn("w-full relative flex items-center justify-center", {
        disabledClasses: pending,
      })}
    >
      <div className="absolute left-0 ml-4 text-white">
        {pending ? (
          <Loader2 className="animate-spin " />
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Add to cart
    </Button>
  );
}

async function addToCart(
  prevState: any,
  selectedVariantId: number | undefined
) {
  console.log("jlkj", selectedVariantId);
}

export function AddToCartButton({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addToCart, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
    </form>
  );
}
