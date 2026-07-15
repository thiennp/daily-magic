import { describe, expect, it } from "vitest";

import { parseAgentRunSseEvent } from "@/features/reports/utils/parseAgentRunSseEvent";

describe("parseAgentRunSseEvent", () => {
  it("parses valid SSE payloads", () => {
    const event = parseAgentRunSseEvent(
      JSON.stringify({
        seq: 2,
        kind: "terminal.end",
        payload: { exitCode: 0, output: "done" },
        createdAt: "2026-07-15T12:00:00.000Z",
      }),
    );

    expect(event).toEqual({
      seq: 2,
      kind: "terminal.end",
      payload: { exitCode: 0, output: "done" },
      createdAt: "2026-07-15T12:00:00.000Z",
    });
  });

  it("returns null for invalid payloads", () => {
    expect(parseAgentRunSseEvent("not-json")).toBeNull();
    expect(parseAgentRunSseEvent("{}")).toBeNull();
  });
});
