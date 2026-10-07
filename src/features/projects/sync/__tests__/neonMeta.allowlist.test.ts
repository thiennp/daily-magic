/**
 * HARD Neon no-bloat — allowlist rejects body fields; summary ≤200 scrubbed.
 */
import { describe, expect, it } from "vitest";

import {
  assertProjectTaskNeonMetaAllowlist,
  pickProjectTaskNeonMetaAllowlist,
  PROJECT_TASK_NEON_BODY_FIELD_DENYLIST,
  PROJECT_TASK_NEON_FIELDS,
  scrubNeonMetaTitle,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { gateProjectTaskNeonMetaBatch } from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";
import { PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS } from "@/features/projects/sync/projectSync.types";

describe("Neon meta allowlist (HARD no-bloat)", () => {
  it("rejects body / prompt / result_output / logs / transcript fields", () => {
    for (const field of PROJECT_TASK_NEON_BODY_FIELD_DENYLIST) {
      const offenders = assertProjectTaskNeonMetaAllowlist({
        id: "x",
        projectId: "p",
        title: "t",
        status: "queued",
        createdAt: "2026-10-07T00:00:00.000000Z",
        updatedAt: "2026-10-07T00:00:00.000000Z",
        version: 1,
        assistantMembershipId: null,
        startedAt: null,
        endedAt: null,
        sessionId: null,
        agentRunId: null,
        branch: null,
        worktree: null,
        localClaimedAt: null,
        [field]: "FORBIDDEN",
      });
      expect(offenders).toContain(field);
    }
  });

  it("pickProjectTaskNeonMetaAllowlist throws on body fields", () => {
    expect(() =>
      pickProjectTaskNeonMetaAllowlist({
        id: "1",
        projectId: "p",
        title: "ok",
        status: "done",
        createdAt: "2026-10-07T00:00:00.000000Z",
        updatedAt: "2026-10-07T00:00:00.000000Z",
        version: 1,
        body: "NO",
      }),
    ).toThrow(/body fields not allowed \(body\)/);
  });

  it("gateProjectTaskNeonMetaBatch strips to allowlist keys only", () => {
    const gated = gateProjectTaskNeonMetaBatch([
      {
        id: "1",
        projectId: "p",
        title: "Hello",
        status: "running",
        createdAt: "2026-10-07T00:00:00.000000Z",
        updatedAt: "2026-10-07T00:00:00.000000Z",
        version: 2,
        assistantMembershipId: null,
        startedAt: null,
        endedAt: null,
        sessionId: null,
        agentRunId: "1",
        branch: "feat/x",
        worktree: "wt-x",
        localClaimedAt: null,
        extraUnknown: "drop-me-by-not-copying",
      },
    ]);
    // unknown keys without being body: pick only copies allowlist fields
    expect(Object.keys(gated[0]!).sort()).toEqual(
      [...PROJECT_TASK_NEON_FIELDS].sort(),
    );
    expect(gated[0]).not.toHaveProperty("extraUnknown");
  });

  it("summary / title cap is 200 chars after scrub", () => {
    expect(PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS).toBe(200);
    const scrubbed = scrubNeonMetaTitle(`API_KEY=sk-secret-value-abcdefghij ${"z".repeat(400)}`);
    expect(scrubbed.length).toBeLessThanOrEqual(200);
    expect(scrubbed).not.toContain("sk-secret-value");
  });
});
