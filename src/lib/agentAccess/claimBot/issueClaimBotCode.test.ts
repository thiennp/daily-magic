import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetClaimBotSchemaEnsureForTests } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { CLAIM_BOT_CODE_PREFIX } from "@/lib/agentAccess/claimBot/claimBot.constants";
import { hashClaimBotCode } from "@/lib/agentAccess/claimBot/hashClaimBotCode";
import { issueClaimBotCode } from "@/lib/agentAccess/claimBot/issueClaimBotCode";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("issueClaimBotCode", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetClaimBotSchemaEnsureForTests();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("issues a hashed code and supersedes prior unused codes", async () => {
    const inserts: unknown[][] = [];
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE") || q.includes("CREATE INDEX")) {
        return [];
      }
      if (q.includes("FROM agent_access_tokens") && q.includes("token_hash")) {
        return [{ id: "tok-1", owner_user_id: null }];
      }
      if (q.includes("SET superseded_at")) {
        return [];
      }
      if (q.includes("INSERT INTO agent_bot_claim_codes")) {
        inserts.push(values);
        return [];
      }
      return [];
    });
    const result = await issueClaimBotCode({
      tokenHash: "abc",
      nowMs: 1_700_000_000_000,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.code.startsWith(CLAIM_BOT_CODE_PREFIX)).toBe(true);
    expect(result.tokenId).toBe("tok-1");
    expect(inserts[0]).toContain(hashClaimBotCode(result.code));
    const supersede = sqlMock.mock.calls.find((c) =>
      String(c[0]).includes("SET superseded_at"),
    );
    expect(String(supersede?.[0])).toContain("redeemed_at IS NULL");
  });

  it("refuses when the bot is already claimed", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("FROM agent_access_tokens")) {
        return [{ id: "tok-1", owner_user_id: "human-1" }];
      }
      return [];
    });
    const result = await issueClaimBotCode({ tokenHash: "abc" });
    expect(result).toEqual({ ok: false, code: "already_claimed" });
    expect(
      sqlMock.mock.calls.some((c) =>
        String(c[0]).includes("INSERT INTO agent_bot_claim_codes"),
      ),
    ).toBe(false);
  });
});
