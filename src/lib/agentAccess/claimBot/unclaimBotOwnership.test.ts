import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetClaimBotSchemaEnsureForTests } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { unclaimBotOwnership } from "@/lib/agentAccess/claimBot/unclaimBotOwnership";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("unclaimBotOwnership", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetClaimBotSchemaEnsureForTests();
    resetAgentAccessSchemaEnsureForTests();
  });

  it("clears owner_user_id only when the caller is the owner and revokes pending codes", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE agent_access_tokens") && q.includes("owner_user_id = NULL")) {
        expect(values).toEqual(expect.arrayContaining(["tok-1", "human-1"]));
        expect(q).toContain("owner_user_id = ");
        return [{ id: "tok-1" }];
      }
      if (q.includes("SET revoked_at")) {
        return [];
      }
      return [];
    });
    const result = await unclaimBotOwnership({
      tokenId: "tok-1",
      ownerUserId: "human-1",
    });
    expect(result).toEqual({ ok: true, tokenId: "tok-1" });
    expect(
      sqlMock.mock.calls.some((c) => String(c[0]).includes("SET revoked_at")),
    ).toBe(true);
  });

  it("refuses unclaim by a non-owner", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE agent_access_tokens") && q.includes("owner_user_id = NULL")) {
        return [];
      }
      if (q.includes("SELECT id FROM agent_access_tokens")) {
        return [{ id: "tok-1" }];
      }
      return [];
    });
    const result = await unclaimBotOwnership({
      tokenId: "tok-1",
      ownerUserId: "stranger",
    });
    expect(result).toEqual({ ok: false, code: "not_owner" });
  });
});
