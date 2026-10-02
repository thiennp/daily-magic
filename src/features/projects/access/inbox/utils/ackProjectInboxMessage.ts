import type { AckProjectInboxResult } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

const readJson = async (response: Response): Promise<unknown | null> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

/** POST /api/projects/:projectId/inbox/:messageId/ack — delete-on-ack. */
export const ackProjectInboxMessage = async (input: {
  readonly projectId: string;
  readonly messageId: string;
}): Promise<AckProjectInboxResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/inbox/${encodeURIComponent(input.messageId)}/ack`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
    cache: "no-store",
  }).catch(() => null);

  if (response === null) {
    return { ok: false, errorMessage: "Ack unreachable." };
  }

  const payload = await readJson(response);
  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return { ok: false, errorMessage: "Ack returned invalid JSON." };
  }

  const body = payload as Record<string, unknown>;
  if (response.ok && body.ok === true) {
    return {
      ok: true,
      messageId:
        typeof body.messageId === "string" ? body.messageId : input.messageId,
    };
  }

  return {
    ok: false,
    errorMessage:
      typeof body.errorMessage === "string"
        ? body.errorMessage
        : "Could not ack message.",
  };
};
