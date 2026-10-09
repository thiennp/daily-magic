import { addOwnedBotToProject } from "@/lib/projects/acl/addOwnedBotToProject";
import { listAddableOwnedBots } from "@/lib/projects/acl/listAddableOwnedBots";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ readonly projectId: string }> };

/** GET — assistants you own that you can add to this project without a new invite. */
export async function GET(
  _request: Request,
  context: Context,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const allowed = await resolveFolderRefActor({
    projectId,
    actorUserId: actor.id,
  });
  if (!allowed.ok) {
    return projectAccessErrorJson(
      allowed.code,
      allowed.code === "forbidden" ? 403 : 404,
    );
  }
  const bots = await listAddableOwnedBots({ projectId, actorUserId: actor.id });
  return Response.json({ ok: true, bots });
}

/** POST { botUserId, projectDisplayName?, isolateBots? } — add one of your assistants. */
export async function POST(
  request: Request,
  context: Context,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  const result = await addOwnedBotToProject({
    projectId,
    actorUserId: actor.id,
    botUserId: typeof body.botUserId === "string" ? body.botUserId : "",
    projectDisplayName:
      typeof body.projectDisplayName === "string"
        ? body.projectDisplayName
        : null,
    isolateBots: body.isolateBots === true,
  });
  if (!result.ok) {
    const status =
      result.code === "forbidden" || result.code === "not_your_bot"
        ? 403
        : result.code === "not_found"
          ? 404
          : result.code === "display_name_taken" ||
              result.code === "already_in_project"
            ? 409
            : 400;
    return projectAccessErrorJson(result.code, status);
  }
  return Response.json(
    { ok: true, membershipId: result.membershipId },
    { status: 201 },
  );
}
