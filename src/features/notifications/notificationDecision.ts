import { parseNotificationId } from "@/features/notifications/liveNotifications";

const decisionUrl = (
  id: string,
  decision: "approved" | "denied",
): { readonly url: string; readonly body?: string } | null => {
  const parsed = parseNotificationId(id);
  if (parsed === null) return null;
  const base = `/api/projects/${encodeURIComponent(parsed.projectId)}/access`;
  const verb = decision === "approved" ? "approve" : "deny";
  return parsed.kind === "join"
    ? {
        url: `${base}/requests/${encodeURIComponent(parsed.targetId)}/${verb}`,
        body: "{}",
      }
    : {
        url: `${base}/run-approvals/${encodeURIComponent(parsed.targetId)}/${decision === "approved" ? "approve" : "decline"}`,
      };
};

export type NotificationDecisionResult =
  { readonly ok: true } | { readonly ok: false; readonly message: string };

/** Approve / deny through the existing owner Access routes. */
export const postNotificationDecision = async (
  id: string,
  decision: "approved" | "denied",
): Promise<NotificationDecisionResult> => {
  const request = decisionUrl(id, decision);
  if (request === null) {
    return { ok: false, message: "Could not save your answer." };
  }
  try {
    const response = await fetch(request.url, {
      method: "POST",
      ...(request.body !== undefined
        ? {
            headers: { "Content-Type": "application/json" },
            body: request.body,
          }
        : {}),
    });
    if (response.ok) {
      return { ok: true };
    }
    const data = (await response.json().catch(() => ({}))) as {
      errorMessage?: string;
    };
    return {
      ok: false,
      message:
        data.errorMessage ??
        "Could not save your answer. Open the project to finish.",
    };
  } catch {
    return { ok: false, message: "Could not save your answer. Try again." };
  }
};
