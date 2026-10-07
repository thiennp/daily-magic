import {
  listProjectSkills,
  mapProjectSkillShareErrorStatus,
  publishProjectSkill,
} from "@/features/project-skill-share/public-api/infrastructure";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/** GET: skills visible to the session user (owner | member | viewer); `?kind=skill|playbook` filters. */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const kind = new URL(request.url).searchParams.get("kind");
  const result = await listProjectSkills({
    actorUserId: actor.id,
    args: kind === null ? { projectId } : { projectId, kind },
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code },
      { status: mapProjectSkillShareErrorStatus(result.code) },
    );
  }
  return Response.json({ ok: true, projectId, skills: result.skills });
}

/** POST: publish (or save draft) — same rules as publish_project_skill. */
export async function POST(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  const result = await publishProjectSkill({
    actorUserId: actor.id,
    args: { ...body, projectId },
  });
  if (!result.ok) {
    return Response.json(
      { ok: false, errorMessage: result.code },
      { status: mapProjectSkillShareErrorStatus(result.code) },
    );
  }
  return Response.json(result);
}
