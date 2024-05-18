import { AddToCartButton } from "@/components/add-to-cart-button";
import { OptionsSelector } from "@/components/options-selector";
import { ProductGallery } from "@/components/product-gallery";
import SelectedPrice from "@/components/selected-price";
import { getProduct } from "@/lib/api";
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
            {/* <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
              className="w-full lg:basis-4/6"
            /> */}
            <ProductGallery
              className="lg:basis-7/12"
              images={[product.featuredImage, ...product.images]}
            />
            {/* <Gallery images={[product.featuredImage, ...product.images]} /> */}
            <div className="flex flex-col lg:basis-5/12">
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
              <AddToCartButton
                variants={product.variants}
                availableForSale={product.availableForSale}
                className="py-6"
              />
              <div className="pt-2">
                <h3 className="font-bold leading-relaxed text-lg">
                  Product description
                </h3>
                <p className="prose max-w-full leading-snug">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
