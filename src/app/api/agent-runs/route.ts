import { enrichAgentRunRecords } from "@/lib/dispatch/enrichAgentRunRecords";
import { expireStaleDispatchApprovals } from "@/lib/dispatch/expireStaleDispatchApprovals";
import { listAgentRunsForUser } from "@/lib/dispatch/listAgentRunsForUser";
import { parseAgentRunListFilters } from "@/lib/dispatch/parseAgentRunListFilters";
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

  const filters = await parseAgentRunListFilters(actor.id, request);
  if (filters.forbidden === true) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  const runs = await listAgentRunsForUser(actor.id, filters);
  const enrichedRuns = await enrichAgentRunRecords(runs);

  return Response.json({ ok: true, runs: enrichedRuns });
}
