import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "./dispatch/agentRunReport.constant";
import {
  readAgentRunReportFile,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";
import { finalizeAgentRunReportOnFinish } from "./agentWitchRunReportFinalize";

const STOPPED = 130;
const SESSION_LIMIT = 124;

describe("finalizeAgentRunReportOnFinish (FAIL3 452bdbc8)", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    vi.unstubAllEnvs();
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  const seedWaitingReport = (reportKey: string): void => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-final-"));
    tempDirs.push(dir);
    vi.stubEnv("AGENT_WITCH_HOME", dir);
    upsertAgentRunReportFile({
      reportKey,
      agentRunId: "a76d46ac",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary:
        "Verified markup and documentation. Ready for operator review.",
    });
    upsertAgentRunReportFile({
      reportKey,
      agentRunId: "a76d46ac",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: "Waiting for your answer: Can you review and approve?",
    });
  };

  const finalize = (reportKey: string, exitCode: number, output = "") =>
    finalizeAgentRunReportOnFinish({
      reportKey,
      agentRunId: "a76d46ac",
      exitCode,
      output,
      stoppedExitCode: STOPPED,
      sessionLimitExitCode: SESSION_LIMIT,
    });

  const seedAnsweredReport = (reportKey: string, after: string[]): void => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-final-"));
    tempDirs.push(dir);
    vi.stubEnv("AGENT_WITCH_HOME", dir);
    for (const userSummary of [
      "Working on your computer…",
      "Task started on your computer.",
      "Waiting for confirmation of vibe, screen, and app folder.",
      "Waiting for your answer: Do you confirm the vibe?",
      "Continuing after your answer.",
      ...after,
    ]) {
      upsertAgentRunReportFile({
        reportKey,
        agentRunId: "8782ece8",
        status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
        userSummary,
      });
    }
  };

  it("378558e8 (a7c6ce2c): never closes Done with a pre-answer 'Waiting for…' line", () => {
    seedAnsweredReport("k-a7c6", []);
    finalize("k-a7c6", 0);

    const report = readAgentRunReportFile("k-a7c6");
    expect(report?.status).toBe(AGENT_RUN_REPORT_STATUSES.COMPLETED);
    expect(report?.userSummary).toBe("Finished on your computer.");
  });

  it("378558e8: uses the last real summary written after the answer", () => {
    seedAnsweredReport("k-a7c6-2", [
      "Added the dark mode toggle and README note.",
      "Awaiting final review.",
    ]);
    finalize("k-a7c6-2", 0);

    expect(readAgentRunReportFile("k-a7c6-2")?.userSummary).toBe(
      "Added the dark mode toggle and README note.",
    );
  });

  it("closes a report left at 'Waiting for your answer' as completed", () => {
    seedWaitingReport("k-ok");
    finalize("k-ok", 0, "[[WAVE_STATUS]]\n3.2|done\nFeature complete.");

    const report = readAgentRunReportFile("k-ok");
    expect(report?.status).toBe(AGENT_RUN_REPORT_STATUSES.COMPLETED);
    expect(report?.userSummary).toBe(
      "Verified markup and documentation. Ready for operator review.",
    );
  });

  it("marks a failed run failed with its last real output line", () => {
    seedWaitingReport("k-fail");
    finalize("k-fail", 1, "[[PROGRESS]]\nerror: Individual quota reached.");

    const report = readAgentRunReportFile("k-fail");
    expect(report?.status).toBe(AGENT_RUN_REPORT_STATUSES.FAILED);
    expect(report?.userSummary).toBe(
      "Failed on your computer: error: Individual quota reached.",
    );
  });

  it("says Stopped by user for a user stop", () => {
    seedWaitingReport("k-stop");
    finalize("k-stop", STOPPED, "Stopped by user.");

    expect(readAgentRunReportFile("k-stop")?.userSummary).toBe(
      "Stopped by user.",
    );
  });

  it("keeps a report the agent already finished", () => {
    seedWaitingReport("k-done");
    upsertAgentRunReportFile({
      reportKey: "k-done",
      agentRunId: "a76d46ac",
      status: AGENT_RUN_REPORT_STATUSES.COMPLETED,
      userSummary: "Dark mode toggle added.",
    });
    finalize("k-done", 1, "late noise");

    const report = readAgentRunReportFile("k-done");
    expect(report?.status).toBe(AGENT_RUN_REPORT_STATUSES.COMPLETED);
    expect(report?.userSummary).toBe("Dark mode toggle added.");
  });

  it("does nothing without a report file", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-final-"));
    tempDirs.push(dir);
    vi.stubEnv("AGENT_WITCH_HOME", dir);

    expect(finalize("missing", 0)).toBeNull();
    expect(readAgentRunReportFile("missing")).toBeNull();
  });
});
