import { classifyMacBootstrapCodeRow } from "@/lib/agentWitch/macBootstrap/classifyMacBootstrapCodeRow";
import type { MacBootstrapCodeRowClass } from "@/lib/agentWitch/macBootstrap/types/MacBootstrapCodeRowClass.type";
import { asRowArray, getSql } from "@/lib/db";

export type LoadPendingMacBootstrapCodeResult = {
  /** True when a row exists for this hash (exchange burns on failure only then). */
  readonly rowFound: boolean;
  readonly classified: MacBootstrapCodeRowClass;
};

/** Read the row by hash and classify it. Read-only: never burns. */
export const loadPendingMacBootstrapCode = async (input: {
  readonly codeHash: string;
  readonly state: string;
  readonly nowMs: number;
}): Promise<LoadPendingMacBootstrapCodeResult> => {
  const rows = asRowArray(
    await getSql()`
      SELECT user_id, state, code_challenge, expires_at, consumed_at
      FROM agent_witch_mac_bootstrap_codes
      WHERE code_hash = ${input.codeHash}
      LIMIT 1
    `,
  );
  const row = rows[0];
  return {
    rowFound: row !== undefined,
    classified: classifyMacBootstrapCodeRow({
      row,
      state: input.state,
      nowMs: input.nowMs,
    }),
  };
};
