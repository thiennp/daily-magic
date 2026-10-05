import { randomUUID } from "node:crypto";

import { createMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/createMacBootstrapCode";
import { ensureMacBootstrapSchema } from "@/lib/agentWitch/macBootstrap/ensureMacBootstrapSchema";
import { hashMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/hashMacBootstrapCode";
import {
  MAC_BOOTSTRAP_CODE_TTL_MS,
  MAC_BOOTSTRAP_PKCE_METHOD,
} from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";
import { getSql } from "@/lib/db";

export type MintMacBootstrapCodeResult =
  | { readonly ok: true; readonly code: string; readonly expiresAt: string }
  | { readonly ok: false };

/**
 * Mint a one-time bootstrap code bound to state + S256 challenge + user.
 * Plaintext is returned once for the custom-scheme redirect; only the hash is stored.
 */
export const mintMacBootstrapCode = async (input: {
  readonly userId: string;
  readonly state: string;
  readonly codeChallenge: string;
  readonly nowMs?: number;
}): Promise<MintMacBootstrapCodeResult> => {
  try {
    await ensureMacBootstrapSchema();
    const nowMs = input.nowMs ?? Date.now();
    const expiresAt = new Date(nowMs + MAC_BOOTSTRAP_CODE_TTL_MS);
    const code = createMacBootstrapCode();
    const codeHash = hashMacBootstrapCode(code);
    const sql = getSql();
    await sql`
      INSERT INTO agent_witch_mac_bootstrap_codes (
        id, code_hash, user_id, state, code_challenge, code_challenge_method,
        expires_at, created_at
      )
      VALUES (
        ${randomUUID()},
        ${codeHash},
        ${input.userId},
        ${input.state},
        ${input.codeChallenge},
        ${MAC_BOOTSTRAP_PKCE_METHOD},
        ${expiresAt.toISOString()},
        ${new Date(nowMs).toISOString()}
      )
    `;
    return { ok: true, code, expiresAt: expiresAt.toISOString() };
  } catch {
    return { ok: false };
  }
};
