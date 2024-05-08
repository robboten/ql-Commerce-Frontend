import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  children: ReactNode;
  overlayClassname?: string;
}
export const Banner = ({
  imgSrc,
  children,
  className,
  overlayClassname,
  ...props
}: BannerProps) => {
  return (
    <div
      className={cn(
        "w-[100vw] relative h-[24rem] -mx-[50vw] bg-muted",
        className
      )}
    >
      <Image
        src={imgSrc}
        alt="alt"
        width={500}
        height={500}
        className="absolute inset-0 h-full w-full object-cover "
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-black from-60% mix-blend-multiply",
          overlayClassname
        )}
      />
      {children}
    </div>
  );
};
