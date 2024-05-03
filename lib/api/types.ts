export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type ApiPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
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

export type SEO = {
  title: string;
  description: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
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
  amount: string;
  currencyCode: string;
};

export type CollectionProductsOperation = {
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

export type ProductsOperation = {
  data: {
    products: Connection<ApiProduct>;
  };
  variables: {
    query?: string;
    order_by?: Array<
      Record<string, string> | Record<string, Record<string, string>>
    >;
  };
};
