import { describe, expect, it } from "vitest";

import assertAutomationDispatchAllowsComposition from "@/lib/automations/assertAutomationDispatchAllowsComposition";

describe("assertAutomationDispatchAllowsComposition", () => {
  it("rejects run-scoped component ids for automations", () => {
    expect(
      assertAutomationDispatchAllowsComposition({
        runScopedComponentIds: ["cmp-1"],
      }),
    ).toBe("Automations cannot use run-scoped components.");
  });

  it("allows empty run-scoped lists", () => {
    expect(
      assertAutomationDispatchAllowsComposition({
        runScopedComponentIds: [],
      }),
    ).toBeNull();
  });
});
