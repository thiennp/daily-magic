import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type {
  AwcProjectInboxRestoreTarget,
  RestoreProjectInboxResult,
} from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

const fail = (errorMessage: string): RestoreProjectInboxResult => ({
  ok: false,
  errorMessage,
});

/**
 * Owner Restore from Archived: POST …/inbox/restore with one target —
 * { messageId } | { archiveBatch } (toast Undo) | { all: true }.
 */
export const restoreProjectInbox = async (input: {
  readonly projectId: string;
  readonly target: AwcProjectInboxRestoreTarget;
}): Promise<RestoreProjectInboxResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/inbox/restore`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(input.target),
  }).catch(() => null);
  if (response === null) {
    return fail(AWC_PROJECT_INBOX_COPY.restoreFailed);
  }
  if (response.status === 403) {
    return fail(AWC_PROJECT_INBOX_COPY.archived.ownerOnlyReason);
  }
  const payload: unknown = await response.json().catch(() => null);
  const body =
    payload !== null && typeof payload === "object" && !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : null;
  if (body === null || body.ok !== true) {
    return fail(AWC_PROJECT_INBOX_COPY.restoreFailed);
  }
  const restoredMessages =
    typeof body.restoredMessages === "number" ? body.restoredMessages : 0;
  return { ok: true, restoredMessages };
};
