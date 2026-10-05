import { describe, expect, it } from "vitest";

import { resolveAgentRunDetailResultOutputForHonesty } from "@/features/reports/utils/resolveAgentRunDetailResultOutputForHonesty";

describe("resolveAgentRunDetailResultOutputForHonesty", () => {
  it("prefers persisted resultOutput over injected terminal output", () => {
    expect(
      resolveAgentRunDetailResultOutputForHonesty(
        "run-s2",
        "from-db",
        "cached-only",
      ),
    ).toBe("from-db");
  });

  it("uses injected terminal output when resultOutput is empty", () => {
    expect(
      resolveAgentRunDetailResultOutputForHonesty(
        "run-s2",
        null,
        "spawn claude ENOENT",
      ),
    ).toBe("spawn claude ENOENT");
  });
});
