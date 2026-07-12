export interface EnqueueAgentRunPayload {
  readonly prompt: string;
  readonly executorUserId?: string;
  readonly groupId?: string | null;
  readonly capabilityId?: string | null;
}

export async function enqueueAgentRunRequest(
  payload: EnqueueAgentRunPayload,
): Promise<
  | { readonly ok: true; readonly queueId: string }
  | { readonly ok: false; readonly errorMessage: string }
> {
  const response = await fetch("/api/agent-runs/queue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null);
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Could not queue task.";
    return { ok: false, errorMessage: message };
  }

  const data: unknown = await response.json();
  const queueId =
    typeof data === "object" &&
    data !== null &&
    "queued" in data &&
    typeof (data as { queued: unknown }).queued === "object" &&
    (data as { queued: { id?: unknown } }).queued !== null &&
    typeof (data as { queued: { id: unknown } }).queued.id === "string"
      ? (data as { queued: { id: string } }).queued.id
      : null;

  if (!queueId) {
    return { ok: false, errorMessage: "Queued but response was invalid." };
  }

  return { ok: true, queueId };
}

export async function deleteQueuedAgentRunRequest(
  queueId: string,
): Promise<boolean> {
  const response = await fetch(
    `/api/agent-runs/queue?id=${encodeURIComponent(queueId)}`,
    { method: "DELETE" },
  );

  return response.ok;
}

export async function fetchQueuedAgentRuns(): Promise<
  readonly {
    readonly id: string;
    readonly prompt: string;
    readonly executorUserId: string;
    readonly groupId: string | null;
    readonly capabilityId: string | null;
  }[]
> {
  const response = await fetch("/api/agent-runs/queue");
  if (!response.ok) {
    return [];
  }

  const data: unknown = await response.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("queued" in data) ||
    !Array.isArray((data as { queued: unknown }).queued)
  ) {
    return [];
  }

  return (data as { queued: Record<string, unknown>[] }).queued.flatMap(
    (entry) => {
      const id = typeof entry.id === "string" ? entry.id : null;
      const prompt = typeof entry.prompt === "string" ? entry.prompt : null;
      const executorUserId =
        typeof entry.executorUserId === "string" ? entry.executorUserId : null;

      if (!id || !prompt || !executorUserId) {
        return [];
      }

      return [
        {
          id,
          prompt,
          executorUserId,
          groupId: typeof entry.groupId === "string" ? entry.groupId : null,
          capabilityId:
            typeof entry.capabilityId === "string" ? entry.capabilityId : null,
        },
      ];
    },
  );
}
