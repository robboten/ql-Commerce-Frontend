import { FullWidthField } from "@/components/full-w-field";
import ProductGrid from "@/components/product-grid";
import { getCollection, getCollectionProducts } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  //const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    //sortKey: sortKey,
    // reverse
  });

  const collection = await getCollection(params.collection);

  return (
    <section className="container flex flex-col items-center justify-center space-y-8">
      <FullWidthField className="p-8 text-center">
        <h1 className="text-3xl font-semibold tracking-widest">
          {collection?.title}
        </h1>
        <p className="text-sm w-10/12 md:w-6/12 my-2">
          {collection?.description}
        </p>
      </FullWidthField>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}
