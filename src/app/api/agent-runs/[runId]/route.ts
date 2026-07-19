import { enrichAgentRunRecord } from "@/lib/dispatch/enrichAgentRunRecords";
import { deleteAgentRunForParticipant } from "@/lib/dispatch/deleteAgentRunForParticipant";
import { expireStaleDispatchApprovals } from "@/lib/dispatch/expireStaleDispatchApprovals";
import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";
import { ensureDispatchApprovalsHydrated } from "@/lib/dispatch/restoreDispatchApprovalRegistry";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly runId: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  await ensureDispatchApprovalsHydrated();
  await expireStaleDispatchApprovals();

  const { runId } = await context.params;
  const run = await getAgentRunForParticipant(runId, actor.id);

  if (run === null) {
    return Response.json({ error: "Run not found." }, { status: 404 });
  }

  const enrichedRun = await enrichAgentRunRecord(run);

  return Response.json({ ok: true, run: enrichedRun });
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { runId } = await context.params;
  const deleted = await deleteAgentRunForParticipant(runId, actor.id);

  if (!deleted) {
    return Response.json({ error: "Run not found." }, { status: 404 });
  }

  return Response.json({ ok: true });
}
