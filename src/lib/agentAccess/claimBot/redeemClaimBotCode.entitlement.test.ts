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

const entitlementMock = vi.fn();
vi.mock("@/lib/billing/assertAssistantConnectEntitlement", () => ({
  assertAssistantConnectEntitlement: (input: { readonly userId: string }) =>
    entitlementMock(input),
}));

describe("redeemClaimBotCode assistant connect entitlement", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    entitlementMock.mockReset();
    resetClaimBotSchemaEnsureForTests();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("returns assistant_connect_limit and never runs the atomic claim", async () => {
    entitlementMock.mockResolvedValue({
      ok: false,
      code: "assistant_connect_limit",
      errorMessage: "This plan allows up to 0 assistants.",
    });
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (isClaimBotSchemaSql(q)) return [];
      if (q.includes("FROM agent_bot_claim_entry_locks")) return [];
      if (q.includes("FROM agent_bot_claim_entry_failures") && q.includes("COUNT")) {
        return [{ failure_count: 0 }];
      }
      return [];
    });
    const result = await redeemClaimBotCode({
      code: REDEEM_TEST_CODE,
      claimantUserId: "human-1",
      nowMs: REDEEM_TEST_NOW,
    });
    expect(result).toEqual({ ok: false, code: "assistant_connect_limit" });
    expect(entitlementMock).toHaveBeenCalledWith({ userId: "human-1" });
    expect(
      sqlMock.mock.calls.some((c) => String(c[0]).includes("WITH matched AS")),
    ).toBe(false);
  });
});
