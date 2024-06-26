import { Banner } from "@/components/banner";
import FeaturedItems from "@/components/featured-items";
import { getCollectionProducts, getProducts } from "@/lib/api";
import { ProductCarousel } from "../components/product-carousel";
import ProductGrid from "../components/product-grid";

/**
 * TODO:
 * Footer
 * Search
 * Collection All
 * Sorting
 * Pagination
 * AI data
 * Checkout
 * Tax/Shipping rates
 * Dark mode
 * Category heroes
 **/

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js. Backend using GraphQl built with .net/Hot Chocolate",
  openGraph: {
    type: "website",
  },
};

export default async function Home() {
  const homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });
  const products = await getProducts({ query: "" });
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between space-y-8">
      <Banner imgSrc="https://picsum.photos/seed/x/600">
        <div className="text-white text-2xl  relative w-auto lg:w-[40%] h-full p-8 flex lg:ml-40 md:mx-20 items-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, magnam.
          Nesciunt, ad corporis in veniam ea quis saepe repellat aspernatur
          provident a qui hic quibusdam iure dolorem. Sit, rem eum. sdfsdf dsrga
          rgrege erwregerge
        </div>
      </Banner>
      <FeaturedItems />
      <ProductCarousel products={homepageItems.products} />
      <Banner
        imgSrc="https://picsum.photos/seed/65y/600/200"
        className="h-[10rem]"
        overlayClassname="from-black from-20%"
      >
        <div className="text-white text-xl absolute sm:w-[400px] h-full inset-12 sm:ms-[20%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, magnam.
        </div>
      </Banner>
      <ProductGrid products={products} />
    </main>
  );
}
