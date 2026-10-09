import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { parseDefinitionOfDoneBody } from "@/lib/projects/definitionOfDone/parseDefinitionOfDoneBody";
import {
  getProjectDefinitionOfDone,
  setProjectDefinitionOfDone,
} from "@/lib/projects/definitionOfDone/projectDefinitionOfDone";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string }>;
};

/**
 * GET /api/projects/:projectId/definition-of-done → { ok, body: string | null }
 * Any project page reader (owner / member / viewer).
 */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const page = await authorizeProjectPageActor({
    projectId,
    actorUserId: actor.id,
  });
  if (!page.ok) {
    return projectAccessErrorJson(
      page.reason,
      page.reason === "not_found" ? 404 : 403,
    );
  }
  return Response.json({
    ok: true,
    body: await getProjectDefinitionOfDone(projectId),
  });
}

/** PUT { body } — owner only. Blank clears. Bots re-read it after the project.updated wake. */
export async function PUT(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const page = await authorizeProjectPageActor({
    projectId,
    actorUserId: actor.id,
  });
  if (!page.ok) {
    return projectAccessErrorJson(
      page.reason,
      page.reason === "not_found" ? 404 : 403,
    );
  }
  if (page.role !== "owner") {
    return Response.json({ ok: false, code: "forbidden" }, { status: 403 });
  }
  const parsed = parseDefinitionOfDoneBody(
    await request.json().catch(() => null),
  );
  if (parsed.kind === "invalid") {
    return Response.json({ ok: false, code: parsed.reason }, { status: 400 });
  }
  const body = parsed.kind === "set" ? parsed.body : null;
  await setProjectDefinitionOfDone({
    projectId,
    actorUserId: actor.id,
    body,
  });
  await scheduleProjectUpdatedNotify({
    projectId,
    fields: ["definition_of_done"],
    actorUserId: actor.id,
  });
  return Response.json({ ok: true, body });
}
