import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

import { AGENT_RUN_INPUT_MARKER } from "./dispatch/agentRunInputGuardrails.constant";

import { parseAwaitingInputFromOutput } from "./agentWitchRunSessions";

describe("parseAwaitingInputFromOutput", () => {
  const echoedPrompt = [
    "OpenAI Codex v0.144.6",
    "--------",
    "user",
    "Do the task.",
    `4. Never use ${AGENT_RUN_INPUT_MARKER} to confirm an estimate.`,
  ].join("\n");

  it("ignores the marker inside the prompt a CLI echoes back", () => {
    expect(parseAwaitingInputFromOutput(`${echoedPrompt}\n`)).toBeNull();
  });

  it("still finds a real question after the agent's reply line", () => {
    const parsed = parseAwaitingInputFromOutput(
      `${echoedPrompt}\ncodex\nWorking.\n${AGENT_RUN_INPUT_MARKER}\nWhich week?\n`,
    );
    expect(parsed?.question).toBe("Which week?");
  });

  it("extracts the first line after the marker as the question", () => {
    const parsed = parseAwaitingInputFromOutput(
      `Working on the report.\n${AGENT_RUN_INPUT_MARKER}\nWhich week should I summarize?`,
    );

    expect(parsed).toEqual({
      question: "Which week should I summarize?",
      partialOutput: "Working on the report.",
    });
  });

  it("joins a question wrapped across lines until a blank line", () => {
    const parsed = parseAwaitingInputFromOutput(
      `Plan ready.\n${AGENT_RUN_INPUT_MARKER}\nDo\nyou approve checkpoint 1.2?\n\nWaiting.`,
    );

    expect(parsed).toEqual({
      question: "Do you approve checkpoint 1.2?",
      partialOutput: "Plan ready.",
    });
  });

  it("returns null when the marker is missing", () => {
    expect(parseAwaitingInputFromOutput("done")).toBeNull();
  });

  it("a76d46ac: while streaming, waits for the question line to end", () => {
    const partial = `Reviewing.\n${AGENT_RUN_INPUT_MARKER}\nCan you confirm the vibe (add a small dark-mode`;
    expect(
      parseAwaitingInputFromOutput(partial, { requireCompleteQuestion: true }),
    ).toBeNull();

    expect(
      parseAwaitingInputFromOutput(`${partial} toggle to index.html)?\r\n`, {
        requireCompleteQuestion: true,
      }),
    ).toEqual({
      question:
        "Can you confirm the vibe (add a small dark-mode toggle to index.html)?",
      partialOutput: "Reviewing.",
    });
  });

  it("a76d46ac: at process exit accepts an unterminated final question", () => {
    expect(
      parseAwaitingInputFromOutput(
        `${AGENT_RUN_INPUT_MARKER}\nCan you review and approve the dark mode change?`,
      )?.question,
    ).toBe("Can you review and approve the dark mode change?");
  });

  it("while streaming, a bare marker is not a question yet", () => {
    expect(
      parseAwaitingInputFromOutput(`x\n${AGENT_RUN_INPUT_MARKER}\n`, {
        requireCompleteQuestion: true,
      }),
    ).toBeNull();
  });
});

import {
  replayPendingRunInputRequests,
  dropPendingRunInputSession,
  getRunSessionForTests,
  clearRunSessionsForTests,
  setRunSessionForTests,
} from "./agentWitchRunSessions";
import {
  savePendingRunInputSession,
  listPendingRunInputSessions,
} from "./agentWitchPendingRunSessions";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type WebSocket from "ws";

import { clearRunHeartbeatTimersForTests } from "./agentWitchRunHeartbeat";
import type { AgentWitchRunConfig } from "./readAgentWitchRunConfig";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

describe("agentWitchRunSessions pending sessions", () => {
  let tempDir: string;
  let layout: AgentWitchLocalLayout;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-pending-"));
    layout = {
      installDir: tempDir,
      profileEmail: "test@example.com",
    } as unknown as AgentWitchLocalLayout;
    clearRunSessionsForTests();
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    vi.restoreAllMocks();
    clearRunHeartbeatTimersForTests();
  });

  it("replayPendingRunInputRequests restores writerAgent, drops >24h, sends replay-input requestId", () => {
    const config = { layout } as unknown as AgentWitchRunConfig;
    const sentMessages: { type?: string; requestId?: string }[] = [];
    const mockSocket = {
      readyState: 1,
      send: (msg: string) => sentMessages.push(JSON.parse(msg)),
    } as unknown as WebSocket;

    const now = Date.now();
    const oldDate = new Date(now - 25 * 60 * 60 * 1000).toISOString();
    const recentDate = new Date(now - 1 * 60 * 60 * 1000).toISOString();

    savePendingRunInputSession(layout, {
      agentRunId: "run-old",
      originalPrompt: "prompt",
      partialOutput: "out",
      question: "q",
      accumulatedOutput: "acc",
      savedAt: oldDate,
    });

    savePendingRunInputSession(layout, {
      agentRunId: "run-recent",
      originalPrompt: "prompt",
      partialOutput: "out",
      question: "q",
      accumulatedOutput: "acc",
      writerAgent: "antigravity",
      savedAt: recentDate,
    });

    replayPendingRunInputRequests(config, mockSocket);

    // Old should be dropped
    expect(
      listPendingRunInputSessions(layout).find(
        (s) => s.agentRunId === "run-old",
      ),
    ).toBeUndefined();
    expect(getRunSessionForTests("run-old")).toBeUndefined();

    // Recent should be restored
    const restored = getRunSessionForTests("run-recent");
    expect(restored?.writerAgent).toBe("antigravity");

    // Check message sent
    const msg = sentMessages.find(
      (m) => m.type === "command.claude.input_required",
    );
    expect(msg?.requestId).toBe("replay-input:run-recent");
  });

  it("dropPendingRunInputSession removes file entry and session", () => {
    savePendingRunInputSession(layout, {
      agentRunId: "run-drop",
      originalPrompt: "prompt",
      partialOutput: "out",
      question: "q",
      accumulatedOutput: "acc",
    });
    setRunSessionForTests("run-drop", {
      originalPrompt: "",
      userTranscriptPrompt: "",
      writerAgent: "claude-cli",
      accumulatedOutput: "",
    });

    dropPendingRunInputSession(
      { layout } as unknown as AgentWitchRunConfig,
      "run-drop",
    );

    expect(
      listPendingRunInputSessions(layout).find(
        (s) => s.agentRunId === "run-drop",
      ),
    ).toBeUndefined();
    expect(getRunSessionForTests("run-drop")).toBeUndefined();
  });
});
