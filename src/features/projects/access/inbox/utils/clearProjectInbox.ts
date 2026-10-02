import type { ClearProjectInboxResult } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

const softFail = (
  unavailable: boolean,
  errorMessage: string,
): ClearProjectInboxResult => ({
  ok: false,
  unavailable,
  errorMessage,
});

const readJson = async (response: Response): Promise<unknown | null> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

/**
 * Owner Clear all: POST …/inbox/clear with { confirm: true }.
 * Soft-degrades on 404 until eng clear/log PR is live.
 */
export const clearProjectInbox = async (input: {
  readonly projectId: string;
}): Promise<ClearProjectInboxResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/inbox/clear`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ confirm: true }),
  }).catch(() => null);

  if (response === null) {
    return softFail(true, "Clear unreachable.");
  }
  if (response.status === 404) {
    return softFail(
      true,
      "Clear API not available on this deploy yet — lands with eng clear/log.",
    );
  }

  const payload = await readJson(response);
  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return softFail(true, "Clear returned invalid JSON.");
  }

  const body = payload as Record<string, unknown>;
  if (body.ok !== true) {
    return softFail(
      response.status === 404,
      typeof body.errorMessage === "string"
        ? body.errorMessage
        : "Could not clear messages.",
    );
  }

  const deletedMessages =
    typeof body.deletedMessages === "number" ? body.deletedMessages : 0;
  const deletedDeliveries =
    typeof body.deletedDeliveries === "number" ? body.deletedDeliveries : 0;

  return { ok: true, deletedMessages, deletedDeliveries };
};
