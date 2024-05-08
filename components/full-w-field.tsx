import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  overlayClassname?: string;
}
export const FullWidthField = ({
  children,
  className,
  overlayClassname,
  ...props
}: BannerProps) => {
  return (
    <div className={cn("w-[100vw] relative h-auto -mx-[50vw]", className)}>
      <div
        style={{
          backgroundColor: [
            "PowderBlue",
            "LightCyan",
            "LavenderBlush",
            "LemonChiffon",
            "Lavender",
            "LightGreen",
            "Gainsboro",
          ].sort(() => Math.random() - 0.5)[0],
        }}
        className={cn("absolute inset-0", overlayClassname)}
      />
      <div className="relative items-center justify-center flex  flex-col">
        {children}
      </div>
    </div>
  );
};
