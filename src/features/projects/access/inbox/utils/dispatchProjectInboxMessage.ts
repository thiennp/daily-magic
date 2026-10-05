import type {
  AwcProjectInboxRefs,
  DispatchProjectInboxResult,
} from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

const readJson = async (response: Response): Promise<unknown | null> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

/** POST /api/projects/:projectId/inbox/dispatch — owner → bot or computer. */
export const dispatchProjectInboxMessage = async (input: {
  readonly projectId: string;
  readonly toMembershipId: string;
  readonly summary: string;
  readonly kind?: string;
  readonly refs?: AwcProjectInboxRefs;
}): Promise<DispatchProjectInboxResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/inbox/dispatch`;
  const bodyPayload: Record<string, unknown> = {
    toMembershipId: input.toMembershipId,
    summary: input.summary,
  };
  if (input.kind !== undefined && input.kind.trim().length > 0) {
    bodyPayload.kind = input.kind.trim();
  }
  if (input.refs !== undefined && Object.keys(input.refs).length > 0) {
    bodyPayload.refs = input.refs;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload),
    cache: "no-store",
  }).catch(() => null);

  if (response === null) {
    return { ok: false, code: null, errorMessage: "Dispatch unreachable." };
  }

  const payload = await readJson(response);
  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return {
      ok: false,
      code: null,
      errorMessage: "Dispatch returned invalid JSON.",
    };
  }

  const body = payload as Record<string, unknown>;
  // Live eng puts machine code in errorMessage; contract may also send code.
  const codeFromField = typeof body.code === "string" ? body.code : null;
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage : null;
  const code =
    codeFromField ??
    (errorMessage !== null &&
    /^(rate_limited|rate_limited_daily|rate_limited_hourly|unread_cap|recipient_not_found)/.test(errorMessage)
      ? errorMessage
      : null);

  if ((response.status === 201 || response.ok) && body.ok === true) {
    return {
      ok: true,
      messageId: typeof body.messageId === "string" ? body.messageId : "",
      recipientCount:
        typeof body.recipientCount === "number" ? body.recipientCount : 1,
    };
  }

  const reason =
    body.reason === "hourly" || body.reason === "unread_cap"
      ? body.reason
      : undefined;
  const detail =
    body.detail === "rate_limited_hourly" || body.detail === "unread_cap"
      ? body.detail
      : undefined;
  const retryAfterSeconds =
    typeof body.retryAfterSeconds === "number"
      ? body.retryAfterSeconds
      : body.retryAfterSeconds === null
        ? null
        : undefined;
  const retryAfterAt =
    typeof body.retryAfterAt === "string"
      ? body.retryAfterAt
      : body.retryAfterAt === null
        ? null
        : undefined;

  const cause =
    body.cause === "offline" || body.cause === "too_old"
      ? body.cause
      : undefined;

  return {
    ok: false,
    code,
    errorMessage: errorMessage ?? "Could not send task.",
    cause,
    reason,
    detail,
    retryAfterSeconds,
    retryAfterAt,
  };
};
