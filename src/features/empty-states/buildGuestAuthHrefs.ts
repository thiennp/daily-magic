import {
  buildPostAuthReturn,
  type BuildPostAuthReturnInput,
} from "@/lib/auth/buildPostAuthReturn";
import { resolvePostAuthReturnFromSearchParams } from "@/lib/auth/resolvePostAuthReturnFromSearchParams";

export const CREATE_FREE_ACCOUNT_HREF = "/#get-started";

export const buildSignInHref = (callbackPath: string): string =>
  `/login?callbackUrl=${encodeURIComponent(callbackPath)}`;

export const buildSignInHrefForPostAuthReturn = (
  input: BuildPostAuthReturnInput,
): string => buildSignInHref(buildPostAuthReturn(input));

export const buildSignInHrefFromSearchParams = (
  searchParams: URLSearchParams,
): string =>
  buildSignInHref(resolvePostAuthReturnFromSearchParams(searchParams));

/** Hero `#get-started` on `/` — carries capabilityId / sendTask in the query when present. */
export const buildMarketingGetStartedHref = (
  searchParams: URLSearchParams,
): string => {
  const capabilityId = searchParams.get("capabilityId")?.trim() ?? "";
  const sendTask =
    searchParams.get("sendTask") === "1" || searchParams.has("sendTask");

  if (capabilityId.length === 0 && !sendTask) {
    return CREATE_FREE_ACCOUNT_HREF;
  }

  const homeQueryPath = buildPostAuthReturn({
    next: "/",
    capabilityId: capabilityId.length > 0 ? capabilityId : undefined,
    sendTask: sendTask || undefined,
  });

  return `${homeQueryPath}#get-started`;
};

export const FIRST_TASK_SHOWCASE_HREF =
  "/showcases/first-agent-task-in-5-minutes";

export const MARKETPLACE_FREE_STARTERS_SECTION_ID = "free-starters";

export const marketplaceFreeStartersSectionHref = (): string =>
  `#${MARKETPLACE_FREE_STARTERS_SECTION_ID}`;
