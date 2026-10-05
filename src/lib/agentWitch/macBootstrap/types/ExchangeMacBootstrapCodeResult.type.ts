import type { MacBootstrapErrorSlug } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";

export type ExchangeMacBootstrapCodeSuccess = {
  readonly ok: true;
  readonly installToken: string;
  readonly profileEmail: string;
  readonly scriptUrl: string;
  readonly scriptSha256: string;
};

export type ExchangeMacBootstrapCodeFailure = {
  readonly ok: false;
  readonly status: 400 | 410;
  readonly error: MacBootstrapErrorSlug;
};

export type ExchangeMacBootstrapCodeResult =
  | ExchangeMacBootstrapCodeSuccess
  | ExchangeMacBootstrapCodeFailure;
