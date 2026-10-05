import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import { getPublishedProjectSkillBodyFromDb } from "@/features/project-skill-share/internal/infrastructure/awc/getPublishedProjectSkillBodyFromDb";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ readonly projectId: string; readonly skillId: string }>;
};

/**
 * Device-auth published skill body for AWL History pull.
 * ACL: owner | member | viewer via resolveProjectSkillMemberRole (same as AWC).
 */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);
  if (auth instanceof Response) return auth;
  const { projectId: rawProjectId, skillId: rawSkillId } = await context.params;
  const projectId = rawProjectId.trim();
  const skillId = rawSkillId.trim();
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
  const versionRaw = new URL(request.url).searchParams.get("version");
  const version = versionRaw === null ? NaN : Number(versionRaw);
  if (!Number.isInteger(version) || version < 1) {
    return Response.json(
      { ok: false, errorMessage: "version is required." },
      { status: 400 },
    );
  }
  try {
    const body = await getPublishedProjectSkillBodyFromDb({
      projectId,
      skillId,
      version,
    });
    if (body === null) {
      return Response.json(
        { ok: false, errorMessage: "not_found" },
        { status: 404 },
      );
    }
    return Response.json({
      ok: true,
      projectId,
      skillId,
      version,
      body: body.body,
      contentHash: body.contentHash,
    });
  } catch (error: unknown) {
    console.error("getPublishedBody device route failed", error);
    return Response.json(
      { ok: false, errorMessage: "getPublishedBody failed." },
      { status: 500 },
    );
  }
}
