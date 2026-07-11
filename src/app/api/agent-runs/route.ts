import { enrichAgentRunRecords } from "@/lib/dispatch/enrichAgentRunRecords";
import { expireStaleDispatchApprovals } from "@/lib/dispatch/expireStaleDispatchApprovals";
import { listAgentRunsForUser } from "@/lib/dispatch/listAgentRunsForUser";
import { isAgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { ensureDispatchApprovalsHydrated } from "@/lib/dispatch/restoreDispatchApprovalRegistry";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  ensureDispatchApprovalsHydrated();
  await expireStaleDispatchApprovals();

  const url = new URL(request.url);
  const statusParam = url.searchParams.get("status");
  const status =
    statusParam !== null && isAgentRunStatus(statusParam)
      ? statusParam
      : undefined;

  const runs = await listAgentRunsForUser(actor.id, { status });
  const enrichedRuns = await enrichAgentRunRecords(runs);

  return Response.json({ ok: true, runs: enrichedRuns });
}
