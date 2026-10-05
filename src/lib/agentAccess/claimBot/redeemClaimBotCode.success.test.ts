import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetClaimBotSchemaEnsureForTests } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import {
  isClaimBotSchemaSql,
  REDEEM_TEST_CODE,
  REDEEM_TEST_HASH,
  REDEEM_TEST_NOW,
} from "@/lib/agentAccess/claimBot/redeemClaimBotCode.testUtils";
import { redeemClaimBotCode } from "@/lib/agentAccess/claimBot/redeemClaimBotCode";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("redeemClaimBotCode success", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetClaimBotSchemaEnsureForTests();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("atomically claims an unowned bot and marks the code redeemed", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (isClaimBotSchemaSql(q)) return [];
      if (q.includes("FROM agent_bot_claim_entry_locks")) return [];
      if (q.includes("FROM agent_bot_claim_entry_failures") && q.includes("COUNT")) {
        return [{ failure_count: 0 }];
      }
      if (q.includes("WITH matched AS")) {
        expect(values).toContain(REDEEM_TEST_HASH);
        expect(q).toContain("t.owner_user_id IS NULL");
        expect(q).toContain("matched.expires_at >");
        expect(q).toContain("matched.redeemed_at IS NULL");
        return [{ token_id: "tok-1", bot_user_id: "bot-1" }];
      }
      if (q.includes("SET revoked_at") || q.includes("DELETE FROM agent_bot_claim_entry")) {
        return [];
      }
      return [];
    });
    const result = await redeemClaimBotCode({
      code: REDEEM_TEST_CODE,
      claimantUserId: "human-1",
      nowMs: REDEEM_TEST_NOW,
    });
    expect(result).toEqual({
      ok: true,
      tokenId: "tok-1",
      botUserId: "bot-1",
    });
  });
});
