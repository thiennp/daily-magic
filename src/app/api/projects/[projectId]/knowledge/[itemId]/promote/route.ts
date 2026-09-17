import updateProjectKnowledgeItemStatus from "@/lib/projects/knowledge/updateProjectKnowledgeItemStatus";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly itemId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { projectId, itemId } = await context.params;
  const project = await getUserProjectById(projectId.trim());

  if (project === null || project.ownerUserId !== actor.id) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const lessonBody =
    typeof body === "object" &&
    body !== null &&
    typeof (body as { body?: unknown }).body === "string"
      ? String((body as { body: string }).body)
      : null;

  const updated = await updateProjectKnowledgeItemStatus({
    ownerUserId: actor.id,
    projectId: project.id,
    itemId: itemId.trim(),
    status: "promoted",
    body: lessonBody,
    syncState: "shared",
  });

  if (!updated) {
    return Response.json(
      { ok: false, errorMessage: "Knowledge item not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true });
}
