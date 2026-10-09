import { describe, expect, it } from "vitest";

import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

describe("parseProjectDispatchPayload (A3.4)", () => {
  const parse = (to: Record<string, unknown>) =>
    parseProjectDispatchPayload({ kind: "task", summary: "hi", ...to });

  it.each([
    { toProjectDisplayName: "Buni" },
    { toProjectDisplayName: "Owner" },
    { toMembershipId: "mem-1" },
  ])("accepts exactly one recipient %o", (to) => {
    expect(parse(to).ok).toBe(true);
  });

  it("rejects broadcast", () => {
    expect(parse({ broadcast: true }).ok).toBe(false);
  });

  it.each([
    { toMembershipId: "mem-1", toProjectDisplayName: "Buni" },
    { toTeamLabel: "engineers" },
    { toMembershipIds: ["mem-1", "mem-2"] },
    { toMembershipId: ["mem-1", "mem-2"] },
    { recipients: ["mem-1"] },
  ])("rejects more than one recipient or fan-out %o (093103ac)", (to) => {
    expect(parse(to)).toEqual({
      ok: false,
      code: "single_recipient_required",
    });
  });

  it("caps summary and allowlists refs", () => {
    const tooLarge = parseProjectDispatchPayload({
      kind: "x",
      summary: "a".repeat(PROJECT_MESSAGE_SUMMARY_MAX_CHARS + 1),
      toProjectDisplayName: "Buni",
    });
    expect(tooLarge.ok).toBe(false);
    if (!tooLarge.ok) {
      expect(tooLarge.code).toBe("summary_too_large");
    }
    expect(
      parseProjectDispatchPayload({
        kind: "x",
        summary: "ok",
        toProjectDisplayName: "Buni",
        refs: { prUrl: "https://github.com/x/y/pull/1", evil: "no" },
      }).ok,
    ).toBe(false);
  });

  it("rejects forbidden summary content bodies", () => {
    const result = parseProjectDispatchPayload({
      kind: "x",
      summary: "here is a run log dump",
      toProjectDisplayName: "Buni",
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
        prUrl: "https://github.com/thiennp/agentwitch/pull/1",
        commitSha: "abc123def456",
        localPath: "/Users/me/work/file.ts",
        allowClaimId: "claim-1",
      },
    });
    expect(result.ok).toBe(true);
  });
});
