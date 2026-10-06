import { describe, expect, it } from "vitest";

import { AGENT_WITCH_LINUX_NODE_LTS_VERSION } from "../../public-api/types";
import { buildAgentWitchInstallScriptLinuxNodeRuntime } from "./buildAgentWitchInstallScriptLinuxNodeRuntime";

describe("buildAgentWitchInstallScriptLinuxNodeRuntime", () => {
  it("AWL-NODE-005: downloads from the v-prefixed nodejs.org dist path", () => {
    const block = buildAgentWitchInstallScriptLinuxNodeRuntime();

    expect(AGENT_WITCH_LINUX_NODE_LTS_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    expect(block).toContain(
      `local version="v${AGENT_WITCH_LINUX_NODE_LTS_VERSION}"`,
    );
    expect(block).toContain('local dist="node-${version}-linux-x64"');
    expect(block).toContain(
      'local url="https://nodejs.org/dist/${version}/${tarball}"',
    );
  });

  it("AWL-NODE-006: pinned Linux Node has node:sqlite (22.13+)", () => {
    const [major, minor] = AGENT_WITCH_LINUX_NODE_LTS_VERSION.split(".").map(
      (part) => Number.parseInt(part, 10),
    );
    expect(major > 22 || (major === 22 && (minor ?? 0) >= 13)).toBe(true);
  });
});
