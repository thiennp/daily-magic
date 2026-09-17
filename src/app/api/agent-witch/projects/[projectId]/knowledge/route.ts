import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import createProjectKnowledgeCandidate from "@/lib/projects/knowledge/createProjectKnowledgeCandidate";
import listProjectKnowledgeItemsForProject from "@/lib/projects/knowledge/listProjectKnowledgeItemsForProject";
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

  const items = await listProjectKnowledgeItemsForProject(
    auth.device.userId,
    project.id,
    ["candidate"],
  );

  return Response.json({
    ok: true,
    candidateCount: items.length,
    items: items.map((item) => ({
      id: item.id,
      kind: item.kind,
      preview: item.body,
      sourceRunId: item.sourceRunId,
      createdAt: item.createdAt,
    })),
  });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const body: unknown = await request.json().catch(() => null);
  const sourceRunId =
    typeof body === "object" &&
    body !== null &&
    typeof (body as { sourceRunId?: unknown }).sourceRunId === "string"
      ? String((body as { sourceRunId: string }).sourceRunId)
      : null;
  const lesson =
    typeof body === "object" &&
    body !== null &&
    typeof (body as { lesson?: unknown }).lesson === "string"
      ? String((body as { lesson: string }).lesson)
      : null;

  if (lesson === null || lesson.trim().length === 0) {
    return Response.json(
      { ok: false, errorMessage: "lesson is required." },
      { status: 400 },
    );
  }

  const { projectId } = await context.params;
  const id = await createProjectKnowledgeCandidate({
    projectId: projectId.trim(),
    ownerUserId: auth.device.userId,
    sourceRunId,
    kind: "lesson",
    summaryForCloud: lesson.trim().slice(0, 500),
  });

  if (id === null) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true, id });
}
