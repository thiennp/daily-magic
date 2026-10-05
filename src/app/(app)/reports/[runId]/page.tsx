import { permanentRedirect } from "next/navigation";

import { getAuthActor } from "@/lib/auth/auth";
import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import {
  buildIntentProjectTabRedirectPath,
  buildProjectsIntentRedirectPath,
} from "@/lib/shell/buildNavConsolidationRedirect";

export const dynamic = "force-dynamic";

interface ReportsRunPageProps {
  readonly params: Promise<{ readonly runId: string }>;
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
}

/**
 * /reports/<id> → project #reports?report=<id> when run has an openable project.
 * Missing / no-access / no project_id → /projects?intent=reports. Never 500.
 */
export default async function ReportsRunPage({
  params,
  searchParams,
}: ReportsRunPageProps) {
  const { runId } = await params;
  const query = await searchParams;
  const listPath = buildProjectsIntentRedirectPath("reports", query);

  try {
    const actor = await getAuthActor();
    if (!actor) {
      permanentRedirect(listPath);
    }

    const run = await getAgentRunForParticipant(runId.trim(), actor.id);
    const projectId = run?.projectId ?? null;
    if (projectId === null || projectId.length === 0) {
      permanentRedirect(listPath);
    }

    const access = await authorizeProjectPageActor({
      projectId,
      actorUserId: actor.id,
    });
    if (!access.ok) {
      permanentRedirect(listPath);
    }

    permanentRedirect(
      buildIntentProjectTabRedirectPath(projectId, "reports", {
        report: runId.trim(),
      }),
    );
  } catch (error) {
    if (
      error !== null &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: unknown }).digest === "string" &&
      String((error as { digest: string }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    permanentRedirect(listPath);
  }
}
