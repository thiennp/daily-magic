import { describe, expect, it } from "vitest";

import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import {
  PROJECT_MESSAGE_REF_VALUE_MAX_CHARS,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

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

  it("rejects media / data-URI / base64-looking refs", () => {
    const dataUri = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toTeamLabel: "builders",
      refs: { localPath: "data:image/png;base64,aaaa" },
    });
    expect(dataUri.ok).toBe(false);
    if (!dataUri.ok) {
      expect(dataUri.code).toBe("media_not_allowed");
    }

    const blob = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toTeamLabel: "builders",
      refs: {
        localPath: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      },
    });
    expect(blob.ok).toBe(false);
    if (!blob.ok) {
      expect(blob.code).toBe("media_not_allowed");
    }

    const imagePath = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toTeamLabel: "builders",
      refs: { localPath: "https://cdn.example.com/shot.png" },
    });
    expect(imagePath.ok).toBe(false);
    if (!imagePath.ok) {
      expect(imagePath.code).toBe("media_not_allowed");
    }
  });

  it("rejects oversized individual ref values", () => {
    const result = parseProjectDispatchPayload({
      kind: "x",
      summary: "ok",
      toTeamLabel: "builders",
      refs: { localPath: "p".repeat(PROJECT_MESSAGE_REF_VALUE_MAX_CHARS + 1) },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("refs_too_large");
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
