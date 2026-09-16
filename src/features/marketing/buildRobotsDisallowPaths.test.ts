import { describe, expect, it } from "vitest";

import { buildRobotsDisallowPaths } from "@/features/marketing/buildRobotsDisallowPaths";

describe("buildRobotsDisallowPaths", () => {
  it("disallows admin, dev, staff tools, and E2E showcase articles", () => {
    const paths = buildRobotsDisallowPaths();

    expect(paths).toContain("/admin/");
    expect(paths).toContain("/styleguide");
    expect(paths).toContain("/connection-lab");
    expect(paths).toContain("/dev/");
    expect(paths).toContain("/dev/writer-session-stream");
    expect(paths).toContain("/ws-test");
    expect(paths).toContain("/showcases/e2e-test-account-sign-in");
  });
});
