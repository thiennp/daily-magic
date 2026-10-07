import { describe, expect, it } from "vitest";

import * as awl from "../apps/live/features/project-history/internal/core/projectTaskSyncAdapter";
import * as awc from "@/features/projects/sync/adapters/projectTasksAdapter";
import { PROJECT_SYNC_RECONCILE_BATCH_SIZE } from "@/features/projects/sync/projectSync.types";

/** AWL local copy (deployable boundary) must behave exactly like the AWC adapter. */
const local: awc.ProjectTaskLocalRecord = {
  id: "run-1",
  projectId: "proj-1",
  assistantMembershipId: null,
  title: `  Local   title ${"x".repeat(260)} `,
  status: "running",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T02:00:00.000Z",
  startedAt: "2026-10-07T01:00:00.000Z",
  endedAt: null,
  version: 2,
  sessionId: "run-1",
  agentRunId: null,
  branch: "feat/local",
  worktree: null,
  prompt: "SECRET PROMPT",
  body: "SECRET BODY",
  report: null,
  logs: null,
};

const neonVariants: readonly awc.ProjectTaskNeonMeta[] = [
  { ...awc.toNeonMetaProjectTask(local), version: 3, status: "done", branch: null },
  { ...awc.toNeonMetaProjectTask(local), version: 1 },
  { ...awc.toNeonMetaProjectTask(local), updatedAt: "2026-10-07T03:00:00.000Z" },
  { ...awc.toNeonMetaProjectTask(local), id: "run-0" },
  awc.toNeonMetaProjectTask(local),
];

describe("AWL projectTaskSyncAdapter parity with AWC projectTasksAdapter", () => {
  it("constants match", () => {
    expect(awl.PROJECT_SYNC_RECONCILE_BATCH_SIZE).toBe(PROJECT_SYNC_RECONCILE_BATCH_SIZE);
  });

  it("pure functions return identical results", () => {
    expect(awl.toNeonMetaProjectTask(local)).toEqual(awc.toNeonMetaProjectTask(local));
    expect(awl.keyOfProjectTask(local)).toBe(awc.keyOfProjectTask(local));
    neonVariants.forEach((neon) => {
      expect(awl.compareVersionProjectTask(neon, local)).toBe(
        awc.compareVersionProjectTask(neon, local),
      );
      expect(awl.compareVersionProjectTask(local, neon)).toBe(
        awc.compareVersionProjectTask(local, neon),
      );
      expect(awl.preferLocalOverNeonNewer(local, neon)).toEqual(
        awc.preferLocalOverNeonNewer(local, neon),
      );
    });
  });
});
