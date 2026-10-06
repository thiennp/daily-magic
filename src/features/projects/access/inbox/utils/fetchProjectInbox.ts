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
 * Messages panel: GET …/inbox?scope=project (full peer↔peer + Owner log).
 * archived: true → the Archived filter. Soft-degrades on 404.
 */
export const fetchProjectInbox = async (input: {
  readonly projectId: string;
  readonly since?: string;
  readonly cursor?: string;
  readonly limit?: number;
  readonly archived?: boolean;
}): Promise<FetchProjectInboxResult> => {
  const params = new URLSearchParams();
  params.set("scope", "project");
  if (input.archived === true) {
    params.set("archived", "1");
  }
  if (input.since !== undefined && input.since.length > 0) {
    params.set("since", input.since);
  }
  if (input.cursor !== undefined && input.cursor.length > 0) {
    params.set("cursor", input.cursor);
  }
  if (input.limit !== undefined) {
    params.set("limit", String(input.limit));
  }
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/inbox?${params.toString()}`;

  const response = await fetch(url, { cache: "no-store" }).catch(() => null);
  if (response === null) {
    return softFail(true, false, "Inbox unreachable.");
  }
  if (response.status === 404) {
    return softFail(
      true,
      false,
      "Messages API not available on this deploy yet — full project log lands with eng clear/log.",
    );
  }
  if (response.status === 403) {
    return softFail(
      false,
      true,
      "Only the project owner can view project Messages.",
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
        : "Could not load messages.",
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
    scope: "project",
    messages,
    nextCursor:
      typeof body.nextCursor === "string" && body.nextCursor.length > 0
        ? body.nextCursor
        : null,
    archivedCount:
      typeof body.archivedCount === "number" ? body.archivedCount : 0,
    canRestore: body.canRestore === true,
  };
};
