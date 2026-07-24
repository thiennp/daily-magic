import { describe, expect, it } from "vitest";

import { AGENT_RUN_REPORT_STATUSES } from "@/lib/dispatch/agentRunReport.constant";
import { buildAgentRunReportWriteCommand } from "@/lib/dispatch/buildAgentRunReportWriteCommand";

describe("buildAgentRunReportWriteCommand", () => {
  it("builds a node app bundle report write command", () => {
    const command = buildAgentRunReportWriteCommand({
      installDir: "/Users/me/.agent-witch",
      reportKey: "report-key-1",
      agentRunId: "run-1",
      status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
      summary: "Reading files",
    });

    expect(command).toContain("/Users/me/.agent-witch/app/agent-witch.js");
    expect(command).toContain("report write");
    expect(command).toContain("--key 'report-key-1'");
    expect(command).toContain("--status 'in_progress'");
    expect(command).toContain("--summary 'Reading files'");
  });
});
