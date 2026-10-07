import { describe, expect, it } from "vitest";

import { buildNavConsolidationNewTaskHref } from "@/lib/shell/buildNavConsolidationNewTaskHref";

describe("buildNavConsolidationNewTaskHref", () => {
  it("sends plain New task to the projects picker intent", () => {
    expect(buildNavConsolidationNewTaskHref()).toBe(
      "/projects?intent=new-task",
    );
    expect(buildNavConsolidationNewTaskHref({})).toBe(
      "/projects?intent=new-task",
    );
  });

  it("deep-links a known project into project Chat Task mode", () => {
    expect(buildNavConsolidationNewTaskHref({ projectId: "p1" })).toBe(
      "/projects/p1#chat?mode=task",
    );
  });
});
