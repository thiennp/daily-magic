import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  listAgentRunEstimateHistoryForDisplay,
  queryAgentRunEstimateHistoryForPrompt,
  queryAgentRunTokenEstimateHistoryForPrompt,
  recordAgentRunEstimateActual,
  recordAgentRunPromptExchange,
  recordAgentRunTokenEstimateActual,
  rememberAgentRunEstimate,
  rememberAgentRunTokenEstimate,
} from "./agentRunEstimateHistory";

describe("agentRunEstimateHistory", () => {
  const reportsDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "aw-estimate-history-"),
  );

  it("includes the latest finished tasks in stored order", async () => {
    rememberAgentRunEstimate({
      reportsDir,
      agentRunId: "login",
      task: "fix the login form",
      writerLabel: "Claude CLI",
      estimateSeconds: 120,
      embedding: [1, 0],
    });
    rememberAgentRunEstimate({
      reportsDir,
      agentRunId: "readme",
      task: "rewrite the readme",
      writerLabel: "Cursor agent CLI",
      estimateSeconds: 60,
      embedding: [0, 1],
    });
    recordAgentRunEstimateActual({
      reportsDir,
      agentRunId: "login",
      actualSeconds: 90,
    });
    recordAgentRunEstimateActual({
      reportsDir,
      agentRunId: "readme",
      actualSeconds: 40,
    });

    const history = await queryAgentRunEstimateHistoryForPrompt(reportsDir);

    expect(history.table).toContain("fix the login form");
    expect(history.table).toContain("120");
    expect(history.table).toContain("90");
    expect(history.table.indexOf("fix the login form")).toBeLessThan(
      history.table.indexOf("rewrite the readme"),
    );
    expect(history.embedding).toBeNull();
  });

  it("keeps the actual duration when the estimate arrives after the run finishes", async () => {
    recordAgentRunEstimateActual({
      reportsDir,
      agentRunId: "late",
      actualSeconds: 30,
    });
    rememberAgentRunEstimate({
      reportsDir,
      agentRunId: "late",
      task: "rename the button",
      writerLabel: "Codex CLI",
      estimateSeconds: 45,
      embedding: [0, 1],
    });

    const history = await queryAgentRunEstimateHistoryForPrompt(reportsDir);

    expect(history.table).toContain("rename the button");
    expect(history.table).toContain("45");
    expect(history.table).toContain("30");
  });

  it("stores every estimate instead of dropping rows past 100", () => {
    const cappedDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-estimate-history-cap-"),
    );
    Array.from({ length: 101 }, (_, index) => {
      rememberAgentRunEstimate({
        reportsDir: cappedDir,
        agentRunId: `run-${index}`,
        task: `task ${index}`,
        writerLabel: "Claude CLI",
        estimateSeconds: index + 1,
        embedding: [1, 0],
      });
    });

    const ids = fs
      .readFileSync(path.join(cappedDir, "estimate-history.ndjson"), "utf8")
      .trim()
      .split("\n")
      .map((line) => (JSON.parse(line) as { id: string }).id);

    expect(ids).toHaveLength(101);
    expect(ids[0]).toBe("run-0");
    expect(ids[100]).toBe("run-100");
  });

  it("puts the latest 100 finished tasks in the estimate prompt", () => {
    const cappedDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-estimate-history-latest-"),
    );
    Array.from({ length: 101 }, (_, index) => {
      rememberAgentRunEstimate({
        reportsDir: cappedDir,
        agentRunId: `run-${index}`,
        task: `task ${index}`,
        writerLabel: "Claude CLI",
        estimateSeconds: index + 1,
        embedding: index === 0 ? [1, 0] : [0, 1],
      });
      recordAgentRunEstimateActual({
        reportsDir: cappedDir,
        agentRunId: `run-${index}`,
        actualSeconds: index + 2,
      });
    });

    const history = queryAgentRunEstimateHistoryForPrompt(cappedDir);

    expect(history.table).toContain("| task 1 |");
    expect(history.table).toContain("| task 100 |");
    expect(history.table).not.toContain("| task 0 |");
    expect(history.table.indexOf("| task 1 |")).toBeLessThan(
      history.table.indexOf("| task 100 |"),
    );
  });

  it("stores every token estimate and prompts with the latest 100", () => {
    const tokenDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-token-estimate-history-"),
    );
    Array.from({ length: 101 }, (_, index) => {
      rememberAgentRunTokenEstimate({
        reportsDir: tokenDir,
        agentRunId: `token-${index}`,
        task: `token task ${index}`,
        writerLabel: "Claude CLI",
        estimateTokens: (index + 1) * 10,
      });
      recordAgentRunTokenEstimateActual({
        reportsDir: tokenDir,
        agentRunId: `token-${index}`,
        actualTokens: (index + 1) * 10 + 5,
      });
    });

    const ids = fs
      .readFileSync(path.join(tokenDir, "estimate-history.ndjson"), "utf8")
      .trim()
      .split("\n")
      .map((line) => (JSON.parse(line) as { id: string }).id);
    const history = queryAgentRunTokenEstimateHistoryForPrompt(tokenDir);

    expect(ids).toHaveLength(101);
    expect(ids[0]).toBe("token-0");
    expect(history).toContain("| token task 1 |");
    expect(history).toContain("| token task 100 |");
    expect(history).not.toContain("| token task 0 |");
  });

  it("stores every prompt exchange and keeps the estimate", () => {
    const historyDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-prompt-history-"),
    );
    rememberAgentRunEstimate({
      reportsDir: historyDir,
      agentRunId: "review",
      task: "review the parser",
      writerLabel: "Claude CLI",
      estimateSeconds: 20,
      embedding: [],
    });
    recordAgentRunPromptExchange({
      reportsDir: historyDir,
      agentRunId: "review",
      input: "review the parser",
      output: "The loop can skip the last item.",
      writerLabel: "Claude CLI",
    });

    const rows = listAgentRunEstimateHistoryForDisplay(historyDir);

    expect(rows).toHaveLength(1);
    expect(rows[0]?.input).toBe("review the parser");
    expect(rows[0]?.output).toContain("last item");
    expect(rows[0]?.estimateSeconds).toBe(20);
  });
});
