import Image from "next/image";
import Price from "./price";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCollectionProducts } from "@/lib/api";
import landscape from "../public/images/placeholders/4-3a.png";
export default async function FeaturedItems() {
  const homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });
  const limitedItems = homepageItems.products.slice(0, 4);

  return (
    <section className="mx-auto grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-2 gap-4">
      {limitedItems.map((product, i) => {
        return (
          <div
            key={i}
            className={cn(
              i === 0 && "md:row-span-2 md:col-span-2",
              i === 3 && "row-span-1 md:col-span-2"
            )}
          >
            <Link
              className={cn(
                "relative block aspect-square lg:aspect-square h-full w-full overflow-hidden",
                i === 3 && "lg:aspect-[2/1] hidden lg:flex"
              )}
              href={`/product/${product.handle}`}
            >
              <Image
                src={landscape} //"https://picsum.photos/seed/3/400"
                alt={product.featuredImage.altText}
                fill
                sizes={
                  i === 0
                    ? "(min-width: 768px) 66vw, 100vw"
                    : "(min-width: 200px) 33vw, 100vw"
                }
                className="h-full w-full object-cover relative"
              />
              <div className="absolute bottom-0 right-0 flex justify-end w-full">
                <div className="flex p-4  items-end justify-center flex-col border bg-white/90 ps-2 text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white text-md sm:text-lg">
                  <h3 className="line-clamp-2 flex-grow pl-2 leading-tight tracking-tight">
                    {product.title}
                  </h3>
                  <Price
                    className="text-xl font-extrabold"
                    amount={product.priceRange.minVariantPrice}
                  />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
