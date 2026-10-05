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

describe("redeemClaimBotCode locked entry", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetClaimBotSchemaEnsureForTests();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("returns locked with retryAt when the entry gate is closed", async () => {
    const retryAt = new Date(REDEEM_TEST_NOW + 60_000).toISOString();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isClaimBotSchemaSql(q)) return [];
      if (q.includes("FROM agent_bot_claim_entry_locks")) {
        return [{ locked_until: retryAt }];
      }
      if (q.includes("FROM agent_bot_claim_entry_failures") && q.includes("COUNT")) {
        return [{ failure_count: 5 }];
      }
      return [];
    });
    const result = await redeemClaimBotCode({
      code: REDEEM_TEST_CODE,
      claimantUserId: "human-1",
      nowMs: REDEEM_TEST_NOW,
    });
    expect(result).toEqual({ ok: false, code: "locked", retryAt });
    expect(
      sqlMock.mock.calls.some((c) => String(c[0]).includes("WITH matched AS")),
    ).toBe(false);
  });
});
