import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "../src/lib/dispatch/agentRunReport.constant";
import {
  readAgentRunReportFile,
  resolveAgentRunCompletionFromReport,
  seedAgentRunReportFile,
  writeAgentRunReportFile,
} from "./agentWitchRunReport";

describe("agentWitchRunReport", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  const createProjectDir = (): string => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-"));
    tempDirs.push(dir);
    return dir;
  };

  it("seeds an in_progress report once", () => {
    const projectDir = createProjectDir();
    seedAgentRunReportFile({
      projectFolderPath: projectDir,
      agentRunId: "run-1",
    });
    seedAgentRunReportFile({
      projectFolderPath: projectDir,
      agentRunId: "run-1",
      userSummary: "should not overwrite",
    });

    const report = readAgentRunReportFile(projectDir, "run-1");
    expect(report?.status).toBe(AGENT_RUN_REPORT_STATUSES.IN_PROGRESS);
    expect(report?.userSummary).toContain("Task started");
  });

  it("maps a completed report to exit code 0", () => {
    const completion = resolveAgentRunCompletionFromReport({
      agentRunId: "run-1",
      status: AGENT_RUN_REPORT_STATUSES.COMPLETED,
      updatedAt: "2026-07-22T00:00:00.000Z",
      userSummary: "All done.",
      details: "Shipped the report.",
    });

    expect(completion).toEqual({
      exitCode: 0,
      output: "All done.\n\nShipped the report.",
    });
  });

  it("writes and reads a report file from disk", () => {
    const projectDir = createProjectDir();
    writeAgentRunReportFile(projectDir, {
      agentRunId: "run-2",
      status: AGENT_RUN_REPORT_STATUSES.FAILED,
      updatedAt: "2026-07-22T00:00:00.000Z",
      userSummary: "Could not finish.",
    });

    expect(readAgentRunReportFile(projectDir, "run-2")?.status).toBe(
      AGENT_RUN_REPORT_STATUSES.FAILED,
    );
  });
});
