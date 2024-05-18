import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <ShoppingCartIcon
        className={cn(
          "h-4 transition-all ease-in-out hover:scale-110 ",
          className
        )}
      />

      {quantity ? (
        <div className="absolute text-center right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-full bg-zinc-600 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
