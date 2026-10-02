import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_POLL_MS } from "@/features/projects/access/awcProjectAccessPolling.constant";

describe("useAwcProjectAccess live Pending poll", () => {
  const pollSource = readFileSync(
    join(
      process.cwd(),
      "src/features/projects/access/hooks/useAwcProjectAccessLivePoll.ts",
    ),
    "utf8",
  );
  const accessSource = readFileSync(
    join(
      process.cwd(),
      "src/features/projects/access/hooks/useAwcProjectAccess.ts",
    ),
    "utf8",
  );

  it("polls on a 5–10s cadence while Access is mounted", () => {
    expect(AWC_PROJECT_ACCESS_POLL_MS).toBeGreaterThanOrEqual(5_000);
    expect(AWC_PROJECT_ACCESS_POLL_MS).toBeLessThanOrEqual(10_000);
    expect(pollSource).toContain("AWC_PROJECT_ACCESS_POLL_MS");
    expect(pollSource).toContain("setInterval");
    expect(accessSource).toContain("useAwcProjectAccessLivePoll");
  });

  it("does not flip isLoading on background poll ticks", () => {
    expect(pollSource).toContain("pollSilent");
    expect(pollSource).not.toContain("setIsLoading");
    expect(pollSource).toContain("document.visibilityState");
    expect(pollSource).toContain("visibilitychange");
  });

  it("clears the interval on unmount / projectId change", () => {
    expect(pollSource).toContain("clearInterval");
    expect(pollSource).toContain("cancelled = true");
  });
});
