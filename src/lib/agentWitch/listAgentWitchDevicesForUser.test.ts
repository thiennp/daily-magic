import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("listAgentWitchDevicesForUser (HOME-061)", () => {
  it("selects wake_port so AWC can probe non-default AWB ports", () => {
    const source = readFileSync(
      path.join(
        process.cwd(),
        "src/lib/agentWitch/listAgentWitchDevicesForUser.ts",
      ),
      "utf8",
    );
    expect(source).toContain("wake_port");
    expect(source).toMatch(/install_bundle_version,\s*wake_port/);
  });
});
