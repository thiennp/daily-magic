import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { listPublishedProjectSkillsFromDb } from "@/features/project-skill-share/internal/infrastructure/awc/listPublishedProjectSkillsFromDb";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ readonly projectId: string }> };

/**
 * Device-auth list of published skills (meta + contentHash) for AWL History pull.
 * ACL matches AWC session list: owner | member | viewer via
 * resolveProjectSkillMemberRole. Unauthorized → 404 Project not found.
 */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId: raw } = await context.params;
  const projectId = raw.trim();
  const access = await resolveProjectSkillMemberRole({
    projectId,
    actorUserId: auth.device.userId,
  });
  if (!access.ok) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }
  try {
    const skills = await listPublishedProjectSkillsFromDb(projectId);
    return Response.json({ ok: true, projectId, skills });
  } catch (error: unknown) {
    console.error("listPublished device route failed", error);
    return Response.json(
      { ok: false, errorMessage: "listPublished failed." },
      { status: 500 },
    );
  }
}
