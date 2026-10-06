import { describe, expect, it } from "vitest";

import { parseProjectMessageRestoreTarget } from "@/lib/projects/acl/messaging/parseProjectMessageRestoreTarget";

describe("parseProjectMessageRestoreTarget", () => {
  it("accepts exactly one of messageId / archiveBatch / all", () => {
    expect(parseProjectMessageRestoreTarget({ messageId: "m1" })).toEqual({
      kind: "one",
      messageId: "m1",
    });
    expect(
      parseProjectMessageRestoreTarget({
        archiveBatch: "2026-10-06 11:48:12.123456+00",
      }),
    ).toEqual({ kind: "batch", archiveBatch: "2026-10-06 11:48:12.123456+00" });
    expect(parseProjectMessageRestoreTarget({ all: true })).toEqual({
      kind: "all",
    });
  });

  it("rejects empty, mixed, or malformed bodies", () => {
    expect(parseProjectMessageRestoreTarget(null)).toBeNull();
    expect(parseProjectMessageRestoreTarget({})).toBeNull();
    expect(parseProjectMessageRestoreTarget({ all: "yes" })).toBeNull();
    expect(
      parseProjectMessageRestoreTarget({ messageId: "m1", all: true }),
    ).toBeNull();
    expect(
      parseProjectMessageRestoreTarget({ archiveBatch: "yesterday" }),
    ).toBeNull();
  });
});
