import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import promoteAllProjectKnowledgeCandidates from "@/lib/projects/knowledge/promoteAllProjectKnowledgeCandidates";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const { projectId } = await context.params;
  const project = await getUserProjectById(projectId.trim());

  if (
    project === null ||
    project.ownerUserId !== auth.device.userId ||
    (project.deviceId !== null &&
      project.deviceId.length > 0 &&
      project.deviceId !== auth.device.id)
  ) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const promotedCount = await promoteAllProjectKnowledgeCandidates({
    ownerUserId: auth.device.userId,
    projectId: project.id,
  });

  return Response.json({ ok: true, promotedCount });
}
