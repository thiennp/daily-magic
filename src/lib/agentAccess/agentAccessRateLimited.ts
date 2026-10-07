import { AGENT_ACCESS_RATE_LIMIT_EXEMPT_TOOLS } from "@/lib/agentAccess/agentAccess.constant";

const EXEMPT_TOOLS: ReadonlySet<string> = new Set(
  AGENT_ACCESS_RATE_LIMIT_EXEMPT_TOOLS,
);

/** list_project_inbox / ack_project_message skip the per-token buckets (DF-026). */
export const isAgentAccessRateLimitExemptTool = (name: string): boolean =>
  EXEMPT_TOOLS.has(name);

export type AgentAccessRateLimitedBody = {
  readonly ok: false;
  readonly error: string;
  readonly code: "rate_limited";
  readonly retryAfterSeconds: number;
  readonly retryAfterAt: string;
};

/** Shared rate_limited body: tells the caller when one slot frees up. */
export const buildAgentAccessRateLimitedBody = (
  retryAfterSeconds: number,
  nowMs: number = Date.now(),
): AgentAccessRateLimitedBody => ({
  ok: false,
  error: `Too many requests. Wait ${retryAfterSeconds}s before trying again.`,
  code: "rate_limited",
  retryAfterSeconds,
  retryAfterAt: new Date(nowMs + retryAfterSeconds * 1000).toISOString(),
});

/** Retry-After header value for a JSON body that carries retryAfterSeconds. */
export const readAgentAccessRetryAfterHeader = (
  body: unknown,
): Record<string, string> => {
  if (typeof body !== "object" || body === null) {
    return {};
  }
  const { code, retryAfterSeconds } = body as {
    readonly code?: unknown;
    readonly retryAfterSeconds?: unknown;
  };
  if (
    code !== "rate_limited" ||
    typeof retryAfterSeconds !== "number" ||
    !Number.isFinite(retryAfterSeconds) ||
    retryAfterSeconds <= 0
  ) {
    return {};
  }
  return { "Retry-After": String(Math.ceil(retryAfterSeconds)) };
};
