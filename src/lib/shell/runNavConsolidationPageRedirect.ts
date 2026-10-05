import { getAuthActor } from "@/lib/auth/auth";
import { redirectForSession } from "@/lib/shell/redirectForSession";
import { resolveNavConsolidationRedirectPath } from "@/lib/shell/resolveNavConsolidationRedirect";
import type { NavConsolidationIntent } from "@/lib/shell/navConsolidationIntent.constant";

/**
 * Shared entry for retired top-level nav routes.
 * Signed-in → 308 to a stable project tab / intent notice.
 * Signed-out → 307 so browsers do not cache a session-dependent hop
 * (e.g. login callback back to the same legacy URL would loop on a 308).
 */
export const runNavConsolidationPageRedirect = async (input: {
  readonly intent: NavConsolidationIntent;
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
  readonly hashQuery?: Readonly<Record<string, string>>;
}): Promise<never> => {
  const searchParams = await input.searchParams;
  const actor = await getAuthActor();
  const actorUserId = actor?.id ?? null;
  const destination = await resolveNavConsolidationRedirectPath({
    intent: input.intent,
    searchParams,
    actorUserId,
    hashQuery: input.hashQuery,
  });
  return redirectForSession(destination, actorUserId);
};
