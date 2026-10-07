import { describe, expect, it } from "vitest";

import {
  assertProjectTaskNeonMetaAllowlist,
  compareVersionProjectTask,
  mapProjectTaskStatusToUi,
  projectTaskLocalFromAiSession,
  toNeonMetaProjectTask,
  type ProjectTaskLocalRecord,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import { PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS } from "@/features/projects/sync/projectSync.types";

const local = (
  overrides: Partial<ProjectTaskLocalRecord> = {},
): ProjectTaskLocalRecord => ({
  id: "task-1",
  projectId: "proj-1",
  assistantMembershipId: "bot-1",
  title: "Do the thing",
  status: "running",
  createdAt: "2026-10-07T01:00:00.000Z",
  updatedAt: "2026-10-07T02:00:00.000Z",
  startedAt: "2026-10-07T01:00:00.000Z",
  endedAt: null,
  version: 2,
  sessionId: "run-1",
  agentRunId: "run-1",
  branch: "feat/x",
  worktree: "wt-x",
  prompt: "FULL PROMPT BODY SHOULD NOT LEAK",
  body: "FULL RESULT BODY SHOULD NOT LEAK",
  report: "FULL REPORT",
  logs: "FULL LOGS",
  ...overrides,
});

describe("projectTasksAdapter", () => {
  it("compareVersion: local wins on higher version", () => {
    const a = local({ version: 3, updatedAt: "2026-10-07T01:00:00.000Z" });
    const b = local({ version: 2, updatedAt: "2026-10-07T09:00:00.000Z" });
    expect(compareVersionProjectTask(a, b)).toBeGreaterThan(0);
  });

  it("compareVersion: tie-break updatedAt then key", () => {
    const a = local({
      id: "a",
      version: 1,
      updatedAt: "2026-10-07T02:00:00.000Z",
    });
    const b = local({
      id: "a",
      version: 1,
      updatedAt: "2026-10-07T01:00:00.000Z",
    });
    expect(compareVersionProjectTask(a, b)).toBeGreaterThan(0);
  });

  it("toNeonMeta allowlist excludes body fields", () => {
    const meta = toNeonMetaProjectTask(local());
    expect(meta).not.toHaveProperty("prompt");
    expect(meta).not.toHaveProperty("body");
    expect(meta).not.toHaveProperty("report");
    expect(meta).not.toHaveProperty("logs");
    expect(assertProjectTaskNeonMetaAllowlist(meta)).toEqual([]);
    expect(meta.title).toBe("Do the thing");
    expect(meta.branch).toBe("feat/x");
    expect(meta.worktree).toBe("wt-x");
  });

  it("toNeonMeta truncates title to summary cap", () => {
    const long = "x".repeat(PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS + 50);
    const meta = toNeonMetaProjectTask(local({ title: long }));
    expect(meta.title.length).toBe(PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS);
  });

  it("status map Soft picks", () => {
    expect(mapProjectTaskStatusToUi("working")).toBe("running");
    expect(mapProjectTaskStatusToUi("assigned")).toBe("queued");
    expect(mapProjectTaskStatusToUi("pending_approval")).toBe("queued");
    expect(mapProjectTaskStatusToUi("done")).toBe("done");
    expect(mapProjectTaskStatusToUi("failed")).toBe("failed");
    expect(mapProjectTaskStatusToUi("cancelled")).toBe("cancelled");
    expect(mapProjectTaskStatusToUi("weird")).toBe("queued");
  });

  it("projectTaskLocalFromAiSession maps C1 fields", () => {
    const record = projectTaskLocalFromAiSession({
      taskId: "t1",
      projectId: "p1",
      status: "working",
      promptSummary: "hi",
      resultSummary: "bye",
      createdAt: "2026-10-07T01:00:00.000Z",
      completedAt: null,
      writerAgent: "bot",
      agentRunId: "run-9",
      savedAt: "2026-10-07T01:05:00.000Z",
    });
    expect(record.id).toBe("run-9");
    expect(record.status).toBe("running");
    expect(record.prompt).toBe("hi");
  });
});
