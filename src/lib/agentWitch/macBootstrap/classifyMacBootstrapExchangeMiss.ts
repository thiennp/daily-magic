import { MAC_BOOTSTRAP_ERROR_SLUG } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";
import type { ExchangeMacBootstrapCodeFailure } from "@/lib/agentWitch/macBootstrap/types/ExchangeMacBootstrapCodeResult.type";
import { asRowArray, getSql } from "@/lib/db";

/** Map a failed consume to 400/410 without revealing which check failed first when absent. */
export const classifyMacBootstrapExchangeMiss = async (input: {
  readonly codeHash: string;
  readonly state: string;
  readonly nowMs: number;
}): Promise<ExchangeMacBootstrapCodeFailure> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT state, expires_at, consumed_at
      FROM agent_witch_mac_bootstrap_codes
      WHERE code_hash = ${input.codeHash}
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) {
    return { ok: false, status: 400, error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_code };
  }
  if (typeof row.consumed_at === "string" && row.consumed_at.length > 0) {
    return { ok: false, status: 410, error: MAC_BOOTSTRAP_ERROR_SLUG.reused };
  }
  const expiresAt =
    typeof row.expires_at === "string" ? Date.parse(row.expires_at) : NaN;
  if (Number.isFinite(expiresAt) && expiresAt <= input.nowMs) {
    return { ok: false, status: 410, error: MAC_BOOTSTRAP_ERROR_SLUG.expired };
  }
  if (typeof row.state === "string" && row.state !== input.state) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.state_mismatch,
    };
  }
  return { ok: false, status: 400, error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_code };
};
