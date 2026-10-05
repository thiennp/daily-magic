import { describe, expect, it } from "vitest";

import { validateMessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

describe("validateMessengerTaskDraft", () => {
  it("requires assignee and summary ≤200", () => {
    expect(
      validateMessengerTaskDraft({ assigneeMembershipId: "", summary: "hi" }),
    ).toEqual({ ok: false, code: "assignee_required" });
    expect(
      validateMessengerTaskDraft({
        assigneeMembershipId: "m1",
        summary: "   ",
      }),
    ).toEqual({ ok: false, code: "summary_required" });
    expect(
      validateMessengerTaskDraft({
        assigneeMembershipId: "m1",
        summary: "x".repeat(201),
      }),
    ).toEqual({ ok: false, code: "summary_too_large" });
  });

  it("accepts allowlisted refs and rejects unknown keys / oversize", () => {
    expect(
      validateMessengerTaskDraft({
        assigneeMembershipId: "m1",
        summary: "Wake check",
        kind: "task.assign",
        refs: { prUrl: "https://example.com/pr/1", commitSha: "abc" },
      }),
    ).toEqual({
      ok: true,
      assigneeMembershipId: "m1",
      summary: "Wake check",
      kind: "task.assign",
      refs: { prUrl: "https://example.com/pr/1", commitSha: "abc" },
    });
    expect(
      validateMessengerTaskDraft({
        assigneeMembershipId: "m1",
        summary: "Wake check",
        refs: { evil: "no" } as never,
      }),
    ).toEqual({ ok: false, code: "invalid_ref_key" });
    expect(
      validateMessengerTaskDraft({
        assigneeMembershipId: "m1",
        summary: "Wake check",
        refs: { localPath: "x".repeat(300) },
      }),
    ).toEqual({ ok: false, code: "refs_too_large" });
  });
});
