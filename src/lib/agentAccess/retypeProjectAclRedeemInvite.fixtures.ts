import type { Mock } from "vitest";

import { executeProjectAclRedeemInviteTool } from "@/lib/agentAccess/executeProjectAclRedeemInviteTool";
import {
  REDEEM_SUGGEST_INVITE_ROW,
  redeemSuggestPendingRow,
} from "@/lib/projects/acl/invites/redeemSuggestedName.fixtures";

export const RETYPE_GROK_ROUTINE = "create your Grok webhook-triggered routine";

/** Shared harness for the re-redeem (re-type) tests; the caller owns vi.mock. */
export const createRetypeRedeemHarness = (sqlMock: Mock) => {
  const queries: string[] = [];
  const retypeValues: unknown[][] = [];

  /** inviteHasUse: multi-use invite (claim works) vs used-up single-use invite. */
  const stub = (opts: { inviteHasUse: boolean; pendingRequest: boolean }) =>
    sqlMock.mockImplementation(
      async (strings: TemplateStringsArray, ...values: unknown[]) => {
        const q = String(strings);
        queries.push(q);
        if (q.includes("UPDATE project_invites") && q.includes("- 1"))
          return opts.inviteHasUse
            ? [{ ...REDEEM_SUGGEST_INVITE_ROW, platform: null }]
            : [];
        if (q.includes("UPDATE project_access_requests")) {
          retypeValues.push(values);
          return opts.pendingRequest
            ? [
                {
                  ...redeemSuggestPendingRow("Helper"),
                  join_platform: values[0],
                  invite_platform: null,
                },
              ]
            : [];
        }
        return [];
      },
    );

  const redeem = async (joinType?: string) => {
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
    return {
      isError: result?.isError,
      body: JSON.parse(result?.text ?? "{}") as Record<string, unknown>,
    };
  };

  return { queries, retypeValues, stub, redeem };
};
