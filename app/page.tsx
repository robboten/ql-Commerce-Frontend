import Image from "next/image";
import TestComponent from "./test";
import { Skeleton } from "@/components/ui/skeleton";
import { TopNav } from "./_components/top-nav";
import { getCollectionProducts, getCollections } from "@/lib/api";
import Link from "next/link";
import clsx from "clsx";
import Price from "@/components/price";

// export const metadata = {
//   description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
//   openGraph: {
//     type: 'website'
//   }
// };

export default async function Home() {
  const homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });
  const limitedItems = homepageItems.slice(0, 3);
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between space-y-8">
      {/* brightness-150 saturate-0 <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" /> */}
      {/* Thick banner */}
      <div className="w-[100vw] relative h-[28rem] -mx-[50vw] bg-muted ">
        <Image
          src="https://picsum.photos/seed/x/600"
          alt="alt"
          width={500}
          height={500}
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black from-60% mix-blend-multiply" />
        <div className="text-white text-2xl absolute w-auto sm:w-[500px] h-full inset-6 sm:inset-28">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, magnam.
          Nesciunt, ad corporis in veniam ea quis saepe repellat aspernatur
          provident a qui hic quibusdam iure dolorem. Sit, rem eum. sdfsdf dsrga
          rgrege erwregerge
        </div>
      </div>
      <section className="mx-auto grid w-full grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        {limitedItems.map((product, i) => {
          return (
            <div
              key={i}
              className={clsx(i === 0 && "row-span-2 md:col-span-2")}
            >
              <Link
                className="relative block aspect-square h-full w-full rounded-sm overflow-hidden"
                href={`/product/${product.handle}`}
              >
                <Image
                  src={product.featuredImage.url} //"https://picsum.photos/seed/3/400"
                  alt={product.featuredImage.altText}
                  fill
                  sizes={
                    i === 0
                      ? "(min-width: 768px) 66vw, 100vw"
                      : "(min-width: 200px) 33vw, 100vw"
                  }
                  className="h-full w-full object-cover relative"
                />
                <div
                  className={clsx(
                    "absolute bottom-0 left-0 flex justify-end w-full px-2 pb-4 @container/label",
                    "lg:pe-8 lg:pb-8"
                  )}
                >
                  <div className="flex items-center rounded-full border bg-white/80 p-1 ps-2 text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white text-md sm:text-lg">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-tight tracking-tight ">
                      {product.title}
                    </h3>
                    <div className="flex gap-1 h-full items-center flex-nowrap bg-slate-600/60 text-white text-md font-normal px-3 py-1 rounded-full">
                      <Price amount={product.priceRange.minVariantPrice} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
      {/* Thin banner */}
      <div className="w-[100vw] relative h-[10rem] -mx-[50vw] bg-muted">
        <Image
          src="https://picsum.photos/seed/65y/600/200"
          alt="alt"
          width={600}
          height={200}
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black from-40% mix-blend-multiply opacity-80" />
        <div className="text-white text-xl absolute sm:w-[400px] h-full inset-12 sm:ms-[20%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, magnam.
        </div>
      </div>
      <TestComponent />

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
