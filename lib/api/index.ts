import { getPagesQuery } from "./queries/page";
import { ApiPagesOperation, Connection, Page } from "./types";

const domain = process.env.GRAPHQL_API_DOMAIN;
const url = process.env.GRAPHQL_API_URL;

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
