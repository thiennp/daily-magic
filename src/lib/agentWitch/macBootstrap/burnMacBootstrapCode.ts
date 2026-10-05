import { asRowArray, getSql } from "@/lib/db";

/** Atomically mark code consumed; returns userId if this caller won the burn. */
export const burnMacBootstrapCode = async (input: {
  readonly codeHash: string;
  readonly state: string;
  readonly nowIso: string;
}): Promise<string | null> => {
  const sql = getSql();
  const burned = asRowArray(
    await sql`
      UPDATE agent_witch_mac_bootstrap_codes
      SET consumed_at = ${input.nowIso}::timestamptz
      WHERE code_hash = ${input.codeHash}
        AND consumed_at IS NULL
        AND expires_at > ${input.nowIso}::timestamptz
        AND state = ${input.state}
      RETURNING user_id
    `,
  );
  const row = burned[0];
  return typeof row?.user_id === "string" ? row.user_id : null;
};

/**
 * Consume a found code after a failed exchange (wrong state, bad verifier, …).
 * By hash only — do not call when no row exists.
 */
export const burnMacBootstrapCodeOnFailedAttempt = async (input: {
  readonly codeHash: string;
  readonly nowIso: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_mac_bootstrap_codes
    SET consumed_at = ${input.nowIso}::timestamptz
    WHERE code_hash = ${input.codeHash}
      AND consumed_at IS NULL
  `;
};
