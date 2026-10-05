import { permanentRedirect } from "next/navigation";

import { getAuthActor } from "@/lib/auth/auth";
import { lookupAgentRunProjectId } from "@/lib/dispatch/lookupAgentRunProjectId";
import { resolveLegacyItemRedirectPath } from "@/lib/shell/resolveLegacyItemRedirectPath";

export const dynamic = "force-dynamic";

interface ReportsRunPageProps {
  readonly params: Promise<{ readonly runId: string }>;
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * /reports/<id> → /projects/<report.project_id>#reports?report=<id>.
 * Missing / no access → /projects?intent=reports. Never 500.
 */
export default async function ReportsRunPage({
  params,
  searchParams,
}: ReportsRunPageProps) {
  const { runId } = await params;
  const query = await searchParams;
  const actor = await getAuthActor();

  permanentRedirect(
    await resolveLegacyItemRedirectPath({
      intent: "reports",
      legacyPath: `/reports/${encodeURIComponent(runId.trim())}`,
      itemId: runId,
      searchParams: query,
      actorUserId: actor?.id ?? null,
      lookupProjectId: lookupAgentRunProjectId,
    }),
  );
}
