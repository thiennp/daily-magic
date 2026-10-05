/** `/login?callbackUrl=<path+query>` so a signed-out visitor comes back to the same deep link. */
export const buildLoginCallbackPath = (
  path: string,
  searchParams: Readonly<Record<string, string | string[] | undefined>> = {},
): string => {
  const params = new URLSearchParams();
  for (const [key, raw] of Object.entries(searchParams)) {
    if (typeof raw === "string" && raw.length > 0) {
      params.set(key, raw);
    } else if (Array.isArray(raw)) {
      for (const entry of raw) {
        if (typeof entry === "string" && entry.length > 0) {
          params.append(key, entry);
        }
      }
    }
  }
  const query = params.toString();
  const target = query.length > 0 ? `${path}?${query}` : path;
  return `/login?callbackUrl=${encodeURIComponent(target)}`;
};
