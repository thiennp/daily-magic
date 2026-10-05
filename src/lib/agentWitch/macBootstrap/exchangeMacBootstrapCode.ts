import { createAgentWitchInstallTokenForUser } from "@/lib/agentWitch/createAgentWitchInstallTokenForUser";
import { burnMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/burnMacBootstrapCode";
import { classifyMacBootstrapExchangeMiss } from "@/lib/agentWitch/macBootstrap/classifyMacBootstrapExchangeMiss";
import { computeMacBootstrapScriptSha256 } from "@/lib/agentWitch/macBootstrap/computeMacBootstrapScriptSha256";
import { ensureMacBootstrapSchema } from "@/lib/agentWitch/macBootstrap/ensureMacBootstrapSchema";
import { hashMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/hashMacBootstrapCode";
import { loadPendingMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/loadPendingMacBootstrapCode";
import { MAC_BOOTSTRAP_SCRIPT_URL } from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";
import { MAC_BOOTSTRAP_ERROR_SLUG } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";
import type { ExchangeMacBootstrapCodeResult } from "@/lib/agentWitch/macBootstrap/types/ExchangeMacBootstrapCodeResult.type";
import { verifyPkceS256 } from "@/lib/agentWitch/macBootstrap/verifyPkceS256";
import { asRowArray, getSql } from "@/lib/db";

export type { ExchangeMacBootstrapCodeResult };

/**
 * Validate unused/unexpired code, state match, S256 verifier; burn code;
 * return installToken + tokenless script metadata. Never logs secrets.
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
  const loaded = await loadPendingMacBootstrapCode({
    codeHash,
    state: input.state,
    nowMs,
  });
  if (!loaded.ok) {
    return loaded;
  }
  if (
    !verifyPkceS256({
      codeVerifier: input.codeVerifier,
      codeChallenge: loaded.pending.codeChallenge,
    })
  ) {
    return {
      ok: false,
      status: 400,
      error: MAC_BOOTSTRAP_ERROR_SLUG.bad_verifier,
    };
  }

  const userId = await burnMacBootstrapCode({
    codeHash,
    state: input.state,
    nowIso: new Date(nowMs).toISOString(),
  });
  if (userId === null) {
    return classifyMacBootstrapExchangeMiss({
      codeHash,
      state: input.state,
      nowMs,
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
