import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "./dispatch/agentRunReport.constant";
import { readAgentRunReportFile } from "./agentWitchRunReport";
import { runAgentWitchReportCli } from "./agentWitchReportCli";

describe("agentWitchReportCli", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    vi.unstubAllEnvs();
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  const createInstallDir = (): string => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-report-cli-"));
    tempDirs.push(dir);
    vi.stubEnv("AGENT_WITCH_HOME", dir);
    return dir;
  };

  it("writes a report file via report write", () => {
    createInstallDir();
    const exitCode = runAgentWitchReportCli([
      "write",
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
    const report = readAgentRunReportFile("report-key-1");
    expect(report).toMatchObject({
      reportKey: "report-key-1",
      agentRunId: "run-1",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      userSummary: "Indexing files.",
    });
    expect(report?.history).toHaveLength(1);
  });
});
