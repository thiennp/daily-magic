import type {
  FetchProjectAccessLogParams,
  ProjectActivityLogErrorCode,
  ProjectActivityLogResponse,
} from "@/features/projects/activityLog/projectAccessLog.type";

export type FetchProjectAccessLogResult =
  | { readonly ok: true; readonly data: ProjectActivityLogResponse }
  | {
      readonly ok: false;
      readonly status: number;
      /** owner_only (403) | not_found | invalid_cursor | invalid_query | unauthorized | network */
      readonly error: ProjectActivityLogErrorCode | "network";
    };

const KNOWN_ERRORS: readonly ProjectActivityLogErrorCode[] = [
  "owner_only",
  "not_found",
  "invalid_cursor",
  "invalid_query",
  "unauthorized",
];

export const buildProjectAccessLogUrl = (
  params: FetchProjectAccessLogParams,
): string => {
  const search = new URLSearchParams();
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.cursor) search.set("cursor", params.cursor);
  if (params.category) search.set("category", params.category);
  if (params.since) search.set("since", params.since);
  const query = search.toString();
  const base = `/api/projects/${encodeURIComponent(params.projectId)}/activity`;
  return query.length > 0 ? `${base}?${query}` : base;
};

/** Owner-only Access log page. Pass the previous nextCursor for "Show older". */
export const fetchProjectAccessLog = async (
  params: FetchProjectAccessLogParams,
  init?: { readonly signal?: AbortSignal },
): Promise<FetchProjectAccessLogResult> => {
  try {
    const response = await fetch(buildProjectAccessLogUrl(params), {
      cache: "no-store",
      signal: init?.signal,
    });
    const body = (await response.json().catch(() => null)) as
      | (Partial<ProjectActivityLogResponse> & { readonly error?: unknown })
      | null;
    if (response.ok && body !== null && body.ok === true) {
      return { ok: true, data: body as ProjectActivityLogResponse };
    }
    const code = KNOWN_ERRORS.find((known) => known === body?.error);
    return {
      ok: false,
      status: response.status,
      error: code ?? (response.status === 401 ? "unauthorized" : "network"),
    };
  } catch {
    return { ok: false, status: 0, error: "network" };
  }
};
