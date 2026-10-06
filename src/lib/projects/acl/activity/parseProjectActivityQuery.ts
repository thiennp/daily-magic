import {
  decodeProjectActivityCursor,
  type ProjectActivityCursor,
} from "@/lib/projects/acl/activity/projectActivityCursor";
import {
  PROJECT_ACTIVITY_CATEGORIES,
  PROJECT_ACTIVITY_PAGE_LIMIT,
  type ProjectActivityCategory,
} from "@/lib/projects/acl/activity/projectActivityEvent.constant";

export type ProjectActivityQuery = {
  readonly limit: number;
  readonly cursor: ProjectActivityCursor | null;
  readonly category: ProjectActivityCategory | null;
  readonly since: string | null;
};

export type ProjectActivityQueryInput = {
  readonly limit?: unknown;
  readonly cursor?: string | null;
  readonly category?: string | null;
  readonly since?: string | null;
};

const clampLimit = (raw: unknown): number => {
  const value = typeof raw === "string" ? Number(raw) : raw;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return PROJECT_ACTIVITY_PAGE_LIMIT.default;
  }
  return Math.min(
    PROJECT_ACTIVITY_PAGE_LIMIT.max,
    Math.max(PROJECT_ACTIVITY_PAGE_LIMIT.min, Math.trunc(value)),
  );
};

const blank = (value: string | null | undefined): boolean =>
  value === null || value === undefined || value.trim().length === 0;

/** limit 1–100 (default 50), opaque cursor, category access|wake|safety, since ISO. */
export const parseProjectActivityQuery = (
  input: ProjectActivityQueryInput,
):
  | { readonly ok: true; readonly query: ProjectActivityQuery }
  | { readonly ok: false; readonly code: "invalid_cursor" | "invalid_query" } => {
  const cursor = decodeProjectActivityCursor(input.cursor);
  if (cursor === "invalid") {
    return { ok: false, code: "invalid_cursor" };
  }
  const category = blank(input.category) ? null : String(input.category).trim();
  if (
    category !== null &&
    !(PROJECT_ACTIVITY_CATEGORIES as readonly string[]).includes(category)
  ) {
    return { ok: false, code: "invalid_query" };
  }
  const since = blank(input.since) ? null : String(input.since).trim();
  if (since !== null && Number.isNaN(Date.parse(since))) {
    return { ok: false, code: "invalid_query" };
  }
  return {
    ok: true,
    query: {
      limit: clampLimit(input.limit),
      cursor,
      category: category as ProjectActivityCategory | null,
      since: since === null ? null : new Date(since).toISOString(),
    },
  };
};
