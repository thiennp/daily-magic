import { computePkceS256Challenge } from "@/lib/agentWitch/macBootstrap/computePkceS256Challenge";
import { hashMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/hashMacBootstrapCode";

export const EXCHANGE_TEST_CODE = "bootstrap-code-plaintext";
export const EXCHANGE_TEST_CODE_HASH = hashMacBootstrapCode(EXCHANGE_TEST_CODE);
export const EXCHANGE_TEST_VERIFIER =
  "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
export const EXCHANGE_TEST_CHALLENGE = computePkceS256Challenge(
  EXCHANGE_TEST_VERIFIER,
);
export const EXCHANGE_TEST_NOW = 1_700_000_000_000;
export const EXCHANGE_TEST_FUTURE = new Date(
  EXCHANGE_TEST_NOW + 60_000,
).toISOString();
export const EXCHANGE_TEST_PAST = new Date(
  EXCHANGE_TEST_NOW - 60_000,
).toISOString();

export const isMacBootstrapSchemaSql = (q: string): boolean =>
  q.includes("CREATE TABLE") || q.includes("CREATE INDEX");

export const pendingBootstrapRow = (input: {
  readonly state?: string;
  readonly expiresAt?: string;
  readonly consumedAt?: string | null;
}): Record<string, unknown> => ({
  user_id: "user-1",
  state: input.state ?? "st-1",
  code_challenge: EXCHANGE_TEST_CHALLENGE,
  expires_at: input.expiresAt ?? EXCHANGE_TEST_FUTURE,
  consumed_at: input.consumedAt === undefined ? null : input.consumedAt,
});
