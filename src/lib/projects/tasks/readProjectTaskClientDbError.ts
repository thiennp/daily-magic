export type ProjectTaskClientDbError =
  "invalid_reference" | "update_conflict" | "invalid_arguments";

/** Postgres SQLSTATEs a caller can cause with bad or stale input. */
const CLIENT_SQLSTATES: Readonly<
  Record<string, ProjectTaskClientDbError | undefined>
> = {
  "23503": "invalid_reference",
  "23505": "update_conflict",
  "23502": "invalid_arguments",
  "23514": "invalid_arguments",
  "22001": "invalid_arguments",
  "22P02": "invalid_arguments",
};

/**
 * Client-caused DB error → tool error code (MCP isError / HTTP 4xx), e.g. an
 * owner seat or plan item deleted between validation and write (FK). null =
 * a real server fault; the caller rethrows it (500).
 */
export const readProjectTaskClientDbError = (
  error: unknown,
): ProjectTaskClientDbError | null => {
  if (error === null || typeof error !== "object" || !("code" in error)) {
    return null;
  }
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? (CLIENT_SQLSTATES[code] ?? null) : null;
};
