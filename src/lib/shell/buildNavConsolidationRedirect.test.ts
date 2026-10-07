import { describe, expect, it } from "vitest";

import {
  buildIntentProjectTabRedirectPath,
  buildProjectTabHash,
  buildProjectsIntentRedirectPath,
  readNavConsolidationProjectId,
} from "@/lib/shell/buildNavConsolidationRedirect";

describe("buildNavConsolidationRedirect", () => {
  it("builds /projects?intent= and keeps unrelated query", () => {
    expect(
      buildProjectsIntentRedirectPath("library", { ref: "email", project: "p1" }),
    ).toBe("/projects?ref=email&intent=library");
  });

  it("reads project query", () => {
    expect(readNavConsolidationProjectId({ project: " abc " })).toBe("abc");
    expect(readNavConsolidationProjectId({})).toBeNull();
  });

  it("builds project tab hash deep links", () => {
    expect(buildProjectTabHash("team")).toBe("#team");
    expect(buildProjectTabHash("reports", { report: "r1" })).toBe(
      "#reports?report=r1",
    );
    expect(buildIntentProjectTabRedirectPath("p1", "new-task")).toBe(
      "/projects/p1#chat?mode=task",
    );
    expect(
      buildIntentProjectTabRedirectPath("p1", "library", { item: "c1" }),
    ).toBe("/projects/p1#library?item=c1");
  });
});
