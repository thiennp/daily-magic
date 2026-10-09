import { buildPostAuthReturn } from "@/lib/auth/buildPostAuthReturn";

/** Same-site path only: browsers read "/\\x" like "//x", and control characters split headers. */
export const isSafeAppCallbackPath = (path: string): boolean =>
  path.startsWith("/") &&
  !path.startsWith("//") &&
  !/[\\\u0000-\u001f\u007f]/.test(path) &&
  !/%5c|%0[0-9a-f]/i.test(path);

/** Derive post-auth destination from current page query (marketing home, login, etc.). */
export const resolvePostAuthReturnFromSearchParams = (
  searchParams: URLSearchParams,
): string => {
  const explicitCallback = searchParams.get("callbackUrl")?.trim();

  if (
    explicitCallback !== undefined &&
    explicitCallback.length > 0 &&
    isSafeAppCallbackPath(explicitCallback)
  ) {
    return explicitCallback;
  }

  const capabilityId = searchParams.get("capabilityId")?.trim() ?? "";
  const sendTask =
    searchParams.get("sendTask") === "1" || searchParams.has("sendTask");

  if (capabilityId.length > 0) {
    return buildPostAuthReturn({
      next: "/marketplace",
      capabilityId,
      sendTask: sendTask || undefined,
    });
  }

  if (sendTask) {
    return buildPostAuthReturn({ sendTask: true });
  }

  return buildPostAuthReturn();
};
