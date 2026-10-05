import { describe, expect, it } from "vitest";

import { buildProjectCardHrefForIntent } from "@/features/projects/navConsolidation/buildProjectCardHrefForIntent";

describe("buildProjectCardHrefForIntent", () => {
  it("uses plain detail href without intent", () => {
    expect(buildProjectCardHrefForIntent("p1", null)).toBe("/projects/p1");
  });

  it("deep-links Activity Task mode for new-task intent", () => {
    expect(buildProjectCardHrefForIntent("p1", "new-task")).toBe(
      "/projects/p1#activity?mode=task",
    );
  });

  it("deep-links Team for bots intent", () => {
    expect(buildProjectCardHrefForIntent("p1", "bots")).toBe(
      "/projects/p1#team",
    );
  });
});
