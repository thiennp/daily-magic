import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("AgentWitchDashboardProvider guest gating", () => {
  it("does not open SSE until session is authenticated", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/agent-witch/dashboard/AgentWitchDashboardProvider.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("useSession");
    expect(source).toContain('status !== "authenticated"');
    expect(source).toContain("subscribeAgentWitchDashboardSocket");
  });
});
