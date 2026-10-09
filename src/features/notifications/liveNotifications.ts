import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

export type LiveJoinRequest = {
  readonly id: string;
  readonly requesterIsAgent: boolean;
  readonly requesterLabel: string | null;
  readonly requestedScopes: readonly string[];
  readonly reason: string | null;
  readonly createdAt: string;
  readonly suggestedProjectDisplayName: string | null;
  readonly approvalCard?: {
    readonly ownerPersonName: string | null;
    readonly isExpired: boolean;
  } | null;
};

export type LiveRunApproval = {
  readonly runId: string;
  readonly requesterLabel: string | null;
  readonly prompt: string;
  readonly tool: string;
  readonly computerName: string;
  readonly approvalExpiresAt: string | null;
};

export type LiveProject = { readonly id: string; readonly name: string };

/** Notification ids carry what the Access routes need to decide. */
export const joinNotificationId = (projectId: string, requestId: string) =>
  `join:${projectId}:${requestId}`;
export const runNotificationId = (projectId: string, runId: string) =>
  `run:${projectId}:${runId}`;

export const parseNotificationId = (
  id: string,
): { kind: "join" | "run"; projectId: string; targetId: string } | null => {
  const [kind, projectId, targetId] = id.split(":");
  return (kind === "join" || kind === "run") &&
    projectId !== undefined &&
    targetId !== undefined
    ? { kind, projectId, targetId }
    : null;
};

const atLabel = (iso: string, nowMs: number): string =>
  formatRelativeTimeAgo(iso, nowMs) ?? "recently";

const MS_PER_MINUTE = 60_000;

export const mapJoinRequest = (
  project: LiveProject,
  request: LiveJoinRequest,
  options: { readonly unread: boolean; readonly nowMs: number },
): NotificationItem => ({
  id: joinNotificationId(project.id, request.id),
  kind: "join",
  who: request.requesterLabel?.trim() || "Someone",
  whoKind: request.requesterIsAgent ? "assistant" : "person",
  role: "Member",
  project: project.name,
  ...(request.approvalCard?.ownerPersonName
    ? { owner: request.approvalCard.ownerPersonName }
    : {}),
  ...(request.reason ? { note: request.reason } : {}),
  atLabel: atLabel(request.createdAt, options.nowMs),
  unread: options.unread,
  state: request.approvalCard?.isExpired ? "timeout" : "pending",
});

export const mapRunApproval = (
  project: LiveProject,
  approval: LiveRunApproval,
  options: { readonly unread: boolean; readonly nowMs: number },
): NotificationItem => {
  const minsLeft =
    approval.approvalExpiresAt === null
      ? undefined
      : Math.max(
          0,
          Math.round(
            (Date.parse(approval.approvalExpiresAt) - options.nowMs) /
              MS_PER_MINUTE,
          ),
        );
  return {
    id: runNotificationId(project.id, approval.runId),
    kind: "run",
    who: approval.requesterLabel?.trim() || "Someone",
    task: approval.prompt.split("\n", 1)[0]?.slice(0, 160) ?? "",
    project: project.name,
    computer: approval.computerName,
    computerLabel: approval.computerName,
    atLabel: "waiting for you",
    unread: options.unread,
    state: "pending",
    ...(minsLeft !== undefined ? { minsLeft } : {}),
  };
};
