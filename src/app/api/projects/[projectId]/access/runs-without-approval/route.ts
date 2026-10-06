import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
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

const authorize = async (
  context: RouteContext,
): Promise<
  | { readonly ok: true; readonly projectId: string; readonly actorUserId: string }
  | { readonly ok: false; readonly response: Response }
> => {
  const { actor, error } = await requireAuth();
  if (error || !actor) return { ok: false, response: error };
  const { projectId } = await context.params;
  const decision = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (!decision.allow) {
    return {
      ok: false,
      response: projectAccessErrorJson(
        decision.reason,
        statusForCode(decision.reason),
      ),
    };
  }
  return { ok: true, projectId, actorUserId: actor.id };
};

/**
 * S0-2 "Allow runs without approval" (per project, owner only, default OFF).
 * GET → { ok, allowRunsWithoutApproval }.
 * PUT { allowRunsWithoutApproval: boolean } → { ok, allowRunsWithoutApproval, changed }.
 * Every real change writes an Access log row. ON only skips the approval
 * card; sandbox and limits always apply on the computer.
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await authorize(context);
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
  const auth = await authorize(context);
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
