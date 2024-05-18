import { TAGS } from "../constants";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPagesQuery } from "./queries/page";
import { getProductQuery, getProductsQuery } from "./queries/product";
import {
  PagesOperation,
  ApiProduct,
  Connection,
  Page,
  Product,
  Image,
  ProductsOperation,
  Collection,
  CollectionsOperation,
  ApiCollection,
  ProductsCollectionOperation,
  ProductOperation,
  MenuOperation,
  Menu,
  CollectionOperation,
  ApiCart,
  Cart,
} from "./types";

const domain = process.env.GRAPHQL_API_DOMAIN;
const url = process.env.GRAPHQL_API_URL;
export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";

const endpoint = `${domain}${url}`;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function apiFetch<T>({
  cache = "no-store", //"no-store",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  //console.log("fetch", endpoint, query);
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });
    const body = await result.json();

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    throw {
      error: e,
      query,
    };
  }
}

export const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await apiFetch<MenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace("/collections", "/collection")
        .replace("/pages", ""),
    })) || []
  );
}

export async function getPages(): Promise<Page[]> {
  const res = await apiFetch<PagesOperation>({
    query: getPagesQuery,
  });
  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await apiFetch<ProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });
  return reshapeProduct(res.body.data.product, false);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const queryOrder = [
    sortKey === "price"
      ? { ["priceRange"]: { ["minVariantPrice"]: reverse ? "DESC" : "ASC" } }
      : { [sortKey ? sortKey : "title"]: reverse ? "DESC" : "ASC" },
  ];
  const res = await apiFetch<ProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      order_by: queryOrder,
      first: 20,
    },
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const queryOrder = [
    sortKey === "price"
      ? { ["priceRange"]: { ["minVariantPrice"]: reverse ? "DESC" : "ASC" } }
      : { [sortKey ? sortKey : "title"]: reverse ? "DESC" : "ASC" },
  ];
  const res = await apiFetch<ProductsCollectionOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      order_by: queryOrder,
    },
  });
  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products)
  );
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  const res = await apiFetch<CollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollections(): Promise<Collection[]> {
  const res = await apiFetch<CollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith("hidden")
    ),
  ];

  return collections;
}

//---------reshape
const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

const reshapeProduct = (
  product: ApiProduct,
  filterHiddenProducts: boolean = true
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  };
};

const reshapeProducts = (products: ApiProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

const reshapeCollection = (
  collection: ApiCollection
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`,
  };
};

const reshapeCollections = (collections: Collection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeCart = (cart: ApiCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: 0.0,
      currencyCode: "SEK",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

//---------------------
export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await apiFetch<CartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: "no-store",
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function createCart(): Promise<Cart> {
  const res = await apiFetch<CreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate);
}

export async function addToCart(
  cartId: string,
  lines: { id: number; quantity: number }[]
): Promise<Cart> {
  const res = await apiFetch<AddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });
  return reshapeCart(res.body.data.addToCart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const res = await apiFetch<RemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await apiFetch<UpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });
  return reshapeCart(res.body.data.cartLinesUpdate);
}
export type CartOperation = {
  data: {
    cart: ApiCart;
  };
  variables: {
    cartId: string;
  };
};

export type CreateCartWithLinesOperation = {
  data: { cartCreateWithItems: ApiCart };
  variables: {
    lines: {
      id: number;
      quantity: number;
    }[];
  };
};

export type CreateCartOperation = {
  data: { cartCreate: ApiCart };
};

export type AddToCartOperation = {
  data: {
    addToCart: ApiCart;
  };
  variables: {
    cartId: string;
    lines: {
      id: number;
      quantity: number;
    }[];
  };
};

export type RemoveFromCartOperation = {
  data: {
    cartLinesRemove: ApiCart;
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type UpdateCartOperation = {
  data: {
    cartLinesUpdate: ApiCart;
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};
