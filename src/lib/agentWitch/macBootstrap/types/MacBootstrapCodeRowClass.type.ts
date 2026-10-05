import type { ExchangeMacBootstrapCodeFailure } from "@/lib/agentWitch/macBootstrap/types/ExchangeMacBootstrapCodeResult.type";

export type PendingMacBootstrapCode = {
  readonly userId: string;
  readonly codeChallenge: string;
};

/** Pure classification of one `agent_witch_mac_bootstrap_codes` row (or its absence). */
export type MacBootstrapCodeRowClass =
  | { readonly ok: true; readonly pending: PendingMacBootstrapCode }
  | ExchangeMacBootstrapCodeFailure;
