import { permanentRedirect } from "next/navigation";

import { getAuthActor } from "@/lib/auth/auth";
import { resolveNavConsolidationRedirectPath } from "@/lib/shell/resolveNavConsolidationRedirect";

export const dynamic = "force-dynamic";

interface LibraryItemPageProps {
  readonly params: Promise<{ itemId: string }>;
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
}

/**
 * Soft item redirect: no reliable project_id on library items yet → intent notice.
 * Honors ?project= when openable. Never 500.
 */
export default async function LibraryItemPage({
  params,
  searchParams,
}: LibraryItemPageProps) {
  const { itemId } = await params;
  const query = await searchParams;
  const actor = await getAuthActor();
  const trimmedId = itemId.trim();

  const destination = await resolveNavConsolidationRedirectPath({
    intent: "library",
    searchParams: query,
    actorUserId: actor?.id ?? null,
    hashQuery: trimmedId.length > 0 ? { item: trimmedId } : {},
  });

  permanentRedirect(destination);
}
