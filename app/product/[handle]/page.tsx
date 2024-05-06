import { OptionsSelector } from "@/components/options-selector";
import Price from "@/components/price";
import SelectedPrice from "@/components/selected-price";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/api";
import { cn, formatMoney, formatMoneyRange } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const combinations: Combination[] = product.variants.map((variant) => ({
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
  console.log(combinations);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "SEK",
      highPrice: product.priceRange.maxVariantPrice,
      lowPrice: product.priceRange.minVariantPrice,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <main className="container">
        <article className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
            <picture className="lg:basis-4/6">
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText}
                width={product.featuredImage.width}
                height={product.featuredImage.height}
                className="w-full"
              />
            </picture>
            <div className="gap-2 flex flex-col lg:basis-2/6">
              <h1 className="text-2xl">{product.title}</h1>

              <SelectedPrice
                variants={product.variants}
                priceRange={{
                  minVariantPrice: product.priceRange.minVariantPrice,
                  maxVariantPrice: product.priceRange.maxVariantPrice,
                }}
              />
              <OptionsSelector
                variants={product.variants}
                options={product.options}
              />
              <Button type="button">Add to cart</Button>
            </div>
          </div>
          <p className="pb-6 prose max-w-full leading-snug">
            {product.description}
          </p>
        </article>
      </main>
    </>
  );
}
