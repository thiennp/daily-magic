import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type WebSocket from "ws";
import { afterEach, describe, expect, it, vi } from "vitest";

import { savePendingRunInputSession } from "./agentWitchPendingRunSessions";
import { clearRunHeartbeatTimersForTests } from "./agentWitchRunHeartbeat";
import {
  readAgentRunReportFile,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";
import {
  clearRunSessionsForTests,
  replayPendingRunInputRequests,
} from "./agentWitchRunSessions";
import type { AgentWitchRunConfig } from "./readAgentWitchRunConfig";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

describe("replayPendingRunInputRequests expiry (378558e8)", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    vi.unstubAllEnvs();
    clearRunSessionsForTests();
    clearRunHeartbeatTimersForTests();
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("closes the report of a checkpoint that expired unanswered", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-replay-exp-"));
    tempDirs.push(tempDir);
    vi.stubEnv("AGENT_WITCH_HOME", tempDir);
    const layout = {
      installDir: tempDir,
      profileEmail: null,
    } as unknown as AgentWitchLocalLayout;
    upsertAgentRunReportFile({
      reportKey: "rep-old",
      agentRunId: "run-old",
      status: "in_progress",
      userSummary: "Waiting for your answer: Which repo?",
    });
    savePendingRunInputSession(layout, {
      agentRunId: "run-old",
      originalPrompt: "prompt",
      partialOutput: "",
      question: "Which repo?",
      accumulatedOutput: "",
      reportKey: "rep-old",
      savedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    });

    replayPendingRunInputRequests(
      { layout } as unknown as AgentWitchRunConfig,
      {
        readyState: 1,
        send: () => undefined,
      } as unknown as WebSocket,
    );

    const report = readAgentRunReportFile("rep-old");
    expect(report?.status).toBe("failed");
    expect(report?.userSummary).toBe("Expired: no answer within 24 hours.");
  });
});
