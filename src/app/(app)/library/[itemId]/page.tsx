import { getAuthActor } from "@/lib/auth/auth";
import { lookupLibraryItemProjectId } from "@/lib/library/lookupLibraryItemProjectId";
import { redirectForSession } from "@/lib/shell/redirectForSession";
import { resolveLegacyItemRedirectPath } from "@/lib/shell/resolveLegacyItemRedirectPath";

export const dynamic = "force-dynamic";

interface LibraryItemPageProps {
  readonly params: Promise<{ itemId: string }>;
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** /library/<id> → /projects/<item.project_id>#library?item=<id>. Never 500. */
export default async function LibraryItemPage({
  params,
  searchParams,
}: LibraryItemPageProps) {
  const { itemId } = await params;
  const query = await searchParams;
  const actor = await getAuthActor();
  const actorUserId = actor?.id ?? null;

  const destination = await resolveLegacyItemRedirectPath({
    intent: "library",
    legacyPath: `/library/${encodeURIComponent(itemId.trim())}`,
    itemId,
    searchParams: query,
    actorUserId,
    lookupProjectId: lookupLibraryItemProjectId,
  });

  return redirectForSession(destination, actorUserId);
}
