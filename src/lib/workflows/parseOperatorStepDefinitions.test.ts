import { describe, expect, it } from "vitest";

import { parseOperatorStepDefinitions } from "@/lib/workflows/parseOperatorStepDefinitions";

describe("parseOperatorStepDefinitions", () => {
  it("returns empty array for invalid input", () => {
    expect(parseOperatorStepDefinitions(null)).toEqual([]);
    expect(parseOperatorStepDefinitions("bad")).toEqual([]);
  });

  it("parses valid operator steps and skips incomplete rows", () => {
    expect(
      parseOperatorStepDefinitions([
        {
          id: "op-1",
          title: "Prepare browser",
          content: "Open the page.",
        },
        {
          id: "",
          title: "Skipped",
          content: "Missing id",
        },
      ]),
    ).toEqual([
      {
        id: "op-1",
        title: "Prepare browser",
        content: "Open the page.",
      },
    ]);
  });
});
