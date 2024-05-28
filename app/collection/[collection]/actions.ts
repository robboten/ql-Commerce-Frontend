"use server";
import { apiFetch, removeEdges, reshapeProductsFromEdges } from "@/lib/api";
import { getCollectionProductsQuery } from "@/lib/api/queries/collection";
import { ApiProduct, ProductsCollectionOperation } from "@/lib/api/types";
import { TAGS } from "@/lib/constants";

export async function getColl(handle: string, cursor: string) {
  const variables = {
    handle: handle,
    after: cursor,
  };
  console.log("vars", variables);
  const res = await apiFetch<ProductsCollectionOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: variables,
  });
  return {
    count: res.body.data.collection.products.totalCount,
    products: reshapeProductsFromEdges(
      removeEdges<ApiProduct>(res.body.data.collection.products)
    ),
    pageInfo: res.body.data.collection.products.pageInfo,
  };
}
