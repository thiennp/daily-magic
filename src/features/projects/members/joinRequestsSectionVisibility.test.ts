import { describe, expect, it } from "vitest";

import {
  nextJoinRequestsStickyProject,
  shouldRenderJoinRequestsSection,
} from "@/features/projects/members/joinRequestsSectionVisibility";

describe("DF-017 join requests section stays mounted after approve/deny", () => {
  it("renders nothing when the project never had a request", () => {
    expect(
      shouldRenderJoinRequestsSection({
        projectId: "p1",
        pendingCount: 0,
        expiredCount: 0,
        stickyProjectId: null,
      }),
    ).toBe(false);
  });

  it("stays rendered after the last pending request is resolved", () => {
    const sticky = nextJoinRequestsStickyProject({
      projectId: "p1",
      pendingCount: 1,
      stickyProjectId: null,
    });
    expect(sticky).toBe("p1");
    // post-action reload drains pending
    const after = nextJoinRequestsStickyProject({
      projectId: "p1",
      pendingCount: 0,
      stickyProjectId: sticky,
    });
    expect(after).toBe("p1");
    expect(
      shouldRenderJoinRequestsSection({
        projectId: "p1",
        pendingCount: 0,
        expiredCount: 0,
        stickyProjectId: after,
      }),
    ).toBe(true);
  });

  it("does not carry over to another project", () => {
    expect(
      shouldRenderJoinRequestsSection({
        projectId: "p2",
        pendingCount: 0,
        expiredCount: 0,
        stickyProjectId: "p1",
      }),
    ).toBe(false);
  });
});
