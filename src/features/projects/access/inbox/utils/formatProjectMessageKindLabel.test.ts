import { describe, expect, it } from "vitest";

import formatProjectMessageKindLabel from "@/features/projects/access/inbox/utils/formatProjectMessageKindLabel";

describe("formatProjectMessageKindLabel", () => {
  it("maps known kinds to plain words and falls back for unknown", () => {
    expect(formatProjectMessageKindLabel("task.assign")).toBe("Task assigned");
    expect(formatProjectMessageKindLabel("task.blocked")).toBe("Blocked");
    expect(formatProjectMessageKindLabel("peer.silent_blocked")).toBe(
      "Went quiet (blocked)",
    );
    expect(formatProjectMessageKindLabel("custom.kind")).toBe("custom.kind");
  });
});
