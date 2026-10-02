import { describe, expect, it } from "vitest";

import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("parseProjectDispatchPayload (A3.4)", () => {
  it("requires toProjectDisplayName or toTeamLabel; rejects broadcast", () => {
    expect(
      parseProjectDispatchPayload({
        kind: "handoff",
        summary: "hi",
        broadcast: true,
      }).ok,
    ).toBe(false);
    expect(
      parseProjectDispatchPayload({
        kind: "handoff",
        summary: "pointer",
        toProjectDisplayName: "Buni",
      }).ok,
    ).toBe(true);
  });

  it("caps summary and allowlists refs", () => {
    const tooLarge = parseProjectDispatchPayload({
      kind: "x",
      summary: "a".repeat(PROJECT_MESSAGE_SUMMARY_MAX_CHARS + 1),
      toTeamLabel: "builders",
    });
    expect(tooLarge.ok).toBe(false);
    if (!tooLarge.ok) {
      expect(tooLarge.code).toBe("summary_too_large");
    }
    expect(
      parseProjectDispatchPayload({
        kind: "x",
        summary: "ok",
        toTeamLabel: "builders",
        refs: { prUrl: "https://github.com/x/y/pull/1", evil: "no" },
      }).ok,
    ).toBe(false);
  });

  it("rejects forbidden summary content bodies", () => {
    const result = parseProjectDispatchPayload({
      kind: "x",
      summary: "here is a run log dump",
      toTeamLabel: "builders",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("forbidden_content");
    }
  });

  it("allows thin metadata refs", () => {
    const result = parseProjectDispatchPayload({
      kind: "handoff",
      summary: "claimed allow; sync via localPath",
      toProjectDisplayName: "Buni",
      refs: {
        prUrl: "https://github.com/thiennp/daily-magic/pull/1",
        commitSha: "abc123def456",
        localPath: "/Users/me/work/file.ts",
        allowClaimId: "claim-1",
      },
    });
    expect(result.ok).toBe(true);
  });
});
