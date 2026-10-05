import { MAC_BOOTSTRAP_ERROR_SLUG } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";
import type { MacBootstrapCodeRowClass } from "@/lib/agentWitch/macBootstrap/types/MacBootstrapCodeRowClass.type";

const toEpochMs = (value: unknown): number =>
  value instanceof Date
    ? value.getTime()
    : typeof value === "string"
      ? Date.parse(value)
      : NaN;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

/**
 * Single pure classifier for a bootstrap-code row. Order: absent → reused →
 * expired → state mismatch → malformed row. Fails closed: a non-string state
 * is a state mismatch; an unparseable expiry counts as expired.
 */
export const classifyMacBootstrapCodeRow = (input: {
  readonly row: Readonly<Record<string, unknown>> | undefined;
  readonly state: string;
  readonly nowMs: number;
}): MacBootstrapCodeRowClass => {
  const { row } = input;
  if (row === undefined) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_code,
    };
  }
  if (row.consumed_at !== null && row.consumed_at !== undefined) {
    return { ok: false, status: 410, error: MAC_BOOTSTRAP_ERROR_SLUG.reused };
  }
  const expiresAtMs = toEpochMs(row.expires_at);
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= input.nowMs) {
    return { ok: false, status: 410, error: MAC_BOOTSTRAP_ERROR_SLUG.expired };
  }
  if (typeof row.state !== "string" || row.state !== input.state) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.state_mismatch,
    };
  }
  if (!isNonEmptyString(row.user_id) || !isNonEmptyString(row.code_challenge)) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_code,
    };
  }
  return {
    ok: true,
    pending: { userId: row.user_id, codeChallenge: row.code_challenge },
  };
};
