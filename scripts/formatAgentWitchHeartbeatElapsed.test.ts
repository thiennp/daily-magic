import { describe, expect, it } from "vitest";

import { formatAgentWitchHeartbeatElapsed } from "./formatAgentWitchHeartbeatElapsed";

const NOW_MS = Date.parse("2026-07-19T12:00:00.000Z");

describe("formatAgentWitchHeartbeatElapsed", () => {
  it("counts up in seconds under one minute", () => {
    expect(
      formatAgentWitchHeartbeatElapsed("2026-07-19T11:59:30.000Z", NOW_MS),
    ).toBe("30s");
    expect(
      formatAgentWitchHeartbeatElapsed("2026-07-19T11:59:59.000Z", NOW_MS),
    ).toBe("1s");
  });

  it("formats minutes and hours as elapsed duration", () => {
    expect(
      formatAgentWitchHeartbeatElapsed("2026-07-19T11:45:00.000Z", NOW_MS),
    ).toBe("15m");
    expect(
      formatAgentWitchHeartbeatElapsed("2026-07-19T10:30:00.000Z", NOW_MS),
    ).toBe("1h 30m");
  });

  it("returns never for missing timestamps", () => {
    expect(formatAgentWitchHeartbeatElapsed(null, NOW_MS)).toBe("never");
  });
});
