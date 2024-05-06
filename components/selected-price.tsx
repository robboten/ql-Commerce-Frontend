"use client";

import { useSearchParams } from "next/navigation";
import Price from "./price";
import { ProductVariant } from "@/lib/api/types";
import { formatMoneyRange } from "@/lib/utils";

export default function SelectedPrice({
  variants,
  priceRange,
}: {
  variants: ProductVariant[];
  priceRange: { maxVariantPrice: number; minVariantPrice: number };
}) {
  const searchParams = useSearchParams();
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  return (
    <div className="text-2xl font-extrabold">
      {variant?.price.amount ? (
        <Price amount={variant.price.amount.toString()} currencyCode="SEK" />
      ) : (
        <>
          {priceRange.minVariantPrice === priceRange.maxVariantPrice ? (
            <Price
              amount={priceRange.minVariantPrice.toString()}
              currencyCode="SEK"
            />
          ) : (
            <p className="text-2xl font-extrabold">
              {formatMoneyRange({
                start: {
                  amount: priceRange.minVariantPrice,
                  currency: "SEK",
                },
                stop: {
                  amount: priceRange.maxVariantPrice,
                  currency: "SEK",
                },
              })}
            </p>
          )}
        </>
      )}
    </div>
  );
}
