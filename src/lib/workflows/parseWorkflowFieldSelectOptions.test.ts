import { describe, expect, it } from "vitest";

import { parseWorkflowFieldSelectOptions } from "@/lib/workflows/parseWorkflowFieldSelectOptions";

describe("parseWorkflowFieldSelectOptions", () => {
  it("returns an empty list for non-string arrays", () => {
    expect(parseWorkflowFieldSelectOptions("A,B")).toEqual([]);
    expect(parseWorkflowFieldSelectOptions([1, 2])).toEqual([]);
  });

  it("trims and drops empty strings", () => {
    expect(parseWorkflowFieldSelectOptions(["  A  ", "", "B"])).toEqual([
      "A",
      "B",
    ]);
  });
});
