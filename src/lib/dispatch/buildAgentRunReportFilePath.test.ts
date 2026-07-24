import { describe, expect, it } from "vitest";

import { buildAgentRunReportFilePath } from "@/lib/dispatch/buildAgentRunReportFilePath";

describe("buildAgentRunReportFilePath", () => {
  it("places the report JSON under the profile reports folder", () => {
    expect(
      buildAgentRunReportFilePath(
        "/Users/me/.agent-witch/profiles/owner@example.com/reports",
        "report-key-abc",
      ),
    ).toBe(
      "/Users/me/.agent-witch/profiles/owner@example.com/reports/report-key-abc.json",
    );
  });
});
