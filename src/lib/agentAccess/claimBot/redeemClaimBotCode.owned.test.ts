import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetClaimBotSchemaEnsureForTests } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import {
  isClaimBotSchemaSql,
  REDEEM_TEST_CODE,
  REDEEM_TEST_NOW,
} from "@/lib/agentAccess/claimBot/redeemClaimBotCode.testUtils";
import { redeemClaimBotCode } from "@/lib/agentAccess/claimBot/redeemClaimBotCode";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

/** Billing gate is covered in redeemClaimBotCode.entitlement.test.ts. */
vi.mock("@/lib/billing/assertAssistantConnectEntitlement", () => ({
  assertAssistantConnectEntitlement: async () => ({ ok: true }),
}));

describe("redeemClaimBotCode over owned bot", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetClaimBotSchemaEnsureForTests();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("refuses claim over an already-owned bot", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isClaimBotSchemaSql(q)) return [];
      if (q.includes("FROM agent_bot_claim_entry_locks")) return [];
      if (q.includes("COUNT")) return [{ failure_count: 0 }];
      if (q.includes("WITH matched AS")) return [];
      if (q.includes("owner_user_id")) {
        return [
          {
            redeemed_at: null,
            superseded_at: null,
            revoked_at: null,
            expires_at: new Date(REDEEM_TEST_NOW + 60_000).toISOString(),
            owner_user_id: "other-owner",
          },
        ];
      }
      if (q.includes("INSERT INTO agent_bot_claim_entry_failures")) return [];
      return [];
    });
    expect(
      await redeemClaimBotCode({
        code: REDEEM_TEST_CODE,
        claimantUserId: "human-1",
        nowMs: REDEEM_TEST_NOW,
      }),
    ).toEqual({ ok: false, code: "already_claimed" });
  });
});
