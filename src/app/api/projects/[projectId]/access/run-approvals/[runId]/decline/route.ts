import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { respondComputerRunApproval } from "@/lib/projects/acl/runApprovals/respondComputerRunApproval";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly runId: string }>;
};

const statusFor = (code: string): number => {
  if (code === "forbidden") return 403;
  if (code === "not_found") return 404;
  if (code === "invalid_transition") return 409;
  if (code === "invalid_arguments") return 400;
  return 400;
};

/** Owner POST: decline one PENDING computer-run approval (same transition as live). */
export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;

  const { projectId, runId } = await context.params;
  const decision = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!decision.allow) {
    return projectAccessErrorJson(decision.reason, statusFor(decision.reason));
  }

  const result = await respondComputerRunApproval({
    projectId,
    runId,
    actorUserId: actor.id,
    decision: "decline",
  });
  if (!result.ok) {
    return projectAccessErrorJson(result.code, statusFor(result.code));
  }
  return Response.json({ ok: true, runId: result.runId, state: result.state });
}
