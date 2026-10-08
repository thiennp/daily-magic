import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  savePendingRunInputSession,
  listPendingRunInputSessions,
} from "./agentWitchPendingRunSessions";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

describe("agentWitchPendingRunSessions", () => {
  let tempDir: string;
  let layout: AgentWitchLocalLayout;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-pending-"));
    layout = {
      installDir: tempDir,
      profileEmail: "test@example.com",
    } as unknown as AgentWitchLocalLayout;
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("round-trip keeps writerAgent, projectFolderPath, reportKey, projectId, savedAt", () => {
    const session = {
      agentRunId: "run-1",
      originalPrompt: "prompt",
      partialOutput: "out",
      question: "q",
      accumulatedOutput: "acc",
      writerAgent: "antigravity",
      projectFolderPath: "/test",
      reportKey: "rep1",
      projectId: "proj1",
      savedAt: "2024-01-01T00:00:00.000Z",
    };

    savePendingRunInputSession(layout, session);
    const listed = listPendingRunInputSessions(layout);

    expect(listed).toHaveLength(1);
    expect(listed[0]).toEqual(session);
  });
});
