import {
  parseLinearTaskSyncBatch,
  parseLinearTaskSyncState,
} from "@/features/projects/settings/connections/parseLinearTaskSyncState";
import type {
  LinearTaskSyncBatch,
  LinearTaskSyncState,
  LinearTaskSyncUpdate,
  TaskSyncFailureReason,
  TaskSyncResult,
} from "@/features/projects/settings/connections/projectTaskSync.types";

const basePath = (projectId: string): string =>
  `/api/projects/${encodeURIComponent(projectId)}/task-sync/linear`;

const KNOWN_REASONS: readonly TaskSyncFailureReason[] = [
  "team_required",
  "not_connected",
  "sync_disabled",
];

const failureFrom = (status: number, data: unknown): TaskSyncFailureReason => {
  if (status === 501) return "unavailable";
  const code =
    typeof data === "object" && data !== null
      ? (data as { readonly error?: unknown }).error
      : null;
  return KNOWN_REASONS.find((reason) => reason === code) ?? "error";
};

/** Aborted requests resolve to `error`; callers check their own signal. */
const call = async <T>(
  url: string,
  init: RequestInit,
  parse: (data: unknown) => T | null,
): Promise<TaskSyncResult<T>> => {
  try {
    const response = await fetch(url, init);
    const data: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      return { ok: false, reason: failureFrom(response.status, data) };
    }
    const value = parse(data);
    return value === null
      ? { ok: false, reason: "error" }
      : { ok: true, value };
  } catch {
    return { ok: false, reason: "error" };
  }
};

export const getLinearTaskSync = (
  projectId: string,
  signal?: AbortSignal,
): Promise<TaskSyncResult<LinearTaskSyncState>> =>
  call(
    basePath(projectId),
    { method: "GET", signal },
    parseLinearTaskSyncState,
  );

export const putLinearTaskSync = (
  projectId: string,
  update: LinearTaskSyncUpdate,
  signal?: AbortSignal,
): Promise<TaskSyncResult<LinearTaskSyncState>> =>
  call(
    basePath(projectId),
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
      signal,
    },
    parseLinearTaskSyncState,
  );

export const postLinearTaskSyncBatch = (
  projectId: string,
  signal?: AbortSignal,
): Promise<TaskSyncResult<LinearTaskSyncBatch>> =>
  call(
    `${basePath(projectId)}/sync`,
    { method: "POST", signal },
    parseLinearTaskSyncBatch,
  );
