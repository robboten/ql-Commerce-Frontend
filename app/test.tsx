import Price from "@/components/price";
import { getPages, getProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function TestComponent() {
  const items = await getPages();
  const products = await getProducts({ query: "" });
  //  console.log(products);
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
                src={`https://picsum.photos/seed/xyz${i}/800`}
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
            {/* <time className="text-xl font-bold mb-3" dateTime={f.createdAt}>
              {new Intl.DateTimeFormat().format(new Date(f.createdAt))}
            </time> */}
            <p className="text-sm">{body[0]}</p>
            {/* <div className="prose">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div> */}
          </Link>
        );
      })}
    </div>
  );
}
