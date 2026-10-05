import { beforeEach, describe, expect, it, vi } from "vitest";

import { CLAIM_BOT_ENTRY_FAIL_LIMIT } from "@/lib/agentAccess/claimBot/claimBot.constants";
import { resetClaimBotSchemaEnsureForTests } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { recordClaimEntryFailure } from "@/lib/agentAccess/claimBot/recordClaimEntryFailure";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("recordClaimEntryFailure lock boundary", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetClaimBotSchemaEnsureForTests();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("engages the DB lock exactly when the prior count is limit-1", async () => {
    let locked = false;
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("COUNT(*)") && q.includes("agent_bot_claim_entry_failures")) {
        return [{ failure_count: CLAIM_BOT_ENTRY_FAIL_LIMIT - 1 }];
      }
      if (q.includes("INSERT INTO agent_bot_claim_entry_failures")) return [];
      if (q.includes("INSERT INTO agent_bot_claim_entry_locks")) {
        locked = true;
        return [];
      }
      return [];
    });
    const result = await recordClaimEntryFailure({
      userId: "human-1",
      nowMs: 1_700_000_000_000,
    });
    expect(result.locked).toBe(true);
    if (result.locked) expect(result.retryAt).toBeTruthy();
    expect(locked).toBe(true);
  });

  it("does not lock below the boundary", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("COUNT(*)")) {
        return [{ failure_count: CLAIM_BOT_ENTRY_FAIL_LIMIT - 2 }];
      }
      if (q.includes("INSERT INTO agent_bot_claim_entry_failures")) return [];
      return [];
    });
    const result = await recordClaimEntryFailure({
      userId: "human-1",
      nowMs: 1_700_000_000_000,
    });
    expect(result).toEqual({ locked: false });
    expect(
      sqlMock.mock.calls.some((c) =>
        String(c[0]).includes("INSERT INTO agent_bot_claim_entry_locks"),
      ),
    ).toBe(false);
  });
});
