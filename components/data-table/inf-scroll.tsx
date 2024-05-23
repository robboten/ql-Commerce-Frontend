"use client";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { getItems } from "./actions";
import { PageInfo, Product } from "@/lib/api/types";
import { useEffect, useState } from "react";
import ProductGridCard from "../product-grid-card";

export function ScrollLoader() {
  return (
    <div>
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  );
}

export function InfiniteScroll({
  initialItems,
  collection,
  pageInfo,
}: {
  initialItems: Product[];
  collection: string;
  pageInfo?: PageInfo;
}) {
  const { ref, inView, entry } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const [hasMoreItems, setHasMoreItems] = useState(pageInfo?.hasNextPage);
  const [currentCursor, setCurrentCursor] = useState(pageInfo?.endCursor);
  const [items, setItems] = useState(initialItems);

  const loadMoreItems = async () => {
    if (hasMoreItems) {
      const items = await getItems(collection, currentCursor);
      setItems((prevItems) => [...prevItems, ...items.products]);
      setHasMoreItems(items.pageInfo?.hasNextPage);
      setCurrentCursor(items.pageInfo?.endCursor);
      console.log(items);
    }
  };

  useEffect(() => {
    if (hasMoreItems && inView) {
      loadMoreItems();
    }
  }, [inView, hasMoreItems]);

  return (
    <div className="grid grid-cols-auto-fit-100 auto-rows-auto grid-flow gap-x-3 gap-y-10 w-full">
      {items.map((product) => {
        return <ProductGridCard key={product.id} product={product} />;
      })}
      {hasMoreItems && (
        <div
          ref={ref}
          className="w-full flex justify-center flex-col items-center"
        >
          <h2>{`Header inside viewport ${inView}.`}</h2>
          <ScrollLoader />
        </div>
      )}
    </div>
  );
}
