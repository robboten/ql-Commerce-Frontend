"use client";
import { ProductVariant } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { Loader2, PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "./cart/actions";
import { Button } from "./ui/button";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: number | undefined;
}) {
  const { pending } = useFormStatus();
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
      title="Add to cart"
      className={cn("w-full relative flex items-center justify-center", {
        disabledClasses: pending,
      })}
    >
      <div className="absolute left-0 ml-4 text-white">
        {pending ? (
          <div role="status">
            <Loader2 className="animate-spin " />
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Add to cart
    </Button>
  );
}

export function AddToCartButton({
  variants,
  availableForSale,
  className,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  className?: string;
}) {
  const [message, formAction] = useFormState(addItem, null);
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
    <form action={actionWithVariant} className={className}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
