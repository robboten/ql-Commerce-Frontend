"use server";

import { getCollectionProducts } from "@/lib/api";

export async function getItems(collection: string, cursor: string | undefined) {
  const Items = await getCollectionProducts({
    collection: collection,
    after: cursor,
    //sortKey: sortKey,
    // reverse
  });
  return Items;
}
