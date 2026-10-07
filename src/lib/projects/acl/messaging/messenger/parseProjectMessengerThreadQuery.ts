import {
  decodeProjectMessengerCursor,
  type ProjectMessengerCursor,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import {
  PROJECT_MESSENGER_PAGE_DEFAULT_LIMIT,
  PROJECT_MESSENGER_PAGE_MAX_LIMIT,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

export type ProjectMessengerThreadQuery = {
  readonly before: ProjectMessengerCursor | null;
  readonly beforeRaw: string | null;
  readonly limit: number;
};

export type ParseProjectMessengerThreadQueryResult =
  | { readonly ok: true; readonly query: ProjectMessengerThreadQuery }
  | { readonly ok: false; readonly code: "invalid_before" | "invalid_limit" };

const readParam = (
  params: URLSearchParams,
  key: string,
): string | null => {
  const value = params.get(key);
  if (value === null) return null;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
};

/** before = opaque cursor; limit = 1..MAX (default DEFAULT). */
export const parseProjectMessengerThreadQuery = (
  searchParams: URLSearchParams,
): ParseProjectMessengerThreadQueryResult => {
  const beforeRaw = readParam(searchParams, "before");
  const before = decodeProjectMessengerCursor(beforeRaw);
  if (before === "invalid") {
    return { ok: false, code: "invalid_before" };
  }
  const limitRaw = readParam(searchParams, "limit");
  let limit = PROJECT_MESSENGER_PAGE_DEFAULT_LIMIT;
  if (limitRaw !== null) {
    if (!/^\d+$/.test(limitRaw)) {
      return { ok: false, code: "invalid_limit" };
    }
    limit = Number(limitRaw);
    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > PROJECT_MESSENGER_PAGE_MAX_LIMIT
    ) {
      return { ok: false, code: "invalid_limit" };
    }
  }
  return {
    ok: true,
    query: { before, beforeRaw, limit },
  };
};
