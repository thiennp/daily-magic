import {
  deleteQueuedAgentRun,
  enqueueAgentRun,
  listQueuedAgentRunsForRequester,
} from "@/lib/dispatch/agentRunQueue";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

function parseEnqueueBody(body: unknown): {
  readonly prompt: string;
  readonly executorUserId?: string;
  readonly groupId?: string | null;
  readonly capabilityId?: string | null;
} | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const prompt =
    typeof record.prompt === "string" && record.prompt.trim().length > 0
      ? record.prompt.trim()
      : null;

  if (!prompt) {
    return null;
  }

  return {
    prompt,
    executorUserId:
      typeof record.executorUserId === "string" &&
      record.executorUserId.length > 0
        ? record.executorUserId
        : undefined,
    groupId:
      typeof record.groupId === "string" && record.groupId.length > 0
        ? record.groupId
        : null,
    capabilityId:
      typeof record.capabilityId === "string" && record.capabilityId.length > 0
        ? record.capabilityId
        : null,
  };
}

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const queued = await listQueuedAgentRunsForRequester(actor.id);

  return Response.json({ ok: true, queued });
}

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json();
  const parsed = parseEnqueueBody(body);

  if (!parsed) {
    return Response.json({ error: "prompt is required." }, { status: 400 });
  }

  const queued = await enqueueAgentRun({
    requesterUserId: actor.id,
    executorUserId: parsed.executorUserId ?? actor.id,
    prompt: parsed.prompt,
    groupId: parsed.groupId,
    capabilityId: parsed.capabilityId,
  });

  return Response.json({ ok: true, queued });
}

export async function DELETE(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const url = new URL(request.url);
  const queueId = url.searchParams.get("id");

  if (!queueId) {
    return Response.json({ error: "id is required." }, { status: 400 });
  }

  const deleted = await deleteQueuedAgentRun(queueId, actor.id);

  if (!deleted) {
    return Response.json({ error: "Queued run not found." }, { status: 404 });
  }

  return Response.json({ ok: true });
}
