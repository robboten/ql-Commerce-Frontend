"use client";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Image as ImageType } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import square from "../public/images/placeholders/1-1a.png";
import landscape from "../public/images/placeholders/4-3a.png";

export function ProductGallery({
  images,
  className,
}: {
  images: ImageType[];
  className?: string;
}) {
  const [mainApi, setApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="relative max-h-[480] min-h-[80px] aspect-[4/3]"
        >
          <Image
            src={landscape}
            alt={image.altText}
            fill
            className="object-cover "
          />
        </CarouselItem>
      )),
    [images]
  );
  const thumbnailImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="relative aspect-square flex-1 basis-1/4 cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <Image
            className={cn(
              "box-border  border-transparent object-cover fit",
              index === current ? "border-2" : ""
            )}
            src={square}
            fill
            alt={image.altText}
          />
        </CarouselItem>
      )),
    [images, current]
  );
  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return;
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApi.scrollTo(selected);
    };

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap();
      setCurrent(selected);
      mainApi.scrollTo(selected);
    };

    setCurrent(mainApi.selectedScrollSnap() - 1);
    mainApi.on("select", handleTopSelect);
    thumbnailApi.on("select", handleBottomSelect);

    return () => {
      mainApi.off("select", handleTopSelect);
      thumbnailApi.off("select", handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

  const handleClick = (index: number) => {
    if (!mainApi || !thumbnailApi) {
      return;
    }
    thumbnailApi.scrollTo(index);
    mainApi.scrollTo(index);
    setCurrent(index);
  };
  return (
    <div className={cn("w-full space-y-4", className)}>
      <Carousel setApi={setApi}>
        <CarouselContent>{mainImage}</CarouselContent>
        <CarouselDots className="pt-4 sm:hidden" />
      </Carousel>
      <Carousel setApi={setThumbnailApi} className="hidden sm:block">
        <CarouselContent className="ml-0">{thumbnailImages}</CarouselContent>
      </Carousel>
    </div>
  );
}
