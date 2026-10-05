import { hashClaimBotCode } from "@/lib/agentAccess/claimBot/hashClaimBotCode";

export const REDEEM_TEST_CODE = "awc_claim_testcode123";
export const REDEEM_TEST_HASH = hashClaimBotCode(REDEEM_TEST_CODE);
export const REDEEM_TEST_NOW = 1_700_000_000_000;

export const isClaimBotSchemaSql = (q: string): boolean =>
  q.includes("CREATE TABLE") ||
  q.includes("ALTER TABLE") ||
  q.includes("CREATE INDEX");
