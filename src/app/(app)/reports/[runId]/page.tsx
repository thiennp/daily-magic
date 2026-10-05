import { permanentRedirect, redirect } from "next/navigation";

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
  const actorUserId = actor?.id ?? null;

  const destination = await resolveLegacyItemRedirectPath({
    intent: "reports",
    legacyPath: `/reports/${encodeURIComponent(runId.trim())}`,
    itemId: runId,
    searchParams: query,
    actorUserId,
    lookupProjectId: lookupAgentRunProjectId,
  });

  // Signed-out goes to login with callback = this legacy URL. A 308 would be
  // cached and loop after sign-in; use 307 for session-dependent hops.
  if (actorUserId === null) {
    redirect(destination);
  }
  permanentRedirect(destination);
}
