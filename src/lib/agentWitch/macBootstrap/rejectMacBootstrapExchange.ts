import { burnMacBootstrapCodeOnFailedAttempt } from "@/lib/agentWitch/macBootstrap/burnMacBootstrapCode";
import type { ExchangeMacBootstrapCodeFailure } from "@/lib/agentWitch/macBootstrap/types/ExchangeMacBootstrapCodeResult.type";

/**
 * Exchange's sole failure-burn site: consume the code iff a row exists for
 * this hash (unknown hash → no burn), then return the failure unchanged.
 */
export const rejectMacBootstrapExchange = async (input: {
  readonly codeHash: string;
  readonly nowMs: number;
  readonly rowFound: boolean;
  readonly failure: ExchangeMacBootstrapCodeFailure;
}): Promise<ExchangeMacBootstrapCodeFailure> => {
  if (input.rowFound) {
    await burnMacBootstrapCodeOnFailedAttempt({
      codeHash: input.codeHash,
      nowIso: new Date(input.nowMs).toISOString(),
    });
  }
  return input.failure;
};
