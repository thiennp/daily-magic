import path from "node:path";
import { describe, expect, it } from "vitest";

import { AGENT_WITCH_WRITE_SHIPPED_INSTALL_BUNDLE_ENV } from "../../public-api/types";
import {
  resolveAgentWitchInstallBundleAppDir,
  resolveAgentWitchInstallBundleOutfile,
  resolveAgentWitchShippedInstallBundleAppDir,
  resolveAgentWitchVerifyInstallBundleAppDir,
  shouldWriteShippedAgentWitchInstallBundle,
} from "./resolveAgentWitchInstallBundlePaths";

describe("resolveAgentWitchInstallBundlePaths", () => {
  const root = "/workspace";

  it("defaults to the gitignored verify app dir", () => {
    expect(shouldWriteShippedAgentWitchInstallBundle({})).toBe(false);
    expect(resolveAgentWitchInstallBundleAppDir(root, {})).toBe(
      resolveAgentWitchVerifyInstallBundleAppDir(root),
    );
    expect(resolveAgentWitchInstallBundleOutfile(root, {})).toBe(
      path.join(
        resolveAgentWitchVerifyInstallBundleAppDir(root),
        "agent-witch.js",
      ),
    );
  });

  it("writes the shipped tree only when the release env is set", () => {
    const env = { [AGENT_WITCH_WRITE_SHIPPED_INSTALL_BUNDLE_ENV]: "1" };
    expect(shouldWriteShippedAgentWitchInstallBundle(env)).toBe(true);
    expect(resolveAgentWitchInstallBundleAppDir(root, env)).toBe(
      resolveAgentWitchShippedInstallBundleAppDir(root),
    );
  });
});
