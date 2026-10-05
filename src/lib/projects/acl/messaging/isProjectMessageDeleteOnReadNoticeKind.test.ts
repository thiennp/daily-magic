import { describe, expect, it } from "vitest";

import { isProjectMessageDeleteOnReadNoticeKind } from "@/lib/projects/acl/messaging/isProjectMessageDeleteOnReadNoticeKind";

describe("isProjectMessageDeleteOnReadNoticeKind", () => {
  it("allows peer notice kinds", () => {
    expect(isProjectMessageDeleteOnReadNoticeKind("peer.joined")).toBe(true);
    expect(isProjectMessageDeleteOnReadNoticeKind("peer.silent")).toBe(true);
    expect(isProjectMessageDeleteOnReadNoticeKind("peer.silent_blocked")).toBe(
      true,
    );
    expect(isProjectMessageDeleteOnReadNoticeKind("peer.left")).toBe(true);
    expect(isProjectMessageDeleteOnReadNoticeKind("peer.renamed")).toBe(true);
  });

  it("rejects actionable task and other kinds", () => {
    expect(isProjectMessageDeleteOnReadNoticeKind("task.assign")).toBe(false);
    expect(isProjectMessageDeleteOnReadNoticeKind("task.processing")).toBe(
      false,
    );
    expect(isProjectMessageDeleteOnReadNoticeKind("task.done")).toBe(false);
    expect(isProjectMessageDeleteOnReadNoticeKind("custom.note")).toBe(false);
  });
});
