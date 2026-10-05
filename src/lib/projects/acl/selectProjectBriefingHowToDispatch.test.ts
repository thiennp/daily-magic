import { describe, expect, it } from "vitest";

import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_BRIEFING_VIEWER_READ_ONLY,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { selectProjectBriefingHowToDispatch } from "@/lib/projects/acl/selectProjectBriefingHowToDispatch";

describe("selectProjectBriefingHowToDispatch", () => {
  it("owner and members keep the dispatch paragraph", () => {
    expect(selectProjectBriefingHowToDispatch(undefined)).toBe(
      PROJECT_BRIEFING_HOW_TO_DISPATCH,
    );
    expect(selectProjectBriefingHowToDispatch("member")).toBe(
      PROJECT_BRIEFING_HOW_TO_DISPATCH,
    );
  });

  it("viewer gets read-only copy with no post / reply instruction", () => {
    const text = selectProjectBriefingHowToDispatch("viewer");
    expect(text).toBe(PROJECT_BRIEFING_VIEWER_READ_ONLY);
    expect(text).toContain("read-only");
    expect(text).toContain("list_project_inbox");
    expect(text).toContain("viewer_read_only");
    expect(text).not.toMatch(/MUST|register_project_webhook|Dispatch with/);
    expect(text).not.toContain("first project_dispatch");
  });
});
