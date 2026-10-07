import { afterEach, describe, expect, it } from "vitest";

import {
  cleanupAwlRepairHealthHarness,
  makeHome,
  runHelpers,
  startHealthServer,
  uid,
} from "@/lib/agentWitch/repair/awlRepairHealthTestHarness";

afterEach(cleanupAwlRepairHealthHarness);

describe("repair script /health probe on the discovered port (DF-031)", () => {
  it("reports healthy on the discovered port with nothing on 43347", async () => {
    const port = await startHealthServer();
    const home = makeHome({ port });

    const { status, stdout } = await runHelpers(
      home,
      'awl_repair_health_ok && echo "FOUND=${AWL_REPAIR_HEALTH_FOUND_URL}"',
    );

    expect(status).toBe(0);
    expect(stdout).toContain(`FOUND=http://127.0.0.1:${port}/health`);
  });

  it("finds the server inside the range when the saved port is stale", async () => {
    const port = await startHealthServer();
    const home = makeHome({
      port: port === 65535 ? port - 1 : port + 1,
      range: { start: port - 2, end: Math.min(port + 2, 65535) },
    });

    const { stdout } = await runHelpers(
      home,
      'awl_repair_health_ok && echo "FOUND=${AWL_REPAIR_HEALTH_FOUND_URL}"',
    );

    expect(stdout).toContain(`FOUND=http://127.0.0.1:${port}/health`);
  });

  it("does not count another macOS user's AWL as healthy", async () => {
    const port = await startHealthServer({ ok: true, osUid: uid + 1 });
    const home = makeHome({ port });

    const { stdout } = await runHelpers(
      home,
      "if awl_repair_health_ok; then echo HEALTHY; else echo DOWN; fi",
    );

    expect(stdout.trim()).toBe("DOWN");
  });
});
