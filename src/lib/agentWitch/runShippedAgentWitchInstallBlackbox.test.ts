import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";
import { readAgentWitchInstallScriptSource } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";
import { assertShippedAgentWitchInstallScriptIsMinified } from "@/lib/agentWitch/assertShippedAgentWitchInstallScriptIsMinified";
import { runShippedAgentWitchInstallBlackbox } from "@/lib/agentWitch/runShippedAgentWitchInstallBlackbox";

describe("runShippedAgentWitchInstallBlackbox helpers", () => {
  it("detects non-minified install payloads for legacy script routes", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "scripts/reviveAgentWitchWebSocket.ts"),
      "utf8",
    );

    expect(() =>
      assertShippedAgentWitchInstallScriptIsMinified({
        scriptName: "reviveAgentWitchWebSocket.ts",
        shipped: source,
        source,
      }),
    ).toThrow(/was not minified/);
  });

  it("accepts the shipped bundled client artifact", () => {
    const source = readAgentWitchInstallScriptSource(
      AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath,
    );

    expect(source.length).toBeGreaterThan(10_000);
    expect(source.startsWith("#!/usr/bin/env node")).toBe(true);
  });
});

describe("runShippedAgentWitchInstallBlackbox", () => {
  it.skipIf(process.env.AGENT_WITCH_SHIPPED_INSTALL_BASE_URL === undefined)(
    "runs against a live base URL when AGENT_WITCH_SHIPPED_INSTALL_BASE_URL is set",
    async () => {
      const result = await runShippedAgentWitchInstallBlackbox(
        process.env.AGENT_WITCH_SHIPPED_INSTALL_BASE_URL as string,
      );

      expect(result.downloadedScriptCount).toBe(1);
      expect(result.materializedScriptCount).toBe(1);
    },
    120_000,
  );
});
