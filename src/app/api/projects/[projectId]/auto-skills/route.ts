import {
  getAutoSkillsOverview,
  patchAutoSkillsSettings,
} from "@/features/project-auto-skills/public-api/infrastructure";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/** Owner GET: strip state (toggle, judge, paused reason, pending questions). */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const overview = await getAutoSkillsOverview({
    projectId,
    actorUserId: actor.id,
  });
  if (overview === null) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }
  return Response.json({ ok: true, overview });
}

/** Owner PATCH: `{enabled?, judgePref?, judgeAgent?, publishMode?}`. */
export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  if (
    (await getAutoSkillsOverview({ projectId, actorUserId: actor.id })) === null
  ) {
    return Response.json(
      { ok: false, errorMessage: "Not found." },
      { status: 404 },
    );
  }
  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  await patchAutoSkillsSettings(projectId, {
    ...(typeof body.enabled === "boolean" ? { enabled: body.enabled } : {}),
    ...(["auto", "ollama", "agent", "bot"].includes(String(body.judgePref))
      ? { judgePref: body.judgePref as "auto" }
      : {}),
    ...(body.judgeAgent === null ||
    ["codex", "claude-cli", "cursor"].includes(String(body.judgeAgent))
      ? { judgeAgent: body.judgeAgent as string | null }
      : {}),
    ...(body.publishMode === "draft" || body.publishMode === "publish"
      ? { publishMode: body.publishMode }
      : {}),
  });
  return Response.json({ ok: true });
}
