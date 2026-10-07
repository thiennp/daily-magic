import { readProjectHistoryMessagesPage } from "./readProjectHistoryMessagesPage";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export type HandleProjectHistoryPageRequestResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly threadKey: string;
      readonly entries: ReturnType<
        typeof readProjectHistoryMessagesPage
      >["entries"];
      readonly nextBeforeCursor: string | null;
      readonly hasMore: boolean;
    }
  | {
      readonly ok: false;
      readonly errorCode: string;
      readonly errorMessage: string;
    };

/**
 * AWL inbound handler for `project.history.page.request`.
 * Reuses History `readProjectHistoryMessagesPage` — do not fork the pager.
 */
export const handleProjectHistoryPageRequest = (input: {
  readonly payload: unknown;
}): HandleProjectHistoryPageRequestResult => {
  if (!isRecord(input.payload)) {
    return {
      ok: false,
      errorCode: "invalid_payload",
      errorMessage: "project.history.page.request requires an object payload.",
    };
  }
  const projectId =
    typeof input.payload.projectId === "string"
      ? input.payload.projectId.trim()
      : "";
  const threadKey =
    typeof input.payload.threadKey === "string"
      ? input.payload.threadKey.trim()
      : "";
  if (projectId.length === 0 || threadKey.length === 0) {
    return {
      ok: false,
      errorCode: "invalid_payload",
      errorMessage: "projectId and threadKey are required.",
    };
  }
  const beforeCursor =
    typeof input.payload.beforeCursor === "string"
      ? input.payload.beforeCursor
      : undefined;
  const limitRaw = input.payload.limit;
  const limit =
    typeof limitRaw === "number" && Number.isFinite(limitRaw)
      ? Math.max(1, Math.min(100, Math.floor(limitRaw)))
      : 50;

  try {
    const page = readProjectHistoryMessagesPage({
      projectId,
      threadKey,
      beforeCursor,
      limit,
    });
    return {
      ok: true,
      projectId,
      threadKey,
      entries: page.entries,
      nextBeforeCursor: page.nextBeforeCursor,
      hasMore: page.hasMore,
    };
  } catch (error: unknown) {
    return {
      ok: false,
      errorCode: "read_failed",
      errorMessage:
        error instanceof Error ? error.message : "History page read failed.",
    };
  }
};
