import { describe, expect, it } from "vitest";

import { projectHasOwnerComputer } from "@/features/projects/utils/projectHasOwnerComputer";

describe("projectHasOwnerComputer", () => {
  it("is true only with a bound owner device", () => {
    expect(projectHasOwnerComputer({ deviceId: "dev-1" })).toBe(true);
    expect(projectHasOwnerComputer({ deviceId: null })).toBe(false);
    expect(projectHasOwnerComputer({ deviceId: "  " })).toBe(false);
  });
});
