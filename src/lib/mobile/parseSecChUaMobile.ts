/**
 * `Sec-CH-UA-Mobile` structured-header boolean: `?1` → true, `?0` → false,
 * missing / anything else → null (unknown).
 */
export default function parseSecChUaMobile(
  headerValue: string | null | undefined,
): boolean | null {
  const normalized = headerValue?.trim();

  if (normalized === "?1") {
    return true;
  }

  if (normalized === "?0") {
    return false;
  }

  return null;
}
