import { enrichAgentRunRecords } from "@/lib/dispatch/enrichAgentRunRecords";
import { listAgentRunsForGroup } from "@/lib/dispatch/listAgentRunsForGroup";
import { getMembershipForUserInGroup } from "@/lib/auth/groupMembershipQueries";
import { canConfigureGroupDispatchPolicy } from "@/lib/dispatch/canConfigureGroupDispatchPolicy";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly groupId: string;
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

  const { groupId } = await context.params;
  const membership = await getMembershipForUserInGroup(groupId, actor.id);

  if (!canConfigureGroupDispatchPolicy(actor, membership)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  const runs = await listAgentRunsForGroup(groupId);
  const enrichedRuns = await enrichAgentRunRecords(runs);

  return Response.json({ ok: true, runs: enrichedRuns });
}
