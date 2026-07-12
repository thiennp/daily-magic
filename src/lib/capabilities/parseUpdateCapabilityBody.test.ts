import { describe, expect, it } from "vitest";

import { parseUpdateCapabilityBody } from "@/lib/capabilities/parseUpdateCapabilityBody";

describe("parseUpdateCapabilityBody", () => {
  it("accepts partial updates", () => {
    const parsed = parseUpdateCapabilityBody({
      name: "Updated weekly report",
      description: "New description",
    });

    expect(parsed).toEqual({
      name: "Updated weekly report",
      description: "New description",
    });
  });

  it("rejects empty name and empty workflow field lists", () => {
    expect(parseUpdateCapabilityBody({ name: "  " })).toBeUndefined();
    expect(parseUpdateCapabilityBody({ workflowFields: [] })).toBeUndefined();
  });
});
