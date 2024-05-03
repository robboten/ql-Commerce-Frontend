import { getPages, getProducts } from "@/lib/api";
import Image from "next/image";

export default async function TestComponent() {
  const items = await getPages();
  const products = await getProducts({ query: "" });
  console.log(products);
  return (
    <div className="grid  grid-cols-auto-fit-100 auto-rows-auto grid-flow-dense gap-x-4 gap-y-8 w-full">
      {products.map((f, i) => {
        const body = f.description.split("\n");
        console.log(body.length);
        return (
          <div
            key={i}
            className="grid grid-rows-subgrid row-span-4 h-full gap-2"
          >
            <div className="relative w-full h-full aspect-square object-contain">
              <Image
                src={`https://picsum.photos/seed/xyz${i}/800`}
                alt="alt"
                fill
                // width={300}
                // height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="text-xl mb-1">{f.title}</h2>
            <span className="text-xl font-bold mb-3">
              {f.priceRange.minVariantPrice}
            </span>
            {/* <time className="text-xl font-bold mb-3" dateTime={f.createdAt}>
              {new Intl.DateTimeFormat().format(new Date(f.createdAt))}
            </time> */}
            {/* <p>{f.description}</p> */}
            <div className="prose">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
