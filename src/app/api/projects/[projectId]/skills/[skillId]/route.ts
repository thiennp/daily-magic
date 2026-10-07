import {
  getProjectSkill,
  mapProjectSkillShareErrorStatus,
} from "@/features/project-skill-share/public-api/infrastructure";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** GET one skill with body (?version=N optional). */
export async function GET(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly skillId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, skillId } = await context.params;
  const versionRaw = new URL(request.url).searchParams.get("version");
  const result = await getProjectSkill({
    actorUserId: actor.id,
    args: {
      projectId,
      skillId,
      ...(versionRaw === null ? {} : { version: Number(versionRaw) }),
    },
  });
  if (!result.ok) {
    return Response.json(
      {
        ok: false,
        code: result.code,
        errorMessage: result.message ?? result.code,
      },
      { status: mapProjectSkillShareErrorStatus(result.code) },
    );
  }
  return Response.json({ ok: true, projectId, skill: result.skill });
}
