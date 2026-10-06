import { describe, expect, it } from "vitest";

import {
  formatAccessLogDate,
  formatAccessLogTime,
} from "@/features/projects/accessLog/formatAccessLogTime";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";

const NOW = Date.parse("2026-10-06T12:00:00.000Z");

describe("formatAccessLogTime", () => {
  it("formats just now / min / hr", () => {
    expect(formatAccessLogTime("2026-10-06T11:59:30.000Z", NOW).relative).toBe(
      C.timeJustNow,
    );
    expect(formatAccessLogTime("2026-10-06T11:45:00.000Z", NOW).relative).toBe(
      "15 min ago",
    );
    expect(formatAccessLogTime("2026-10-06T09:00:00.000Z", NOW).relative).toBe(
      "3 hr ago",
    );
  });

  it("uses date after 24h and includes year when needed", () => {
    expect(formatAccessLogDate("2026-09-01T00:00:00.000Z", NOW)).toMatch(/Sep/);
    expect(formatAccessLogDate("2025-09-01T00:00:00.000Z", NOW)).toMatch(/2025/);
  });
});
