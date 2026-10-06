import { describe, expect, it } from "vitest";

import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { decideComputerRunApproval } from "@/lib/projects/acl/messaging/decideComputerRunApproval";

const OWNER = "user-owner";

describe("decideComputerRunApproval (S0-1 / S0-2)", () => {
  it("computer owner's own assign runs without approval", () => {
    expect(
      decideComputerRunApproval({
        requesterUserId: OWNER,
        executorUserId: OWNER,
        executorDispatchPolicy: DispatchPolicy.APPROVAL,
        projectAllowsRunsWithoutApproval: false,
      }),
    ).toEqual({ dispatchPolicy: DispatchPolicy.APPROVAL, requiresApproval: false });
  });

  it.each([
    ["a bot member", "bot-user-1"],
    ["a human member", "user-member"],
    ["a bot claimed by the same human (own user id)", "bot-claimed-by-owner"],
  ])("%s needs approval by default (setting OFF)", (_label, requester) => {
    expect(
      decideComputerRunApproval({
        requesterUserId: requester,
        executorUserId: OWNER,
        executorDispatchPolicy: DispatchPolicy.APPROVAL,
        projectAllowsRunsWithoutApproval: false,
      }),
    ).toEqual({ dispatchPolicy: DispatchPolicy.APPROVAL, requiresApproval: true });
  });

  it("project 'Allow runs without approval' ON skips approval for others", () => {
    expect(
      decideComputerRunApproval({
        requesterUserId: "bot-user-1",
        executorUserId: OWNER,
        executorDispatchPolicy: DispatchPolicy.APPROVAL,
        projectAllowsRunsWithoutApproval: true,
      }),
    ).toEqual({ dispatchPolicy: DispatchPolicy.OPEN, requiresApproval: false });
  });

  it("honours the executor's own dispatch policy (resolveDispatchPolicyForExecutor)", () => {
    expect(
      decideComputerRunApproval({
        requesterUserId: "bot-user-1",
        executorUserId: OWNER,
        executorDispatchPolicy: DispatchPolicy.OPEN,
        projectAllowsRunsWithoutApproval: false,
      }).requiresApproval,
    ).toBe(false);
  });
});
