import { describe, expect, it } from "vitest";

import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { shouldRequireDispatchApproval } from "@/lib/dispatch/shouldRequireDispatchApproval";

describe("shouldRequireDispatchApproval", () => {
  it("skips approval when requester dispatches to their own account", () => {
    expect(
      shouldRequireDispatchApproval({
        requesterUserId: "user-1",
        executorUserId: "user-1",
        dispatchPolicy: DispatchPolicy.APPROVAL,
      }),
    ).toBe(false);
  });

  it("requires approval for teammate dispatch when policy is approval", () => {
    expect(
      shouldRequireDispatchApproval({
        requesterUserId: "user-1",
        executorUserId: "user-2",
        dispatchPolicy: DispatchPolicy.APPROVAL,
      }),
    ).toBe(true);
  });

  it("never requires approval when policy is open", () => {
    expect(
      shouldRequireDispatchApproval({
        requesterUserId: "user-1",
        executorUserId: "user-2",
        dispatchPolicy: DispatchPolicy.OPEN,
      }),
    ).toBe(false);
  });
});
