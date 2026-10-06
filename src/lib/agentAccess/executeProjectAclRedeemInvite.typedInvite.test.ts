import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  REDEEM_NO_TYPE_GROK_RETRY_LINE,
  buildProjectAclRedeemInviteMessage,
} from "@/lib/agentAccess/buildProjectAclRedeemInviteMessage";
import { executeProjectAclRedeemInviteTool } from "@/lib/agentAccess/executeProjectAclRedeemInviteTool";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { PROJECT_INVITE_JOIN_TYPE_IDS } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";
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

const redeemOn = async (platform: string, joinType?: string) => {
  sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining"))
        return [{ ...REDEEM_SUGGEST_INVITE_ROW, platform }];
      if (q.includes("INSERT INTO project_access_requests"))
        return [{ ...redeemSuggestPendingRow(null), join_platform: values[9] }];
      return [];
    },
  );
  const result = await executeProjectAclRedeemInviteTool({
    actor: {
      id: "bot-1",
      email: "agt@agents.agentwitch.com",
      name: "Assistant",
      globalRole: "user",
      registrationMethod: "none",
    },
    name: "redeem_project_invite",
    args: { token: "a".repeat(22), ...(joinType ? { joinType } : {}) },
  });
  return String(
    (JSON.parse(result?.text ?? "{}") as { message?: unknown }).message,
  );
};

/** Today's reply for a typed invite with no joinType (unchanged by Lead (a)). */
const LEGACY = buildProjectAclRedeemInviteMessage({
  status: "pending",
  poll: false,
  hasSuggestedName: false,
});

describe("typed invites (platform grok / muse) keep today's redeem reply", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it.each(["grok", "muse"])(
    "%s invite + omitted or unknown joinType → legacy Grok-routine reply",
    async (platform) => {
      expect(await redeemOn(platform)).toBe(LEGACY);
      expect(await redeemOn(platform, "made-up")).toBe(LEGACY);
    },
  );

  it.each(["grok", "muse"])(
    "%s invite + any joinType → no Grok retry line",
    async (platform) => {
      for (const joinType of PROJECT_INVITE_JOIN_TYPE_IDS) {
        expect(await redeemOn(platform, joinType), joinType).not.toContain(
          REDEEM_NO_TYPE_GROK_RETRY_LINE,
        );
      }
    },
  );
});
