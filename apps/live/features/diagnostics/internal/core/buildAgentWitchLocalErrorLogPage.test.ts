import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalErrorLogPageBody } from "./buildAgentWitchLocalErrorLogPage";

const baseInput = {
  errorLogPath: "/Users/me/.agent-witch/error.log",
  content: "2026-09-24T12:00:00Z boom",
  exists: true,
  truncated: false,
  byteSize: 32,
} as const;

describe("buildAgentWitchLocalErrorLogPageBody", () => {
  it("renders the cleared alert above the log only when cleared is true", () => {
    const cleared = buildAgentWitchLocalErrorLogPageBody({
      ...baseInput,
      cleared: true,
    });
    const hidden = buildAgentWitchLocalErrorLogPageBody({
      ...baseInput,
      cleared: false,
    });
    const omitted = buildAgentWitchLocalErrorLogPageBody(baseInput);

    expect(cleared).toContain(
      `<div class="alert-success">Error log cleared.</div>`,
    );
    expect(cleared.indexOf("Error log cleared.")).toBeLessThan(
      cleared.indexOf("error-log-view"),
    );
    expect(cleared).toBe(
      `<div class="alert-success">Error log cleared.</div>${omitted}`,
    );
    expect(hidden).toBe(omitted);
    expect(hidden).not.toContain("Error log cleared.");
    expect(omitted).not.toContain("Error log cleared.");
    expect(omitted).toContain("<h1>Error log</h1>");
    expect(omitted).toContain('action="/api/errors/clear"');
  });
});
