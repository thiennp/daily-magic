import { describe, expect, it } from "vitest";

import { parseProjectComputerHistoryReportBody } from "@/lib/projects/acl/messaging/parseProjectComputerHistoryReportBody";

describe("parseProjectComputerHistoryReportBody", () => {
  it.each(["ready", "degraded"])("accepts %s", (report) => {
    expect(parseProjectComputerHistoryReportBody({ report })).toEqual({
      report,
    });
  });

  it("reads only the enum, never other fields", () => {
    expect(
      parseProjectComputerHistoryReportBody({
        report: "ready",
        apiKey: "sk-should-not-pass",
        summarizerToken: "nope",
      }),
    ).toEqual({ report: "ready" });
  });

  it.each([null, {}, { report: "summarizing" }, { report: "on_ready" }])(
    "rejects %j",
    (body) => {
      expect(parseProjectComputerHistoryReportBody(body)).toBeNull();
    },
  );
});
