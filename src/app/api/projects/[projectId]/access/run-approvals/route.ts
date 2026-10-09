import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { listProjectPendingRunApprovals } from "@/lib/projects/acl/runApprovals/listProjectPendingRunApprovals";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

const statusFor = (code: string): number => {
  if (code === "forbidden") return 403;
  if (code === "not_found") return 404;
  return 400;
};

/**
 * Owner-only list of PENDING computer-run approvals for this project
 * (reopenable after the live popup closes).
 * GET → { ok, approvals: ComputerRunApprovalPayload[] }.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;

  const { projectId } = await context.params;
  const decision = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!decision.allow) {
    return projectAccessErrorJson(decision.reason, statusFor(decision.reason));
  }

  const approvals = await listProjectPendingRunApprovals({
    projectId,
    executorUserId: actor.id,
  });
  return Response.json({ ok: true, approvals });
}
