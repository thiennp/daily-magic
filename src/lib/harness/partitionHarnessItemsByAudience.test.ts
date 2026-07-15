import { describe, expect, it } from "vitest";

import {
  filterAgentHarnessItemsForInstall,
  mapHarnessItemsToOperatorSteps,
  partitionHarnessItemsByAudience,
} from "@/lib/harness/partitionHarnessItemsByAudience";

describe("partitionHarnessItemsByAudience", () => {
  const items = [
    {
      id: "rule-1",
      kind: "rule" as const,
      title: "Prefer const",
      content: "Use const.",
    },
    {
      id: "op-1",
      kind: "operator" as const,
      title: "Prepare browser",
      content: "Open the page and log in.",
    },
  ];

  it("splits operator steps from agent harness items", () => {
    expect(partitionHarnessItemsByAudience(items)).toEqual({
      agentItems: [items[0]],
      operatorSteps: [
        {
          id: "op-1",
          title: "Prepare browser",
          content: "Open the page and log in.",
        },
      ],
    });
  });

  it("maps and filters harness items independently", () => {
    expect(mapHarnessItemsToOperatorSteps(items)).toHaveLength(1);
    expect(filterAgentHarnessItemsForInstall(items)).toEqual([items[0]]);
  });
});
