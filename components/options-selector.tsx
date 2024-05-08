"use client";

import { ProductOption, ProductVariant } from "@/lib/api/types";
import { cn, createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function OptionsSelector({
  variants,
  options,
}: {
  variants: ProductVariant[];
  options: ProductOption[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id.toString(),
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

  return (
    <div className="space-y-6 pt-6">
      {options.map((option, i) => (
        <dl key={i}>
          <dt>{option.name}</dt>
          <dd>
            <fieldset
              className="my-4"
              role="radiogroup"
              data-testid="VariantSelector"
            >
              <div className="flex flex-wrap gap-3">
                {option.values.map((value) => {
                  const optionNameLowerCase = option.name.toLowerCase();
                  const optionSearchParams = new URLSearchParams(
                    searchParams.toString()
                  );
                  optionSearchParams.set(optionNameLowerCase, value);
                  let optionUrl = createUrl(pathname, optionSearchParams);

                  const filtered = Array.from(
                    optionSearchParams.entries()
                  ).filter(([key, value]) =>
                    options.find(
                      (option) =>
                        option.name.toLowerCase() === key &&
                        option.values.includes(value)
                    )
                  );

                  const isAvailableForSale = combinations.find((combination) =>
                    filtered.every(
                      ([key, value]) =>
                        combination[key] === value &&
                        combination.availableForSale
                    )
                  );

                  const isActive =
                    searchParams.get(optionNameLowerCase) === value;
                  return (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        if (isActive) {
                          optionSearchParams.delete(optionNameLowerCase);
                          optionUrl = createUrl(pathname, optionSearchParams);
                        }
                        router.replace(optionUrl, { scroll: false });
                      }}
                      title={`${option.name} ${value}${
                        !isAvailableForSale ? " (Out of Stock)" : ""
                      }`}
                      key={value}
                      role="radio"
                      disabled={!isAvailableForSale}
                      aria-checked={!isAvailableForSale}
                      aria-disabled={!isAvailableForSale}
                      className={cn(
                        isActive
                          ? "border-transparent bg-neutral-900 text-white hover:bg-neutral-800"
                          : "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100",
                        "relative flex min-w-[5ch] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded border p-3 text-center text-sm font-semibold focus-within:outline focus-within:outline-2 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-100 aria-disabled:text-neutral-800 aria-disabled:opacity-50",
                        !isAvailableForSale && "pointer-events-none"
                      )}
                    >
                      {value}
                    </Button>
                  );
                })}
              </div>
            </fieldset>
          </dd>
        </dl>
      ))}
    </div>
  );
}
