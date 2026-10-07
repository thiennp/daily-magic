import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import {
  HOSTED_DEVICE_HISTORY_PAGE_TIMEOUT_MS,
  type ProjectHistoryPageRequestState,
} from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxy.constant";

export type ProjectHistoryPageResultPayload = {
  readonly ok: true;
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly nextBeforeCursor: string | null;
  readonly hasMore: boolean;
};

export type ProjectHistoryPageFailPayload = {
  readonly ok: false;
  readonly errorCode: string;
  readonly errorMessage?: string;
};

export type ProjectHistoryPageCompletePayload =
  | ProjectHistoryPageResultPayload
  | ProjectHistoryPageFailPayload;

type PendingEntry = {
  readonly state: ProjectHistoryPageRequestState;
  readonly resolve: (value: ProjectHistoryPageCompletePayload) => void;
  readonly timer: ReturnType<typeof setTimeout>;
};

const pending = new Map<string, PendingEntry>();

export const registerProjectHistoryPageRequest = (
  requestId: string,
  timeoutMs: number = HOSTED_DEVICE_HISTORY_PAGE_TIMEOUT_MS,
): Promise<ProjectHistoryPageCompletePayload> =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      const current = pending.get(requestId);
      if (current === undefined) {
        return;
      }
      pending.delete(requestId);
      resolve({
        ok: false,
        errorCode: "expired",
        errorMessage: "Project history page request timed out.",
      });
    }, timeoutMs);

    pending.set(requestId, {
      state: "pending",
      resolve: (value) => {
        clearTimeout(timer);
        pending.delete(requestId);
        resolve(value);
      },
      timer,
    });
  });

export const completeProjectHistoryPageRequest = (
  requestId: string | undefined,
  payload: unknown,
): boolean => {
  if (requestId === undefined || requestId.length === 0) {
    return false;
  }
  const entry = pending.get(requestId);
  if (entry === undefined) {
    return false;
  }

  const parsed = parseProjectHistoryPageCompletePayload(payload);
  if (parsed === null) {
    entry.resolve({
      ok: false,
      errorCode: "invalid_payload",
      errorMessage: "Invalid project.history.page.result payload.",
    });
    return true;
  }

  entry.resolve(parsed);
  return true;
};

export const parseProjectHistoryPageCompletePayload = (
  payload: unknown,
): ProjectHistoryPageCompletePayload | null => {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return null;
  }
  const record = payload as Record<string, unknown>;
  if (record.ok === false) {
    return {
      ok: false,
      errorCode:
        typeof record.errorCode === "string" && record.errorCode.length > 0
          ? record.errorCode
          : "device_error",
      ...(typeof record.errorMessage === "string"
        ? { errorMessage: record.errorMessage }
        : {}),
    };
  }
  if (record.ok !== true || !Array.isArray(record.entries)) {
    return null;
  }
  return {
    ok: true,
    entries: record.entries as readonly ProjectMessengerTimelineEntry[],
    nextBeforeCursor:
      typeof record.nextBeforeCursor === "string"
        ? record.nextBeforeCursor
        : record.nextBeforeCursor === null
          ? null
          : null,
    hasMore: record.hasMore === true,
  };
};

/** Test helper — clear pending map. */
export const resetProjectHistoryPageRequestRegistryForTests = (): void => {
  for (const entry of pending.values()) {
    clearTimeout(entry.timer);
  }
  pending.clear();
};

export const countPendingProjectHistoryPageRequestsForTests = (): number =>
  pending.size;
