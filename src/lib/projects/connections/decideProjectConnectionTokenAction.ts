export type ProjectConnectionTokenAction = "use" | "refresh" | "unusable";

/** Refresh a little early so a call that starts now does not outlive the token. */
export const PROJECT_CONNECTION_TOKEN_REFRESH_SKEW_MS = 60_000;

/**
 * What to do with a stored token: use it, refresh it first, or report the
 * connection as unusable. Tokens without an expiry (GitHub, Slack) are used as-is.
 */
export const decideProjectConnectionTokenAction = (input: {
  readonly status: string;
  readonly tokenExpiresAt: Date | null;
  readonly nowMs: number;
}): ProjectConnectionTokenAction => {
  if (input.status !== "connected") {
    return "unusable";
  }
  if (input.tokenExpiresAt === null) {
    return "use";
  }
  return input.tokenExpiresAt.getTime() - input.nowMs <=
    PROJECT_CONNECTION_TOKEN_REFRESH_SKEW_MS
    ? "refresh"
    : "use";
};
