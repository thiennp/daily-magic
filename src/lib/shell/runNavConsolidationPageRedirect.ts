import { permanentRedirect } from "next/navigation";

import { getAuthActor } from "@/lib/auth/auth";
import { resolveNavConsolidationRedirectPath } from "@/lib/shell/resolveNavConsolidationRedirect";
import type { NavConsolidationIntent } from "@/lib/shell/navConsolidationIntent.constant";

/** Shared 308 entry for retired top-level nav routes. */
export const runNavConsolidationPageRedirect = async (input: {
  readonly intent: NavConsolidationIntent;
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
  readonly hashQuery?: Readonly<Record<string, string>>;
}): Promise<never> => {
  const searchParams = await input.searchParams;
  const actor = await getAuthActor();
  const destination = await resolveNavConsolidationRedirectPath({
    intent: input.intent,
    searchParams,
    actorUserId: actor?.id ?? null,
    hashQuery: input.hashQuery,
  });
  permanentRedirect(destination);
};
