import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type WebSocket from "ws";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "./dispatch/agentRunReport.constant";
import { loadAgentRunLocal } from "./agentWitchLocalRunStore";
import {
  hasPendingRunInputSession,
  savePendingRunInputSession,
} from "./agentWitchPendingRunSessions";
import { clearRunHeartbeatTimersForTests } from "./agentWitchRunHeartbeat";
import {
  readAgentRunReportFile,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";
import {
  clearRunSessionsForTests,
  supersedePausedRunForContinuation,
} from "./agentWitchRunSessions";
import type { AgentWitchRunConfig } from "./readAgentWitchRunConfig";
import { resolveAgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const PAUSED = "9b899065-cdb2-436d-b3c6-5196c7644ce3";
const NEXT = "f0c62878-e427-4b9a-a417-a413b3125de2";
const REPORT_KEY = "c3beb5fb-bfd0-47e8-845b-51f0a395b5aa";
const QUESTION = "Can you confirm the app folder path is correct?";

describe("supersedePausedRunForContinuation (b2179f2b)", () => {
  let home: string;

  beforeEach(() => {
    home = fs.mkdtempSync(path.join(os.tmpdir(), "aw-supersede-"));
    vi.stubEnv("AGENT_WITCH_HOME", home);
    vi.stubEnv("HOME", home);
    clearRunSessionsForTests();
  });

  afterEach(() => {
    clearRunHeartbeatTimersForTests();
    vi.unstubAllEnvs();
    fs.rmSync(home, { recursive: true, force: true });
  });

  it("closes a paused run as Done when a new run continues it", () => {
    const layout = resolveAgentWitchLocalLayout("qa@example.com");
    const config = { layout } as unknown as AgentWitchRunConfig;
    const sent: { type?: string; payload?: Record<string, unknown> }[] = [];
    const socket = {
      readyState: 1,
      send: (raw: string) => sent.push(JSON.parse(raw)),
    } as unknown as WebSocket;
    upsertAgentRunReportFile({
      reportKey: REPORT_KEY,
      agentRunId: PAUSED,
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: `Waiting for your answer: ${QUESTION}`,
    });
    savePendingRunInputSession(layout, {
      agentRunId: PAUSED,
      originalPrompt: "Run workflow: Add vibe coding app feature",
      partialOutput: "Inspected 12 files.",
      question: QUESTION,
      accumulatedOutput: `Inspected 12 files.\n[[AWAITING_INPUT]]\n${QUESTION}`,
      writerAgent: "antigravity",
      reportKey: REPORT_KEY,
    });

    expect(
      supersedePausedRunForContinuation(config, socket, PAUSED, NEXT),
    ).toBe(true);

    expect(hasPendingRunInputSession(layout, PAUSED)).toBe(false);
    const result = sent.find((m) => m.type === "command.claude.result");
    expect(result?.payload).toMatchObject({ agentRunId: PAUSED, exitCode: 0 });
    expect(readAgentRunReportFile(REPORT_KEY)?.status).toBe(
      AGENT_RUN_REPORT_STATUSES.COMPLETED,
    );
    expect(readAgentRunReportFile(REPORT_KEY)?.userSummary).toContain(
      "Continued in a new run (f0c62878)",
    );
    // The new run's source_run_seed reads this record for its context.
    expect(loadAgentRunLocal(layout, PAUSED)?.resultOutput).toContain(QUESTION);
  });

  it("does nothing for a source run that is not paused", () => {
    const layout = resolveAgentWitchLocalLayout("qa@example.com");
    const socket = { readyState: 1, send: vi.fn() } as unknown as WebSocket;

    expect(
      supersedePausedRunForContinuation(
        { layout } as unknown as AgentWitchRunConfig,
        socket,
        "c7e08129-done",
        NEXT,
      ),
    ).toBe(false);
    expect(socket.send).not.toHaveBeenCalled();
  });
});
