export const AW_LOCAL_TOKEN_HASH_QUERY = "awLocalTokenHash";

export const consumeLocalTokenHashQueryParam = (input: {
  readonly href: string;
  readonly setTokenHash: (tokenHash: string) => void;
  readonly replaceUrl: (nextUrl: string) => void;
}): boolean => {
  const url = new URL(input.href);
  const fromQuery = url.searchParams.get(AW_LOCAL_TOKEN_HASH_QUERY)?.trim();
  if (fromQuery === undefined || fromQuery.length === 0) {
    return false;
  }

  input.setTokenHash(fromQuery);
  url.searchParams.delete(AW_LOCAL_TOKEN_HASH_QUERY);
  input.replaceUrl(`${url.pathname}${url.search}${url.hash}`);
  return true;
};
