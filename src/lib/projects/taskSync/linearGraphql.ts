export const LINEAR_GRAPHQL_URL = "https://api.linear.app/graphql";

/** HTTP / GraphQL failure; message never contains the token. */
export class LinearApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "LinearApiError";
    this.status = status;
  }
}

/**
 * The single place that talks to Linear. Returns `data`; throws LinearApiError
 * (status 401 = token rejected). Tests mock this module.
 */
export const linearGraphql = async <T>(
  token: string,
  query: string,
  variables: Readonly<Record<string, unknown>> = {},
): Promise<T> => {
  const res = await fetch(LINEAR_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json().catch(() => null)) as {
    data?: T;
    errors?: readonly {
      message?: string;
      extensions?: { code?: string };
    }[];
  } | null;
  if (!res.ok || json === null || json.data === undefined) {
    // Rate limits arrive as HTTP 400 with extensions.code RATELIMITED.
    const detail =
      json?.errors?.[0]?.extensions?.code === "RATELIMITED"
        ? "linear_rate_limited"
        : (json?.errors?.[0]?.message ?? "linear_request_failed");
    throw new LinearApiError(res.status, detail.slice(0, 200));
  }
  if (json.errors !== undefined && json.errors.length > 0) {
    throw new LinearApiError(
      200,
      (json.errors[0].message ?? "linear_error").slice(0, 200),
    );
  }
  return json.data;
};
