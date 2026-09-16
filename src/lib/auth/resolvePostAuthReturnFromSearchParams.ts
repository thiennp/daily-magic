import { buildPostAuthReturn } from "@/lib/auth/buildPostAuthReturn";

const isSafeAppCallbackPath = (path: string): boolean =>
  path.startsWith("/") && !path.startsWith("//");

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
