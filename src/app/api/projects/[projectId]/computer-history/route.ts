import { requireAuth } from "@/lib/auth/requireAuth";
import { orchestrateProjectComputerHistory } from "@/lib/projects/acl/messaging/orchestrateProjectComputerHistory";
import { parseProjectComputerHistoryToggleBody } from "@/lib/projects/acl/messaging/parseProjectComputerHistoryToggleBody";
import { toProjectComputerHistoryResponse } from "@/lib/projects/acl/messaging/toProjectComputerHistoryResponse";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/** Owner: read the project computer history state. */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  return toProjectComputerHistoryResponse(
    await orchestrateProjectComputerHistory({
      kind: "owner_read",
      projectId: projectId.trim(),
      actorUserId: actor.id,
    }),
  );
}

/** Owner: opt in or out. Body `{ enabled: boolean }`. */
export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const body = parseProjectComputerHistoryToggleBody(
    await request.json().catch(() => null),
  );
  if (body === null) {
    return Response.json(
      { ok: false, errorMessage: "enabled must be true or false." },
      { status: 400 },
    );
  }
  const { projectId } = await context.params;
  return toProjectComputerHistoryResponse(
    await orchestrateProjectComputerHistory({
      kind: "owner_toggle",
      projectId: projectId.trim(),
      actorUserId: actor.id,
      enabled: body.enabled,
    }),
  );
}
