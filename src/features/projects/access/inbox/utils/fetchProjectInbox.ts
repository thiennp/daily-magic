import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import type { FetchProjectInboxResult } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import { parseProjectInboxMessage } from "@/features/projects/access/inbox/utils/parseProjectInboxMessage";

const softFail = (
  unavailable: boolean,
  forbidden: boolean,
  errorMessage: string,
): FetchProjectInboxResult => ({
  ok: false,
  unavailable,
  forbidden,
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
 * Thin UI client for GET /api/projects/[projectId]/inbox.
 * Soft-degrades on 404 until eng messaging batch is live.
 */
export const fetchProjectInbox = async (input: {
  readonly projectId: string;
  readonly since?: string;
  readonly limit?: number;
}): Promise<FetchProjectInboxResult> => {
  const params = new URLSearchParams();
  if (input.since !== undefined && input.since.length > 0) {
    params.set("since", input.since);
  }
  if (input.limit !== undefined) {
    params.set("limit", String(input.limit));
  }
  const qs = params.toString();
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/inbox${qs.length > 0 ? `?${qs}` : ""}`;

  const response = await fetch(url, { cache: "no-store" }).catch(() => null);
  if (response === null) {
    return softFail(true, false, "Inbox unreachable.");
  }
  if (response.status === 404) {
    return softFail(
      true,
      false,
      "Inbox API not available on this deploy yet — bot messages will appear here once messaging lands.",
    );
  }
  if (response.status === 403) {
    return softFail(
      false,
      true,
      "Only the project owner can view Project Inbox.",
    );
  }

  const payload = await readJson(response);
  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return softFail(true, false, "Inbox returned invalid JSON.");
  }

  const body = payload as Record<string, unknown>;
  if (body.ok !== true) {
    return softFail(
      response.status !== 401 && response.status !== 403,
      response.status === 403,
      typeof body.errorMessage === "string"
        ? body.errorMessage
        : "Could not load inbox.",
    );
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages = raw
    .map((row) => parseProjectInboxMessage(row))
    .filter((row): row is AwcProjectInboxMessage => row !== null);

  return {
    ok: true,
    projectId:
      typeof body.projectId === "string" && body.projectId.length > 0
        ? body.projectId
        : input.projectId,
    messages,
  };
};
