import { parseCapabilityHarnessItems } from "@/lib/capabilities/parseCapabilityHarnessItems";
import { describe, expect, it } from "vitest";

describe("parseCapabilityHarnessItems", () => {
  it("returns empty array for invalid input", () => {
    expect(parseCapabilityHarnessItems(null)).toEqual([]);
    expect(parseCapabilityHarnessItems("bad")).toEqual([]);
  });

  it("parses valid harness items and skips incomplete rows", () => {
    expect(
      parseCapabilityHarnessItems([
        {
          id: "item-1",
          kind: "rule",
          title: "Prefer const",
          content: "Use const over let.",
        },
        {
          id: "item-2",
          kind: "operator",
          title: "Prepare browser",
          content: "Open the page.",
        },
        {
          id: "item-3",
          kind: "agent",
          title: "Reviewer",
          content: "Review security risks.",
        },
        {
          id: "",
          kind: "skill",
          title: "Skipped",
          content: "No id",
        },
      ]),
    ).toEqual([
      {
        id: "item-1",
        kind: "rule",
        title: "Prefer const",
        content: "Use const over let.",
      },
      {
        id: "item-2",
        kind: "operator",
        title: "Prepare browser",
        content: "Open the page.",
      },
      {
        id: "item-3",
        kind: "agent",
        title: "Reviewer",
        content: "Review security risks.",
      },
    ]);
  });
});
