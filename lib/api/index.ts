import { getPagesQuery } from "./queries/page";
import { getProductsQuery } from "./queries/product";
import {
  ApiPagesOperation,
  ApiProduct,
  Connection,
  Page,
  Product,
  Image,
  ProductsOperation,
} from "./types";

const domain = process.env.GRAPHQL_API_DOMAIN;
const url = process.env.GRAPHQL_API_URL;
export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";

const endpoint = `${domain}${url}`;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function apiFetch<T>({
  cache = "no-store",
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
  console.log("fetch", endpoint, query);
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
    });
    const body = await result.json();

    console.log(body);
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

export async function getPages(): Promise<Page[]> {
  const res = await apiFetch<ApiPagesOperation>({
    query: getPagesQuery,
  });
  console.log(removeEdgesAndNodes(res.body.data.pages));
  return removeEdgesAndNodes(res.body.data.pages);
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
    //tags: [TAGS.products],
    variables: {
      query,
      order_by: queryOrder,
    },
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

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
