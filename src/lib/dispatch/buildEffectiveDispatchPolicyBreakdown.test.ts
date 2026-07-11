import { describe, expect, it } from "vitest";

import { buildEffectiveDispatchPolicyBreakdown } from "@/lib/dispatch/buildEffectiveDispatchPolicyBreakdown";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";

describe("buildEffectiveDispatchPolicyBreakdown", () => {
  it("prefers device policy over user and group", () => {
    const breakdown = buildEffectiveDispatchPolicyBreakdown({
      devicePolicy: DispatchPolicy.OPEN,
      userPolicy: DispatchPolicy.APPROVAL,
      groupPolicy: DispatchPolicy.APPROVAL,
    });

    expect(breakdown.effective).toBe(DispatchPolicy.OPEN);
    expect(breakdown.winningSource).toBe("device");
  });

  it("falls back to default when all levels inherit", () => {
    const breakdown = buildEffectiveDispatchPolicyBreakdown({});

    expect(breakdown.effective).toBe(DispatchPolicy.APPROVAL);
    expect(breakdown.winningSource).toBe("default");
  });
});
