"use client";
import { ArrowBigUp, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { PageInfo, Product } from "@/lib/api/types";
import { useEffect, useState } from "react";
import ProductGridCard from "../product-grid-card";
import { getCollectionProducts } from "@/lib/api";
import { getColl } from "@/app/collection/[collection]/actions";
import ScrollToTop from "./to-top";

export function InfiniteScroll({
  initialItems,
  collection,
  pageInfo,
}: {
  initialItems: Product[];
  collection: string;
  pageInfo?: PageInfo;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [ref2, inView2] = useInView({ threshold: 0.1 });

  const [hasMoreItems, setHasMoreItems] = useState(pageInfo?.hasNextPage);
  const [currentCursor, setCurrentCursor] = useState(pageInfo?.endCursor);
  const [items, setItems] = useState(initialItems);
  const [showScroll, setShowScroll] = useState(false);

  const loadMoreItems = async () => {
    if (hasMoreItems) {
      try {
        const { products, pageInfo } = await getColl(
          collection,
          currentCursor!
        );
        setItems((prevItems) => [...prevItems, ...products]);
        setHasMoreItems(pageInfo?.hasNextPage);
        setCurrentCursor(pageInfo?.endCursor);
      } catch {
        console.error("nope");
      }
    }
  };

  useEffect(() => {
    if (hasMoreItems && inView) {
      loadMoreItems();
    }
  }, [inView, hasMoreItems]);

  useEffect(() => {
    if (inView2) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  }, [inView2]);

  return (
    <>
      <ScrollToTop />
      <div
        ref={ref2}
        className="grid grid-cols-auto-fit-100 auto-rows-auto grid-flow gap-x-3 gap-y-10 w-full"
      >
        {items.map((product) => {
          return <ProductGridCard key={product.id} product={product} />;
        })}
      </div>
      {hasMoreItems && (
        <div
          ref={ref}
          className="w-full text-zinc-400 flex justify-center flex-col items-center py-4"
        >
          <Loader2 aria-label="Loading" className="h-16 w-16 animate-spin" />
        </div>
      )}
    </>
  );
}
