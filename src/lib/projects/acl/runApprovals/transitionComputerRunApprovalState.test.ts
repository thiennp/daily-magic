import { describe, expect, it } from "vitest";

import { ComputerRunApprovalState } from "@/lib/projects/acl/runApprovals/computerRunApprovalState.constant";
import { transitionComputerRunApprovalState } from "@/lib/projects/acl/runApprovals/transitionComputerRunApprovalState";

describe("transitionComputerRunApprovalState", () => {
  it("allows pending → approved | declined | timed_out", () => {
    for (const to of [
      ComputerRunApprovalState.APPROVED,
      ComputerRunApprovalState.DECLINED,
      ComputerRunApprovalState.TIMED_OUT,
    ] as const) {
      expect(
        transitionComputerRunApprovalState({
          from: ComputerRunApprovalState.PENDING,
          to,
        }),
      ).toEqual({ ok: true, state: to });
    }
  });

  it("rejects any transition from a terminal state", () => {
    for (const from of [
      ComputerRunApprovalState.APPROVED,
      ComputerRunApprovalState.DECLINED,
      ComputerRunApprovalState.TIMED_OUT,
    ] as const) {
      const result = transitionComputerRunApprovalState({
        from,
        to: ComputerRunApprovalState.APPROVED,
      });
      expect(result).toMatchObject({ ok: false, code: "invalid_transition", from });
    }
  });
});
