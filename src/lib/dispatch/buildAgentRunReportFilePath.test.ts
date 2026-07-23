import { describe, expect, it } from "vitest";

import { buildAgentRunReportFilePath } from "@/lib/dispatch/buildAgentRunReportFilePath";

describe("buildAgentRunReportFilePath", () => {
  it("places the report JSON under the project .agent-witch/reports folder", () => {
    expect(
      buildAgentRunReportFilePath("/Users/me/projects/demo", "report-key-abc"),
    ).toBe("/Users/me/projects/demo/.agent-witch/reports/report-key-abc.json");
  });
});
