import { describe, expect, it } from "vitest";

import { findAgentWitchInstallScriptsWithRepoSrcImports } from "./findAgentWitchInstallScriptsWithRepoSrcImports";

describe("findAgentWitchInstallScriptsWithRepoSrcImports (AGENT-059)", () => {
  it("reports no ../src imports in install allowlist scripts", () => {
    expect(findAgentWitchInstallScriptsWithRepoSrcImports()).toEqual([]);
  });
});
