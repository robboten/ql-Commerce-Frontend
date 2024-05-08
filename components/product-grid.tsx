import Price from "@/components/price";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/api/types";
import Image from "next/image";
import Link from "next/link";

export default async function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid grid-cols-auto-fit-100 auto-rows-auto grid-flow gap-x-3 gap-y-10 w-full">
      {products.map((f, i) => {
        const body = f.description.split("\n");

        return (
          <Link
            key={i}
            href={`/product/${f.handle}`}
            className="grid grid-rows-subgrid row-span-4 h-full gap-0"
          >
            <div className="relative w-full aspect-square lg:aspect-[2/3] object-cover">
              <Image
                src={f.featuredImage.url}
                alt="alt"
                fill
                // width={300}
                // height={300}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="mt-2 mb-1 text-xl">{f.title}</h3>
            <span className="font-semibold mb-2 text-xl">
              <Price amount={f.priceRange.minVariantPrice} className="inline" />
            </span>
            <p className="text-sm">{body[0]}</p>
          </Link>
        );
      })}
    </div>
  );
}
