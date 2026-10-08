import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  path.join(
    process.cwd(),
    "src/lib/agentWitch/claimAgentWitchDeviceHelpers.ts",
  ),
  "utf8",
);

describe("revokeSiblingDevicesWithSameLabel install scope (61e9c49e)", () => {
  it("only supersedes same-install or legacy rows", () => {
    expect(source).toContain("install_id IS NULL");
    expect(source).toMatch(
      /install_id = \(\s*SELECT keep\.install_id\s+FROM agent_witch_devices keep\s+WHERE keep\.id = \$\{input\.keepDeviceId\}/,
    );
  });
});
