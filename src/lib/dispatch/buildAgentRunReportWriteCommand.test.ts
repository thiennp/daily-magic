import { describe, expect, it } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "@/lib/dispatch/agentRunReport.constant";
import { buildAgentRunReportWriteCommand } from "@/lib/dispatch/buildAgentRunReportWriteCommand";

describe("buildAgentRunReportWriteCommand", () => {
  it("builds a tsx agent-witch report write command", () => {
    const command = buildAgentRunReportWriteCommand({
      installDir: "/Users/me/.agent-witch",
      projectFolderPath: "/Users/me/projects/demo",
      reportKey: "report-key-1",
      agentRunId: "run-1",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      summary: "Reading files",
    });

    expect(command).toContain("/Users/me/.agent-witch/agent-witch.ts");
    expect(command).toContain("report write");
    expect(command).toContain("--key 'report-key-1'");
    expect(command).toContain("--status 'in_progress'");
    expect(command).toContain("--summary 'Reading files'");
  });
});
