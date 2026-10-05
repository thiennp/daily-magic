import { createAgentWitchInstallTokenForUser } from "@/lib/agentWitch/createAgentWitchInstallTokenForUser";
import { burnMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/burnMacBootstrapCode";
import { computeMacBootstrapScriptSha256 } from "@/lib/agentWitch/macBootstrap/computeMacBootstrapScriptSha256";
import { ensureMacBootstrapSchema } from "@/lib/agentWitch/macBootstrap/ensureMacBootstrapSchema";
import { hashMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/hashMacBootstrapCode";
import { loadPendingMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/loadPendingMacBootstrapCode";
import { MAC_BOOTSTRAP_SCRIPT_URL } from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";
import { MAC_BOOTSTRAP_ERROR_SLUG } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";
import { rejectMacBootstrapExchange } from "@/lib/agentWitch/macBootstrap/rejectMacBootstrapExchange";
import type { ExchangeMacBootstrapCodeResult } from "@/lib/agentWitch/macBootstrap/types/ExchangeMacBootstrapCodeResult.type";
import { verifyPkceS256 } from "@/lib/agentWitch/macBootstrap/verifyPkceS256";
import { asRowArray, getSql } from "@/lib/db";

export type { ExchangeMacBootstrapCodeResult };

/**
 * Sole burn owner. Loader only reads + classifies; this burns on success
 * (atomic consume) and on every failed redemption once a row exists
 * (OAuth one-time: a failed redeem suggests interception). Unknown hash: no
 * burn. Returns installToken + tokenless script metadata. Never logs secrets.
 */
export const exchangeMacBootstrapCode = async (input: {
  readonly code: string;
  readonly state: string;
  readonly codeVerifier: string;
  readonly nowMs?: number;
}): Promise<ExchangeMacBootstrapCodeResult> => {
  await ensureMacBootstrapSchema();
  const nowMs = input.nowMs ?? Date.now();
  const codeHash = hashMacBootstrapCode(input.code);
  const load = () =>
    loadPendingMacBootstrapCode({ codeHash, state: input.state, nowMs });
  const loaded = await load();
  if (!loaded.classified.ok) {
    return rejectMacBootstrapExchange({
      codeHash,
      nowMs,
      rowFound: loaded.rowFound,
      failure: loaded.classified,
    });
  }
  if (
    !verifyPkceS256({
      codeVerifier: input.codeVerifier,
      codeChallenge: loaded.classified.pending.codeChallenge,
    })
  ) {
    return rejectMacBootstrapExchange({
      codeHash,
      nowMs,
      rowFound: true,
      failure: {
        ok: false,
        status: 400,
        error: MAC_BOOTSTRAP_ERROR_SLUG.bad_verifier,
      },
    });
  }

  const userId = await burnMacBootstrapCode({
    codeHash,
    state: input.state,
    nowIso: new Date(nowMs).toISOString(),
  });
  if (userId === null) {
    const reloaded = await load();
    return rejectMacBootstrapExchange({
      codeHash,
      nowMs,
      rowFound: reloaded.rowFound,
      failure: reloaded.classified.ok
        ? {
            ok: false,
            status: 400,
            error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_code,
          }
        : reloaded.classified,
    });
  }

  const userRows = asRowArray(
    await getSql()`
      SELECT email FROM users WHERE id = ${userId} LIMIT 1
    `,
  );
  const emailRaw = userRows[0]?.email;
  const profileEmail =
    typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  if (profileEmail.length === 0) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.mint_failed,
    };
  }

  const install = await createAgentWitchInstallTokenForUser({
    userId,
    email: profileEmail,
    origin: "https://www.agentwitch.com",
  });

  return {
    ok: true,
    installToken: install.pairingToken,
    profileEmail,
    scriptUrl: MAC_BOOTSTRAP_SCRIPT_URL,
    scriptSha256: computeMacBootstrapScriptSha256(),
  };
};
