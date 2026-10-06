import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { readProjectRunsWithoutApproval } from "@/lib/projects/acl/runsWithoutApproval/readProjectRunsWithoutApproval";
import { setProjectRunsWithoutApproval } from "@/lib/projects/acl/runsWithoutApproval/setProjectRunsWithoutApproval";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

const statusForCode = (code: string): number => {
  if (code === "forbidden") return 403;
  if (code === "not_found") return 404;
  return 400;
};

/** Read: owner or an active human member/viewer (page actors). Write: owner only. */
const denyReason = async (
  access: "read" | "write",
  projectId: string,
  actorUserId: string,
): Promise<string | null> => {
  if (access === "read") {
    const page = await authorizeProjectPageActor({ projectId, actorUserId });
    return page.ok ? null : page.reason;
  }
  const decision = await authorizeProjectOwner({ projectId, actorUserId });
  return decision.allow ? null : decision.reason;
};

const authorize = async (
  context: RouteContext,
  access: "read" | "write",
): Promise<
  | { readonly ok: true; readonly projectId: string; readonly actorUserId: string }
  | { readonly ok: false; readonly response: Response }
> => {
  const { actor, error } = await requireAuth();
  if (error || !actor) return { ok: false, response: error };
  const { projectId } = await context.params;
  const denied = await denyReason(access, projectId, actor.id);
  if (denied !== null) {
    return {
      ok: false,
      response: projectAccessErrorJson(denied, statusForCode(denied)),
    };
  }
  return { ok: true, projectId, actorUserId: actor.id };
};

/**
 * S0-2 "Allow runs without approval" (per project, default OFF).
 * GET (owner, or human member/viewer read-only) → { ok, allowRunsWithoutApproval }.
 * PUT (owner only) { allowRunsWithoutApproval: boolean } → { ok, allowRunsWithoutApproval, changed }.
 * Every real change writes an Access log row. ON only skips the approval
 * card; sandbox and limits always apply on the computer.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await authorize(context, "read");
  if (!auth.ok) return auth.response;
  const allowRunsWithoutApproval = await readProjectRunsWithoutApproval(
    auth.projectId,
  );
  return Response.json({ ok: true, allowRunsWithoutApproval });
}

export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await authorize(context, "write");
  if (!auth.ok) return auth.response;
  const body: unknown = await request.json().catch(() => null);
  const value =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>).allowRunsWithoutApproval
      : undefined;
  const result = await setProjectRunsWithoutApproval({
    projectId: auth.projectId,
    actorUserId: auth.actorUserId,
    allowRunsWithoutApproval: value,
  });
  if (!result.ok) {
    return projectAccessErrorJson(result.code, statusForCode(result.code));
  }
  return Response.json(result);
}
