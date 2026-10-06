import {
  isAwcProjectActivityAction,
  type AwcProjectActivityAction,
} from "@/features/projects/access/awcProjectActivityActions.constant";
import type AwcProjectActivityEvent from "@/features/projects/access/types/awcProjectActivityEvent.type";
import type {
  AwcProjectActivityFirstConnectMeta,
  FetchProjectActivityResult,
} from "@/features/projects/access/types/awcProjectActivityEvent.type";
import { PROJECT_ACTIVITY_SAFE_DETAIL_KEYS } from "@/lib/projects/acl/projectActivityAllowlist.constant";

const SAFE_DETAIL_KEYS = PROJECT_ACTIVITY_SAFE_DETAIL_KEYS;

const asSafeDetail = (
  value: unknown,
): AwcProjectActivityEvent["detail"] => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const record = value as Record<string, unknown>;
  const out: Record<string, string | boolean | null> = {};
  for (const key of SAFE_DETAIL_KEYS) {
    if (!(key in record)) {
      continue;
    }
    const entry = record[key];
    if (
      typeof entry === "string" ||
      typeof entry === "boolean" ||
      entry === null
    ) {
      out[key] = entry;
    }
  }
  return out;
};

const parseEvent = (
  value: unknown,
  projectId: string,
): AwcProjectActivityEvent | null => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const row = value as Record<string, unknown>;
  const id = typeof row.id === "string" ? row.id : null;
  const action =
    typeof row.action === "string" && isAwcProjectActivityAction(row.action)
      ? row.action
      : null;
  const actorUserId =
    typeof row.actorUserId === "string" ? row.actorUserId : null;
  const at = typeof row.at === "string" ? row.at : null;
  if (id === null || action === null || actorUserId === null || at === null) {
    return null;
  }
  const targetUserId =
    typeof row.targetUserId === "string"
      ? row.targetUserId
      : row.targetUserId === null
        ? null
        : null;
  return {
    id,
    projectId:
      typeof row.projectId === "string" && row.projectId.length > 0
        ? row.projectId
        : projectId,
    action: action as AwcProjectActivityAction,
    actorUserId,
    targetUserId,
    at,
    detail: asSafeDetail(row.detail),
  };
};

const parseFirstConnect = (
  value: unknown,
): AwcProjectActivityFirstConnectMeta | null => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const row = value as Record<string, unknown>;
  const role = typeof row.role === "string" ? row.role : null;
  const note = typeof row.note === "string" ? row.note : null;
  if (role === null || note === null) {
    return null;
  }
  const scopes = Array.isArray(row.scopes)
    ? row.scopes.filter((s): s is string => typeof s === "string")
    : [];
  return { role, scopes, note };
};

/**
 * Thin UI client for GET /api/projects/[projectId]/activity.
 * Degrades gracefully when the route is not deployed yet (404).
 */
export const fetchProjectActivity = async (input: {
  readonly projectId: string;
  readonly actionFilter?: AwcProjectActivityAction | "all";
  readonly cursor?: string | null;
  readonly limit?: number;
}): Promise<FetchProjectActivityResult> => {
  const params = new URLSearchParams();
  if (input.cursor !== undefined && input.cursor !== null && input.cursor.length > 0) {
    params.set("cursor", input.cursor);
  }
  if (input.limit !== undefined) {
    params.set("limit", String(input.limit));
  }
  const qs = params.toString();
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/activity${qs.length > 0 ? `?${qs}` : ""}`;

  let response: Response;
  try {
    response = await fetch(url, { cache: "no-store" });
  } catch {
    return {
      ok: false,
      unavailable: true,
      errorMessage: "Activity feed unreachable.",
    };
  }

  if (response.status === 404) {
    return {
      ok: false,
      unavailable: true,
      errorMessage:
        "Activity API not available on this deploy yet — membership and status events will appear here once the backend lands.",
    };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return {
      ok: false,
      unavailable: true,
      errorMessage: "Activity feed returned invalid JSON.",
    };
  }

  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return {
      ok: false,
      unavailable: true,
      errorMessage: "Activity feed returned an unexpected payload.",
    };
  }

  const body = payload as Record<string, unknown>;
  if (body.ok !== true) {
    const forbidden = response.status === 403;
    return {
      ok: false,
      unavailable: !forbidden,
      errorMessage:
        typeof body.errorMessage === "string"
          ? body.errorMessage
          : "Could not load activity.",
    };
  }

  const rawEvents = Array.isArray(body.events) ? body.events : [];
  let events = rawEvents
    .map((row) => parseEvent(row, input.projectId))
    .filter((row): row is AwcProjectActivityEvent => row !== null);

  if (
    input.actionFilter !== undefined &&
    input.actionFilter !== "all"
  ) {
    events = events.filter((event) => event.action === input.actionFilter);
  }

  return {
    ok: true,
    events,
    nextCursor: typeof body.nextCursor === "string" ? body.nextCursor : null,
    firstConnect: parseFirstConnect(body.firstConnect),
  };
};
