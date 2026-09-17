import listProjectCompositionItemsForProject from "@/lib/projects/listProjectCompositionItemsForProject";
import listProjectCompositionCountsForOwner from "@/lib/projects/listProjectCompositionCountsForOwner";
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
  const project = await getUserProjectById(projectId.trim());

  if (project === null || project.ownerUserId !== actor.id) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const countsMap = await listProjectCompositionCountsForOwner(actor.id);
  const counts = countsMap.get(project.id) ?? {
    harness: 0,
    workflow: 0,
    agent: 0,
  };
  const items = await listProjectCompositionItemsForProject(
    actor.id,
    project.id,
  );

  return Response.json({ ok: true, counts, items });
}
