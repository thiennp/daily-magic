import { describe, expect, it } from "vitest";

import buildHarnessComponentId from "@/lib/components/buildHarnessComponentId";

describe("buildHarnessComponentId", () => {
  it("scopes harness components per owner and slug", () => {
    expect(buildHarnessComponentId("user-a", "demo")).toBe(
      "user-a:harness:demo",
    );
    expect(buildHarnessComponentId("user-b", "demo")).toBe(
      "user-b:harness:demo",
    );
  });
});
