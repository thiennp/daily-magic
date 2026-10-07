import { describe, expect, it } from "vitest";

import { normalizeProjectSyncPath } from "@/lib/projects/acl/sync/normalizeProjectSyncPath";

describe("normalizeProjectSyncPath", () => {
  it("accepts chat history paths", () => {
    expect(normalizeProjectSyncPath("history/msg-1.json")).toEqual({
      ok: true,
      path: "history/msg-1.json",
      kind: "chat",
    });
  });

  it("rejects traversal and unknown kinds", () => {
    expect(normalizeProjectSyncPath("../etc/passwd").ok).toBe(false);
    expect(normalizeProjectSyncPath("secrets/token").ok).toBe(false);
  });
});
