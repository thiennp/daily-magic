import { describe, expect, it } from "vitest";

import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { resolveEffectiveDispatchPolicy } from "@/lib/dispatch/resolveEffectiveDispatchPolicy";

describe("resolveEffectiveDispatchPolicy", () => {
  it("prefers device over user and group", () => {
    expect(
      resolveEffectiveDispatchPolicy({
        devicePolicy: DispatchPolicy.OPEN,
        userPolicy: DispatchPolicy.APPROVAL,
        groupPolicy: DispatchPolicy.APPROVAL,
      }),
    ).toBe(DispatchPolicy.OPEN);
  });

  it("falls back to user then group then default", () => {
    expect(
      resolveEffectiveDispatchPolicy({
        userPolicy: DispatchPolicy.OPEN,
        groupPolicy: DispatchPolicy.APPROVAL,
      }),
    ).toBe(DispatchPolicy.OPEN);

    expect(
      resolveEffectiveDispatchPolicy({
        groupPolicy: DispatchPolicy.OPEN,
      }),
    ).toBe(DispatchPolicy.OPEN);

    expect(resolveEffectiveDispatchPolicy({})).toBe(DispatchPolicy.APPROVAL);
  });
});
