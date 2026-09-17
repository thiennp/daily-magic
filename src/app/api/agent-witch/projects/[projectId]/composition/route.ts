import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import listProjectCompositionCountsForOwner from "@/lib/projects/listProjectCompositionCountsForOwner";
import listProjectCompositionItemsForProject from "@/lib/projects/listProjectCompositionItemsForProject";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const { projectId } = await context.params;
  const project = await getUserProjectById(projectId.trim());

  if (project === null || project.ownerUserId !== auth.device.userId) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const countsMap = await listProjectCompositionCountsForOwner(
    auth.device.userId,
  );
  const counts = countsMap.get(project.id) ?? {
    harness: 0,
    workflow: 0,
    agent: 0,
  };
  const items = await listProjectCompositionItemsForProject(
    auth.device.userId,
    project.id,
  );

  return Response.json({ ok: true, counts, items });
}
