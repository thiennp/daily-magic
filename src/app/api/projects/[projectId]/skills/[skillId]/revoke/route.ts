import {
  mapProjectSkillShareErrorStatus,
  revokeProjectSkill,
} from "@/features/project-skill-share/public-api/infrastructure";
import { requireAuth } from "@/lib/auth/requireAuth";

/** POST: revoke (owner; a member for drafts or skills they published). */
export async function POST(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly skillId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { projectId, skillId } = await context.params;
  const result = await revokeProjectSkill({
    actorUserId: actor.id,
    args: { projectId, skillId },
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
