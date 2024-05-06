export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type PagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type SEO = {
  title: string;
  description: string;
};

export type Product = Omit<ApiProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ApiProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: number;
    minVariantPrice: number;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: number;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type ProductOperation = {
  data: { product: ApiProduct };
  variables: {
    handle: string;
  };
};

export type ProductsOperation = {
  data: {
    products: Connection<ApiProduct>;
  };
  variables: {
    first?: number;
    query?: string;
    order_by?: Array<
      Record<string, string> | Record<string, Record<string, string>>
    >;
  };
};

export type ProductsCollectionOperation = {
  data: {
    collection: {
      products: Connection<ApiProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
    order_by?: Array<
      Record<string, string> | Record<string, Record<string, string>>
    >;
  };
};

//Needed?
export type Collection = ApiCollection & {
  path: string;
};

export type ApiCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type CollectionOperation = {
  data: {
    collection: Collection;
  };
  variables: {
    handle: string;
  };
};

export type CollectionsOperation = {
  data: {
    collections: Connection<Collection>;
  };
};
