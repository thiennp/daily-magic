import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { savePendingRunInputSession } from "./agentWitchPendingRunSessions";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  AGENT_RUN_REPORT_INTERRUPTED_SUMMARY,
  sweepOrphanedAgentRunReports,
} from "./sweepOrphanedAgentRunReports";

const writeReport = (
  reportsDir: string,
  reportKey: string,
  agentRunId: string,
  status: string,
): void => {
  fs.writeFileSync(
    path.join(reportsDir, `${reportKey}.json`),
    JSON.stringify({
      reportKey,
      agentRunId,
      status,
      updatedAt: "2026-10-08T15:26:48.393Z",
      userSummary: "Working on your computer…",
      history: [
        { at: "2026-10-08T15:26:48.393Z", status, summary: "Working…" },
      ],
    }),
  );
};

const readReport = (reportsDir: string, reportKey: string) =>
  JSON.parse(
    fs.readFileSync(path.join(reportsDir, `${reportKey}.json`), "utf8"),
  ) as { status: string; userSummary: string; history: unknown[] };

describe("sweepOrphanedAgentRunReports (378558e8)", () => {
  let tempDir: string;
  let layout: AgentWitchLocalLayout;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-sweep-"));
    const reportsDir = path.join(tempDir, "reports");
    fs.mkdirSync(reportsDir, { recursive: true });
    layout = {
      installDir: tempDir,
      profileEmail: null,
      reportsDir,
    } as unknown as AgentWitchLocalLayout;
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("closes orphaned open reports and keeps paused, live and finished ones", () => {
    writeReport(layout.reportsDir, "orphan", "run-orphan", "in_progress");
    writeReport(layout.reportsDir, "blocked", "run-blocked", "blocked");
    writeReport(layout.reportsDir, "paused", "run-paused", "in_progress");
    writeReport(layout.reportsDir, "live", "run-live", "in_progress");
    writeReport(layout.reportsDir, "done", "run-done", "completed");
    fs.writeFileSync(path.join(layout.reportsDir, "bad.json"), "{not json");
    savePendingRunInputSession(layout, {
      agentRunId: "run-paused",
      originalPrompt: "p",
      partialOutput: "",
      question: "Could you verify the repository URL?",
      accumulatedOutput: "",
      reportKey: "paused",
    });

    const closed = sweepOrphanedAgentRunReports(
      layout,
      (agentRunId) => agentRunId === "run-live",
    );

    expect(closed).toBe(2);
    const orphan = readReport(layout.reportsDir, "orphan");
    expect(orphan.status).toBe("failed");
    expect(orphan.userSummary).toBe(AGENT_RUN_REPORT_INTERRUPTED_SUMMARY);
    expect(orphan.history).toHaveLength(2);
    expect(readReport(layout.reportsDir, "blocked").status).toBe("failed");
    expect(readReport(layout.reportsDir, "paused").status).toBe("in_progress");
    expect(readReport(layout.reportsDir, "live").status).toBe("in_progress");
    expect(readReport(layout.reportsDir, "done").status).toBe("completed");
  });

  it("returns 0 when the reports dir does not exist", () => {
    fs.rmSync(layout.reportsDir, { recursive: true, force: true });
    expect(sweepOrphanedAgentRunReports(layout)).toBe(0);
  });
});
