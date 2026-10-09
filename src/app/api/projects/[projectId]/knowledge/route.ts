import listProjectKnowledgeItemsForProject from "@/lib/projects/knowledge/listProjectKnowledgeItemsForProject";
import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
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
  const access = await authorizeProjectPageActor({
    projectId: projectId.trim(),
    actorUserId: actor.id,
  });

  if (!access.ok) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const items = await listProjectKnowledgeItemsForProject(
    null,
    access.project.id,
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
