import { afterEach, describe, expect, it } from "vitest";

import {
  cleanupAwlRepairHealthHarness,
  makeHome,
  runHelpers,
} from "@/lib/agentWitch/repair/awlRepairHealthTestHarness";
import { renderRepairAgentWitchScript } from "@/lib/agentWitch/repair/renderRepairAgentWitchScript";

afterEach(cleanupAwlRepairHealthHarness);

describe("repair script health port discovery (DF-031)", () => {
  it("lists saved port → range → legacy 43347", async () => {
    const home = makeHome({ port: 65380, range: { start: 65376, end: 65391 } });

    // Listing only (no network): the real legacy port is safe here.
    const { stdout } = await runHelpers(
      home,
      "awl_repair_health_urls",
      {},
      { legacyHealthPort: 43347 },
    );
    const urls = stdout.trim().split("\n");

    expect(urls[0]).toBe("http://127.0.0.1:65380/health");
    expect(urls).toContain("http://127.0.0.1:65376/health");
    expect(urls).toContain("http://127.0.0.1:65391/health");
    expect(urls.at(-1)).toBe("http://127.0.0.1:43347/health");
    expect(urls).toHaveLength(17);
  });
});

describe("repair script health URL flags (DF-031)", () => {
  it("AWL_REPAIR_HEALTH_URL pins a single URL (test/override flag)", async () => {
    const home = makeHome({ port: 65380 });

    const { stdout } = await runHelpers(home, "awl_repair_health_urls", {
      AWL_REPAIR_HEALTH_URL: "http://127.0.0.1:1234/health",
    });

    expect(stdout.trim()).toBe("http://127.0.0.1:1234/health");
  });

  it("no longer hard-codes 43347 as the only health URL", () => {
    const script = renderRepairAgentWitchScript("https://www.agentwitch.com");
    expect(script).toContain(
      'AWL_REPAIR_HEALTH_URL="${AWL_REPAIR_HEALTH_URL:-}"',
    );
    expect(script).toContain(
      'AWL_REPAIR_LEGACY_HEALTH_URL="http://127.0.0.1:43347/health"',
    );
    expect(script).toContain("local-app-port.json");
    expect(script).toContain("local-port-range.json");
    expect(script).not.toContain(
      'AWL_REPAIR_HEALTH_URL="${AWL_REPAIR_HEALTH_URL:-http://127.0.0.1:43347/health}"',
    );
  });
});
