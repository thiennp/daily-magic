import { listPendingProjectAccessRequests } from "@/lib/projects/acl/listPendingProjectAccessRequests";
import { listProjectMembershipsForProject } from "@/lib/projects/acl/listProjectMembershipsForProject";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const project = await getUserProjectById(projectId);
  if (project === null || project.ownerUserId !== actor.id) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const [members, pendingRequests] = await Promise.all([
    listProjectMembershipsForProject(projectId),
    listPendingProjectAccessRequests(projectId),
  ]);

  return Response.json({
    ok: true,
    project: { id: project.id, name: project.name },
    members,
    pendingRequests,
  });
}
