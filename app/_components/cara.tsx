import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/lib/api/types";
import Link from "next/link";
import Image from "next/image";
import Price from "@/components/price";

export function CarouselSize({ products }: { products: Product[] }) {
  const prod = [...products, ...products, ...products];
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {prod.map((f, i) => {
          const body = f.description.split("\n");

          return (
            <CarouselItem key={i} className="basis-1/2 lg:basis-1/4">
              <div className="p-0">
                <Link
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
                    <Price
                      amount={f.priceRange.minVariantPrice}
                      className="inline"
                    />
                  </span>
                  <p className="text-sm">{body[0]}</p>
                </Link>
              </div>
            </CarouselItem>
          );
        })}
        {/* {Array.from({ length: 15 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots className="pt-4" />
    </Carousel>
  );
}
