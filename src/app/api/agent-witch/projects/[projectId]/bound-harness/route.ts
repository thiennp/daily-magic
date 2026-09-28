import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import listBoundHarnessInstallBundlesForProject from "@/lib/projects/listBoundHarnessInstallBundlesForProject";
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

  const bundles = await listBoundHarnessInstallBundlesForProject(
    auth.device.userId,
    project.id,
  );

  return Response.json({ ok: true, bundles });
}
