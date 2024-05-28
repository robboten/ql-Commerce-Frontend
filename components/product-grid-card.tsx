import Price from "@/components/price";
import { Product } from "@/lib/api/types";
import Image from "next/image";
import Link from "next/link";
import landscape from "../public/images/placeholders/4-3a.png";
export default function ProductGridCard({ product }: { product: Product }) {
  const body = product.description.split("\n");
  return (
    <Link
      href={`/product/${product.handle}`}
      className="grid grid-rows-subgrid row-span-4 h-full gap-0"
    >
      <div className="relative w-full aspect-square lg:aspect-[2/3] object-cover">
        <Image
          src={landscape}
          alt="alt"
          fill
          // width={300}
          // height={300}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-2 mb-1 text-xl">{product.title}</h3>
      <span className="font-semibold mb-2 text-xl">
        <Price amount={product.priceRange.minVariantPrice} className="inline" />
      </span>
      <p className="text-sm">{body[0]}</p>
    </Link>
  );
}
