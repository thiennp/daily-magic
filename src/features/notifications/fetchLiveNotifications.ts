import {
  mapJoinRequest,
  mapRunApproval,
  type LiveJoinRequest,
  type LiveProject,
  type LiveRunApproval,
} from "@/features/notifications/liveNotifications";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";

const getJson = async <T>(
  url: string,
  signal: AbortSignal,
): Promise<T | null> => {
  try {
    const response = await fetch(url, { signal, cache: "no-store" });
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
};

const loadProjectItems = async (
  project: LiveProject,
  input: {
    readonly readIds: ReadonlySet<string>;
    readonly nowMs: number;
    readonly signal: AbortSignal;
  },
): Promise<readonly NotificationItem[]> => {
  const base = `/api/projects/${encodeURIComponent(project.id)}/access`;
  const [access, runs] = await Promise.all([
    getJson<{ pendingRequests?: LiveJoinRequest[] }>(base, input.signal),
    getJson<{ approvals?: LiveRunApproval[] }>(
      `${base}/run-approvals`,
      input.signal,
    ),
  ]);
  const options = (id: string) => ({
    unread: !input.readIds.has(id),
    nowMs: input.nowMs,
  });
  return [
    ...(access?.pendingRequests ?? []).map((request) =>
      mapJoinRequest(
        project,
        request,
        options(`join:${project.id}:${request.id}`),
      ),
    ),
    ...(runs?.approvals ?? []).map((approval) =>
      mapRunApproval(
        project,
        approval,
        options(`run:${project.id}:${approval.runId}`),
      ),
    ),
  ];
};

/**
 * Pending join requests and run approvals across the projects you own. The
 * Access routes are owner-only, so projects you only belong to answer 403 and
 * are skipped. `failed` is true only when the project list itself failed.
 */
export const fetchLiveNotifications = async (input: {
  readonly readIds: ReadonlySet<string>;
  readonly signal: AbortSignal;
}): Promise<{
  readonly items: readonly NotificationItem[];
  readonly failed: boolean;
}> => {
  const list = await getJson<{ projects?: LiveProject[] }>(
    "/api/projects",
    input.signal,
  );
  if (list === null) {
    return { items: [], failed: true };
  }
  const nowMs = Date.now();
  const perProject = await Promise.all(
    (list.projects ?? []).map((project) =>
      loadProjectItems(project, { ...input, nowMs }),
    ),
  );
  return { items: perProject.flat(), failed: false };
};
