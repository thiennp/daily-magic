import { MAC_BOOTSTRAP_ERROR_SLUG } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";
import type { ExchangeMacBootstrapCodeFailure } from "@/lib/agentWitch/macBootstrap/types/ExchangeMacBootstrapCodeResult.type";
import { asRowArray, getSql } from "@/lib/db";

export type PendingMacBootstrapCode = {
  readonly userId: string;
  readonly codeChallenge: string;
};

export type LoadPendingMacBootstrapCodeResult =
  | { readonly ok: true; readonly pending: PendingMacBootstrapCode }
  | ExchangeMacBootstrapCodeFailure;

/** Load by hash and enforce unused / unexpired / state match (before PKCE). */
export const loadPendingMacBootstrapCode = async (input: {
  readonly codeHash: string;
  readonly state: string;
  readonly nowMs: number;
}): Promise<LoadPendingMacBootstrapCodeResult> => {
  const sql = getSql();
  const pending = asRowArray(
    await sql`
      SELECT user_id, state, code_challenge, expires_at, consumed_at
      FROM agent_witch_mac_bootstrap_codes
      WHERE code_hash = ${input.codeHash}
      LIMIT 1
    `,
  );
  const found = pending[0];
  if (found === undefined) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_code,
    };
  }
  if (typeof found.consumed_at === "string" && found.consumed_at.length > 0) {
    return { ok: false, status: 410, error: MAC_BOOTSTRAP_ERROR_SLUG.reused };
  }
  const expiresAt =
    typeof found.expires_at === "string" ? Date.parse(found.expires_at) : NaN;
  if (Number.isFinite(expiresAt) && expiresAt <= input.nowMs) {
    return { ok: false, status: 410, error: MAC_BOOTSTRAP_ERROR_SLUG.expired };
  }
  if (typeof found.state !== "string" || found.state !== input.state) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.state_mismatch,
    };
  }
  if (typeof found.user_id !== "string" || found.user_id.length === 0) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_code,
    };
  }
  return {
    ok: true,
    pending: {
      userId: found.user_id,
      codeChallenge:
        typeof found.code_challenge === "string" ? found.code_challenge : "",
    },
  };
};
