import { beforeEach, describe, expect, it, vi } from "vitest";

import { executeProjectAclRedeemInviteTool } from "@/lib/agentAccess/executeProjectAclRedeemInviteTool";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { parseProjectInviteJoinPlatform } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";
import {
  REDEEM_SUGGEST_INVITE_ROW,
  redeemSuggestPendingRow,
} from "@/lib/projects/acl/invites/redeemSuggestedName.fixtures";
import { REDEEM_NO_TYPE_GROK_RETRY_LINE } from "@/lib/agentAccess/buildProjectAclRedeemInviteMessage";
import { PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE } from "@/lib/projects/acl/projectMembershipPollJoinGuidance.constant";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

/** Universal S0c invite: no platform chosen at create, auto-approve off. */
const NO_TYPE_INVITE = { ...REDEEM_SUGGEST_INVITE_ROW, platform: null };
const GROK_ROUTINE = "create your Grok webhook-triggered routine";
const captured: { joinPlatform?: unknown } = {};

const redeemAs = async (joinType: string | undefined) => {
  sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining"))
        return [NO_TYPE_INVITE];
      if (q.includes("INSERT INTO project_access_requests")) {
        captured.joinPlatform = values[9];
        return [{ ...redeemSuggestPendingRow(null), join_platform: values[9] }];
      }
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
  return JSON.parse(result?.text ?? "{}") as Record<string, unknown>;
};

const CASES: readonly (readonly [string, string | undefined])[] = [
  ...PROJECT_INVITE_JOIN_TYPES.map((t) => [t.id, t.id] as const),
  ["(omitted)", undefined],
  ["(unknown)", "made-up"],
];

describe("no-type (universal) invite redeem, per /join types[] id", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    captured.joinPlatform = "unset";
  });

  it.each(CASES)(
    "%s → pending, no grant, join_platform stored",
    async (_, joinType) => {
      const body = await redeemAs(joinType);
      expect(body).toMatchObject({
        ok: true,
        status: "pending",
        namingRequired: true,
      });
      expect(body).not.toHaveProperty("projectApiKey");
      expect(body).not.toHaveProperty("membershipId");
      expect(captured.joinPlatform).toBe(
        parseProjectInviteJoinPlatform(joinType),
      );
    },
  );

  it.each(CASES)(
    "%s → reply guidance matches the type (omitted/unknown: poll + Grok retry line)",
    async (_, joinType) => {
      const message = String((await redeemAs(joinType)).message);
      const noType = parseProjectInviteJoinPlatform(joinType) === null;
      expect(message.split(REDEEM_NO_TYPE_GROK_RETRY_LINE)).toHaveLength(
        noType ? 2 : 1,
      );
      if (joinType === "grok-bot") {
        expect(message).toContain(GROK_ROUTINE);
        expect(message).not.toContain(PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE);
      } else {
        expect(message).toContain(PROJECT_MEMBERSHIP_POLL_JOIN_GUIDANCE);
        expect(message).not.toContain(GROK_ROUTINE);
      }
      expect(message).toContain("pending until the project owner Approves");
    },
  );
});
