import { Product } from "@/lib/api/types";
import ProductGridCard from "./product-grid-card";

export default async function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid grid-cols-auto-fit-100 auto-rows-auto grid-flow gap-x-3 gap-y-10 w-full">
      {products.map((product) => {
        return <ProductGridCard key={product.id} product={product} />;
      })}
    </div>
  );
}
