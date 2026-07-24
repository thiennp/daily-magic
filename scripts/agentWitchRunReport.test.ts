import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "./dispatch/agentRunReport.constant";
import {
  buildAgentRunReportHeartbeatPayload,
  readAgentRunReportFile,
  resolveAgentRunCompletionFromReport,
  seedAgentRunReportFile,
  upsertAgentRunReportFile,
  writeAgentRunReportFile,
} from "./agentWitchRunReport";

describe("agentWitchRunReport", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    vi.unstubAllEnvs();
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  const createInstallDir = (): string => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-"));
    tempDirs.push(dir);
    vi.stubEnv("AGENT_WITCH_HOME", dir);
    return dir;
  };

  it("seeds an in_progress report once per report key", () => {
    createInstallDir();
    seedAgentRunReportFile({
      reportKey: "key-1",
      agentRunId: "run-1",
    });
    seedAgentRunReportFile({
      reportKey: "key-1",
      agentRunId: "run-1",
      userSummary: "should not overwrite",
    });

    const report = readAgentRunReportFile("key-1");
    expect(report?.status).toBe(AGENT_RUN_REPORT_STATUSES.IN_PROGRESS);
    expect(report?.userSummary).toContain("Task started");
  });

  it("appends history entries on upsert", () => {
    createInstallDir();
    upsertAgentRunReportFile({
      reportKey: "key-2",
      agentRunId: "run-2",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: "Step one.",
    });
    upsertAgentRunReportFile({
      reportKey: "key-2",
      agentRunId: "run-2",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: "Step two.",
    });

    const report = readAgentRunReportFile("key-2");
    expect(report?.history).toHaveLength(2);
    expect(report?.userSummary).toBe("Step two.");
  });

  it("maps a completed report to exit code 0", () => {
    const completion = resolveAgentRunCompletionFromReport({
      reportKey: "key-3",
      agentRunId: "run-1",
      status: AGENT_RUN_REPORT_STATUSES.COMPLETED,
      updatedAt: "2026-07-22T00:00:00.000Z",
      userSummary: "All done.",
      details: "Shipped the report.",
      history: [],
    });

    expect(completion).toEqual({
      exitCode: 0,
      output: "All done.\n\nShipped the report.",
    });
  });

  it("writes and reads a report file from disk", () => {
    createInstallDir();
    writeAgentRunReportFile({
      reportKey: "key-4",
      agentRunId: "run-2",
      status: AGENT_RUN_REPORT_STATUSES.FAILED,
      updatedAt: "2026-07-22T00:00:00.000Z",
      userSummary: "Could not finish.",
      history: [],
    });

    expect(readAgentRunReportFile("key-4")?.status).toBe(
      AGENT_RUN_REPORT_STATUSES.FAILED,
    );
  });

  it("includes report history in heartbeat payload", () => {
    const payload = buildAgentRunReportHeartbeatPayload({
      reportKey: "key-5",
      agentRunId: "run-5",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      updatedAt: "2026-07-22T00:00:00.000Z",
      userSummary: "Working.",
      history: [
        {
          at: "2026-07-22T00:00:00.000Z",
          status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
          summary: "Working.",
        },
      ],
    });

    expect(payload).toMatchObject({
      reportStatus: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      reportSummary: "Working.",
      reportHistory: [
        {
          at: "2026-07-22T00:00:00.000Z",
          status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
          summary: "Working.",
        },
      ],
    });
  });
});
