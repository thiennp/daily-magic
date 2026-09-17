import listProjectKnowledgeItemsForProject from "@/lib/projects/knowledge/listProjectKnowledgeItemsForProject";
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

  const items = await listProjectKnowledgeItemsForProject(
    actor.id,
    project.id,
    ["candidate", "accepted"],
  );

  return Response.json({
    ok: true,
    items: items.map((item) => ({
      id: item.id,
      kind: item.kind,
      status: item.status,
      sourceRunId: item.sourceRunId,
      preview: item.body,
      createdAt: item.createdAt,
    })),
  });
}
