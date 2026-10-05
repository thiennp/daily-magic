import { buildLoginCallbackPath } from "@/lib/shell/buildLoginCallbackPath";
import { resolveNavConsolidationRedirectPath } from "@/lib/shell/resolveNavConsolidationRedirect";

type LegacyItemIntent = "library" | "reports";
type SearchParams = Readonly<Record<string, string | string[] | undefined>>;

const HASH_KEY: Readonly<Record<LegacyItemIntent, string>> = {
  library: "item",
  reports: "report",
};

/**
 * `/library/<id>` and `/reports/<id>` → the item's own project tab.
 * Since migration 069 every library item and report has a project_id, so the
 * item's project wins over any `?project=`. Missing, no access, or a failed
 * lookup → `/projects?intent=…` notice. Signed out → login, then back here.
 * Never throws.
 */
export const resolveLegacyItemRedirectPath = async (input: {
  readonly intent: LegacyItemIntent;
  readonly legacyPath: string;
  readonly itemId: string;
  readonly searchParams: SearchParams;
  readonly actorUserId: string | null;
  readonly lookupProjectId: (itemId: string) => Promise<string | null>;
}): Promise<string> => {
  if (input.actorUserId === null) {
    return buildLoginCallbackPath(input.legacyPath, input.searchParams);
  }
  const itemId = input.itemId.trim();
  const projectId =
    itemId.length > 0
      ? await input.lookupProjectId(itemId).catch(() => null)
      : null;
  const searchParams: SearchParams =
    projectId !== null && projectId.length > 0
      ? { ...input.searchParams, project: projectId }
      : input.searchParams;
  return resolveNavConsolidationRedirectPath({
    intent: input.intent,
    searchParams,
    actorUserId: input.actorUserId,
    hashQuery: itemId.length > 0 ? { [HASH_KEY[input.intent]]: itemId } : {},
  });
};
