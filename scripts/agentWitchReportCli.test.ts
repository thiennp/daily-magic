import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "../src/lib/dispatch/agentRunReport.constant";
import { readAgentRunReportFile } from "./agentWitchRunReport";
import { runAgentWitchReportCli } from "./agentWitchReportCli";

describe("agentWitchReportCli", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  const createProjectDir = (): string => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-cli-"));
    tempDirs.push(dir);
    return dir;
  };

  it("writes a report file via report write", () => {
    const projectDir = createProjectDir();
    const exitCode = runAgentWitchReportCli([
      "write",
      "--project-folder",
      projectDir,
      "--key",
      "report-key-1",
      "--agent-run-id",
      "run-1",
      "--status",
      AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      "--summary",
      "Indexing files.",
    ]);

    expect(exitCode).toBe(0);
    const report = readAgentRunReportFile(projectDir, "report-key-1");
    expect(report).toMatchObject({
      reportKey: "report-key-1",
      agentRunId: "run-1",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: "Indexing files.",
    });
    expect(report?.history).toHaveLength(1);
  });
});
