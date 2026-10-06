import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import {
  REDEEM_SUGGEST_INVITE_ROW,
  redeemSuggestPendingRow,
} from "@/lib/projects/acl/invites/redeemSuggestedName.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

const stubRedeemSql = (captured: { insert?: string; values?: unknown[] }) =>
  sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (
        q.includes("UPDATE project_invites") &&
        q.includes("uses_remaining")
      ) {
        return [REDEEM_SUGGEST_INVITE_ROW];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        captured.insert = q;
        captured.values = values;
        return [{ ...redeemSuggestPendingRow(null), join_platform: values[9] }];
      }
      return [];
    },
  );

describe("redeem stores the assistant's joinType for the join-time mode", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("writes join_platform on the pending request (stays pending)", async () => {
    const captured: { insert?: string; values?: unknown[] } = {};
    stubRedeemSql(captured);
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      joinPlatform: "copilot_studio",
    });
    expect(result.ok && result.status).toBe("pending");
    expect(captured.insert).toContain("join_platform");
    expect(captured.values?.[9]).toBe("copilot_studio");
    if (result.ok) expect(result.request.joinPlatform).toBe("copilot_studio");
  });

  it("no joinType → NULL join_platform", async () => {
    const captured: { insert?: string; values?: unknown[] } = {};
    stubRedeemSql(captured);
    await redeemProjectInvite({ token: "a".repeat(22), actorUserId: "bot-1" });
    expect(captured.values?.[9]).toBeNull();
  });

  it("schema ensure adds the 093 column", async () => {
    stubRedeemSql({});
    await redeemProjectInvite({ token: "a".repeat(22), actorUserId: "bot-1" });
    const ddl = sqlMock.mock.calls.map((c) => String(c[0])).join("\n");
    expect(ddl).toContain("ADD COLUMN IF NOT EXISTS join_platform TEXT");
  });
});
